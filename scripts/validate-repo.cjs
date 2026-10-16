#!/usr/bin/env node
// Dependency-free structural checks for the curated catalog and imported helpers.
// This does not execute hooks, install packages, or substitute for behavioral tests.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'consolidation/manifest.json'), 'utf8'));
const args = new Set(process.argv.slice(2));
const partial = args.has('--partial');
const syntax = args.has('--syntax');
const errors = [];
const warnings = [];
const stats = { expectedSkills: manifest.skill_count, checkedSkills: 0, markdown: 0, localLinks: 0, scriptImports: 0, syntaxChecks: 0, dependencyFiles: 0 };
const rel = p => path.relative(root, p).split(path.sep).join('/');
const read = p => fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
const within = p => p === root || p.startsWith(root + path.sep);
const files = p => !fs.existsSync(p) ? [] : fs.readdirSync(p, { withFileTypes: true }).flatMap(e => {
  const target = path.join(p, e.name);
  if (e.isSymbolicLink()) return [];
  return e.isDirectory() ? files(target) : [target];
});

function scalar(value) {
  const s = value.trim();
  if (s.startsWith('"')) { try { return JSON.parse(s); } catch { return null; } }
  if (s.startsWith("'")) return s.endsWith("'") ? s.slice(1, -1).replace(/''/g, "'") : null;
  return s.replace(/\s+#.*$/, '').trim();
}

const names = new Set();
const destinations = new Set();
const sources = new Set();
for (const skill of manifest.skills) {
  if (names.has(skill.name)) errors.push(`Duplicate canonical name: ${skill.name}`);
  names.add(skill.name);
  if (destinations.has(skill.path)) errors.push(`Duplicate destination: ${skill.path}`);
  destinations.add(skill.path);
  for (const source of skill.historical_sources) {
    if (sources.has(source)) errors.push(`Historical source assigned twice: ${source}`);
    sources.add(source);
  }
  const filename = path.resolve(root, skill.path, 'SKILL.md');
  if (!within(filename)) { errors.push(`Skill escapes repository: ${skill.path}`); continue; }
  if (!fs.existsSync(filename)) {
    if (!partial) errors.push(`Missing skill: ${skill.path}`);
    continue;
  }
  stats.checkedSkills++;
  const body = read(filename);
  const front = body.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!front) { errors.push(`${skill.path}: missing/invalid frontmatter`); continue; }
  const allowed = new Set(['name', 'description', 'license', 'allowed-tools', 'metadata']);
  const fields = {};
  for (const line of front[1].split(/\r?\n/)) {
    const field = line.match(/^([a-zA-Z][a-zA-Z0-9_-]*):\s*(.*)$/);
    if (!field) continue;
    if (!allowed.has(field[1])) errors.push(`${skill.path}: unsupported frontmatter key ${field[1]}`);
    fields[field[1]] = scalar(field[2]);
  }
  if (fields.name !== skill.name || path.basename(skill.path) !== skill.name) errors.push(`${skill.path}: name does not match manifest/folder`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.name || '') || (fields.name || '').length > 64) errors.push(`${skill.path}: invalid canonical name`);
  if (!fields.description || typeof fields.description !== 'string' || fields.description.length > 1024 || /[<>]/.test(fields.description)) errors.push(`${skill.path}: invalid description scalar`);
  if (/^\s*(?:name|description):\s*[>|]/m.test(front[1])) errors.push(`${skill.path}: name/description must use inline scalars`);
  if (/\[TODO:|\[INSERT |\[PLACEHOLDER/i.test(body)) errors.push(`${skill.path}: unfinished scaffold`);
  if (!fs.existsSync(path.resolve(root, skill.path, 'SOURCES.md'))) errors.push(`${skill.path}: missing source provenance`);
}
if (manifest.skills.length !== manifest.skill_count) errors.push('Manifest skill count mismatch');
if (sources.size !== manifest.source_count) errors.push('Historical source coverage mismatch');
if (!partial) {
  const actual = files(path.join(root, 'skills')).filter(p => path.basename(p) === 'SKILL.md');
  const extras = actual.filter(p => !destinations.has(rel(path.dirname(p))));
  for (const p of extras) errors.push(`Unmapped discovery entrypoint: ${rel(p)}`);
  for (const retired of manifest.retired_collection_roots || []) if (fs.existsSync(path.resolve(root, retired))) errors.push(`Retired source collection still present: ${retired}`);
}

const canonicalFiles = manifest.skills.flatMap(s => files(path.resolve(root, s.path)));
const supportFiles = files(path.join(root, 'support'));
const repositoryDocs = ['README.md', 'AGENTS.md', 'THIRD_PARTY_NOTICES.md', 'consolidation/STATUS.md', 'consolidation/WORKING-AGREEMENT.md'].map(p => path.resolve(root, p)).filter(p => fs.existsSync(p));
const inspected = [...new Set([...canonicalFiles, ...supportFiles, ...repositoryDocs])];
for (const filename of inspected) {
  if (filename.endsWith('.md')) {
    stats.markdown++;
    // Examples inside fenced blocks are not live Markdown links.
    const text = read(filename).replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '');
    const links = /!?\[[^\]\n]*\]\((<[^>]+>|[^\s)]+)(?:\s+[^)]*)?\)/g;
    for (const match of text.matchAll(links)) {
      let target = match[1].replace(/^<|>$/g, '');
      if (/^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(target)) continue;
      if (/[{}*$]/.test(target)) continue;
      target = target.split('#')[0].split('?')[0];
      if (!target) continue;
      try { target = decodeURIComponent(target); } catch { errors.push(`${rel(filename)}: malformed link ${target}`); continue; }
      const resolved = target.startsWith('/') ? path.resolve(root, '.' + target) : path.resolve(path.dirname(filename), target);
      stats.localLinks++;
      if (!within(resolved) || !fs.existsSync(resolved)) errors.push(`${rel(filename)}: broken local link ${target}`);
    }
  }
  if (/\.(?:cjs|mjs|js)$/.test(filename)) {
    const text = read(filename);
    const imports = /(?:require\s*\(\s*|(?:import|export)\s+(?:[^'";\n]*?\s+from\s+)?|import\s*\(\s*)['"](\.[^'"]+)['"]/g;
    for (const match of text.matchAll(imports)) {
      const resolved = path.resolve(path.dirname(filename), match[1]);
      const candidates = [resolved, ...['.js', '.cjs', '.mjs', '.json', '.node'].map(e => resolved + e), ...['index.js', 'index.cjs', 'index.mjs'].map(e => path.join(resolved, e))];
      stats.scriptImports++;
      if (!within(resolved) || !candidates.some(p => fs.existsSync(p))) errors.push(`${rel(filename)}: missing relative script import ${match[1]}`);
    }
    if (syntax) {
      const result = cp.spawnSync(process.execPath, ['--check', filename], { encoding: 'utf8', windowsHide: true });
      stats.syntaxChecks++;
      if (result.status !== 0) errors.push(`${rel(filename)}: syntax check failed: ${(result.stderr || result.error || '').toString().trim()}`);
    }
  }
}

for (const category of manifest.categories) {
  const filename = path.join(root, 'support', category.name, 'dependencies.json');
  if (!fs.existsSync(filename)) { if (!partial) errors.push(`Missing dependency inventory: support/${category.name}/dependencies.json`); continue; }
  try {
    const dep = JSON.parse(read(filename));
    if (!Array.isArray(dep.files)) { warnings.push(`${rel(filename)}: dependency inventory needs common-schema normalization`); continue; }
    for (const item of dep.files) {
      if (!item.path) { errors.push(`${rel(filename)}: dependency without path`); continue; }
      const target = path.resolve(root, item.path);
      if (!within(target) || !fs.existsSync(target)) errors.push(`${rel(filename)}: dependency missing: ${item.path}`);
      stats.dependencyFiles++;
      if (item.consumers && !Array.isArray(item.consumers)) errors.push(`${rel(filename)}: consumers must be an array for ${item.path}`);
      else for (const consumer of item.consumers || []) if (!names.has(consumer)) errors.push(`${rel(filename)}: unknown consumer ${consumer}`);
    }
  } catch (e) { errors.push(`${rel(filename)}: ${e.message}`); }
}

const report = { status: errors.length ? 'failed' : 'passed', partial, checks: stats, warnings, errors };
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
process.exitCode = errors.length ? 1 : 0;
