#!/usr/bin/env node
'use strict';
// Structural coverage checks; prose incorporation still requires semantic review.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function validateRules(root, { upstream = false } = {}) {
  root = path.resolve(root);
  const errors = [];
  const checks = { selectedRules: 0, sources: 0, consumers: 0, fingerprints: 0, upstreamCandidates: 0 };
  const read = p => fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  const safe = value => typeof value === 'string' && value.length > 0 &&
    !value.includes('\\') && !value.includes(':') && !value.startsWith('/') &&
    value.split('/').every(part => part && part !== '.' && part !== '..');
  const exists = value => safe(value) && fs.existsSync(path.join(root, value));
  const walk = dir => !fs.existsSync(dir) ? [] : fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const target = path.join(dir, e.name);
    if (e.isSymbolicLink()) { errors.push(`Symlink in audited inventory: ${target}`); return []; }
    return e.isDirectory() ? walk(target) : [target];
  });
  let data, locked;
  try {
    data = JSON.parse(read(path.join(root, 'rules/coverage.json')));
    locked = JSON.parse(read(path.join(root, 'consolidation/source-lock.json'))).reference_repositories;
  } catch (e) { return { status: 'failed', checks, errors: [`Cannot read rule inventory: ${e.message}`] }; }
  const repos = new Set((locked || []).map(r => r.repository));
  if (data.schema_version !== 1) errors.push('Unsupported coverage schema');
  for (const key of ['sources', 'rules', 'selected_directories', 'upstream_inventory']) {
    if (!Array.isArray(data[key])) errors.push(`Missing inventory array: ${key}`);
  }
  if (errors.length) return { status: 'failed', checks, errors };

  const sourceKeys = new Set(), mapped = new Set(), rules = new Map(), audits = new Map();
  if (data.policy_record && !exists(data.policy_record)) errors.push(`Missing policy record: ${data.policy_record}`);
  for (const source of data.sources) {
    checks.sources++;
    const key = `${source.source_repo}/${source.source_path}`;
    if (sourceKeys.has(key)) errors.push(`Duplicate source: ${key}`);
    sourceKeys.add(key);
    if (!repos.has(source.source_repo)) errors.push(`Unknown reference repository: ${source.source_repo}`);
    if (!safe(source.source_path)) errors.push(`Unsafe source path: ${key}`);
    if (!/^[a-f0-9]{64}$/.test(source.sha256 || '')) errors.push(`Invalid source fingerprint: ${key}`);
    if (!['incorporated', 'adapted', 'already-covered', 'excluded'].includes(source.disposition)) errors.push(`Invalid disposition: ${key}`);
    if (!source.rationale || !source.rationale.trim()) errors.push(`Missing rationale: ${key}`);
    if (!Array.isArray(source.destinations)) { errors.push(`Missing destination list: ${key}`); continue; }
    if (source.disposition !== 'excluded' && !source.destinations.length) errors.push(`No destination: ${key}`);
    for (const target of source.destinations) {
      if (!safe(target)) errors.push(`Unsafe destination: ${target}`);
      else if (!exists(target)) errors.push(`Missing destination: ${target}`);
      else if (source.disposition !== 'excluded') mapped.add(target);
    }
    for (const auditPath of source.audit_records || []) {
      if (!safe(auditPath)) { errors.push(`Unsafe audit record: ${auditPath}`); continue; }
      if (!audits.has(auditPath)) {
        try { audits.set(auditPath, JSON.parse(read(path.join(root, auditPath))).sources); }
        catch (e) { errors.push(`Cannot read audit record: ${auditPath}: ${e.message}`); audits.set(auditPath, []); }
      }
      const detail = (audits.get(auditPath) || []).find(s => s.source_repo === source.source_repo && s.source_path === source.source_path);
      if (!detail || detail.sha256 !== source.sha256 || detail.disposition !== source.disposition ||
          !Array.isArray(detail.destinations) || detail.destinations.some(d => !source.destinations.includes(d))) {
        errors.push(`Audit record disagrees: ${auditPath}: ${key}`);
      }
    }
    if (upstream && repos.has(source.source_repo) && safe(source.source_path)) {
      const original = path.join(root, '..', source.source_repo, source.source_path);
      try {
        const actual = crypto.createHash('sha256').update(fs.readFileSync(original)).digest('hex');
        checks.fingerprints++;
        if (actual !== source.sha256) errors.push(`Source fingerprint mismatch: ${key}`);
      } catch (e) { errors.push(`Cannot verify source: ${key}: ${e.code || e.message}`); }
    }
  }
  for (const rule of data.rules) {
    checks.selectedRules++;
    if (!safe(rule.path) || !rule.path.startsWith('rules/')) { errors.push(`Unsafe rule: ${rule.path}`); continue; }
    if (rules.has(rule.path)) errors.push(`Duplicate selected rule: ${rule.path}`);
    rules.set(rule.path, rule);
    if (!exists(rule.path)) errors.push(`Missing selected rule: ${rule.path}`);
    if (!mapped.has(rule.path)) errors.push(`No source mapping: ${rule.path}`);
    if (!Array.isArray(rule.consumers) || !rule.consumers.length) { errors.push(`No skill consumers: ${rule.path}`); continue; }
    for (const consumer of rule.consumers) {
      checks.consumers++;
      if (!safe(consumer) || !consumer.startsWith('skills/') || !consumer.endsWith('/SKILL.md') || !exists(consumer)) {
        errors.push(`Missing or invalid skill consumer: ${consumer}`); continue;
      }
      const text = read(path.join(root, consumer))
        .replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '')
        .replace(/<!--[\s\S]*?(?:-->|$)/g, '')
        .replace(/(`+)[\s\S]*?\1/g, '');
      const linked = [...text.matchAll(/(?<!!)(?<!\\)\[[^\]\n]*\]\(([^\s)]+)\)/g)].some(m => {
        const target = m[1].split('#')[0];
        return path.resolve(root, path.dirname(consumer), target) === path.join(root, rule.path);
      });
      if (!linked) errors.push(`${consumer} does not link ${rule.path}`);
    }
  }
  const actual = new Set();
  for (const dir of data.selected_directories) {
    if (!safe(dir)) { errors.push(`Unsafe selected directory: ${dir}`); continue; }
    const target = path.join(root, 'rules', dir);
    if (!fs.existsSync(target)) errors.push(`Missing selected directory: ${dir}`);
    for (const filename of walk(target).filter(p => p.endsWith('.md'))) {
      const relative = path.relative(root, filename).split(path.sep).join('/');
      actual.add(relative);
      if (!rules.has(relative)) errors.push(`Unrecorded selected rule: ${relative}`);
    }
  }
  for (const rule of rules.keys()) if (!actual.has(rule)) errors.push(`Rule outside selected directories: ${rule}`);

  if (upstream) for (const inventory of data.upstream_inventory) {
    if (!repos.has(inventory.source_repo) || !safe(inventory.directory) || !Array.isArray(inventory.extensions)) {
      errors.push('Invalid upstream discovery root'); continue;
    }
    const base = path.join(root, '..', inventory.source_repo);
    const directory = path.join(base, inventory.directory);
    if (!fs.existsSync(directory)) { errors.push(`Missing upstream discovery root: ${directory}`); continue; }
    for (const filename of walk(directory).filter(p => inventory.extensions.includes(path.extname(p)))) {
      checks.upstreamCandidates++;
      const relative = path.relative(base, filename).split(path.sep).join('/');
      const key = `${inventory.source_repo}/${relative}`;
      if (!sourceKeys.has(key)) errors.push(`Unaudited upstream candidate: ${key}`);
    }
  }
  return { status: errors.length ? 'failed' : 'passed', checks, errors };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.some(arg => arg !== '--upstream')) {
    process.stderr.write('Usage: node scripts/validate-rules.cjs [--upstream]\n'); process.exitCode = 2;
  } else {
    const report = validateRules(path.resolve(__dirname, '..'), { upstream: args.includes('--upstream') });
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
    process.exitCode = report.status === 'passed' ? 0 : 1;
  }
}
module.exports = { validateRules };
