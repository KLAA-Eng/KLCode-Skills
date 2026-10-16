'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { validateRules } = require('./validate-rules.cjs');

function fixture(t) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'klcode-rules-test-'));
  const root = path.join(base, 'repo');
  function write(relative, body) {
    const target = path.join(root, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, body);
  }
  const original = '# Upstream testing\n';
  const coverage = {
    schema_version: 1,
    selected_directories: ['common'],
    sources: [{ source_repo: 'ref.ECC', source_path: 'rules/common/testing.md',
      sha256: crypto.createHash('sha256').update(original).digest('hex'), disposition: 'adapted',
      destinations: ['rules/common/testing.md'], rationale: 'Use the approved changed-code target.' }],
    rules: [{ path: 'rules/common/testing.md', consumers: ['skills/engineering/verification/SKILL.md'] }],
    upstream_inventory: [{ source_repo: 'ref.ECC', directory: 'rules', extensions: ['.md'] }]
  };
  write('rules/common/testing.md', '# Testing\n');
  write('skills/engineering/verification/SKILL.md', '# Verification\n\nRead [testing](../../../rules/common/testing.md).\n');
  write('consolidation/source-lock.json', JSON.stringify({ reference_repositories: [{ repository: 'ref.ECC' }] }));
  const source = path.join(base, 'ref.ECC/rules/common/testing.md');
  fs.mkdirSync(path.dirname(source), { recursive: true });
  fs.writeFileSync(source, original);
  function save() { write('rules/coverage.json', JSON.stringify(coverage)); }
  t.after(() => {
    const target = path.resolve(base);
    assert.ok(target.startsWith(path.resolve(os.tmpdir()) + path.sep));
    assert.ok(path.basename(target).startsWith('klcode-rules-test-'));
    fs.rmSync(target, { recursive: true, force: true });
  });
  save();
  return { root, base, coverage, write, save, source };
}

test('accepts a traced selected rule and actual skill link', t => {
  const f = fixture(t);
  assert.equal(validateRules(f.root, { upstream: true }).status, 'passed');
});
test('rejects an invented consumer whose skill does not link the rule', t => {
  const f = fixture(t);
  f.write('skills/engineering/verification/SKILL.md', '# Verification\n');
  assert.match(validateRules(f.root).errors.join('\n'), /does not link/);
});
test('comments and code examples do not count as usable skill links', t => {
  const f = fixture(t);
  for (const body of [
    '<!-- Read [testing](../../../rules/common/testing.md). -->',
    '`[testing](../../../rules/common/testing.md)`',
    '```md\nRead [testing](../../../rules/common/testing.md).\n```'
  ]) {
    f.write('skills/engineering/verification/SKILL.md', '# Verification\n\n' + body + '\n');
    assert.match(validateRules(f.root).errors.join('\n'), /does not link/);
  }
});
test('rejects unrecorded rules added to a selected directory', t => {
  const f = fixture(t);
  f.write('rules/common/security.md', '# Security\n');
  assert.match(validateRules(f.root).errors.join('\n'), /Unrecorded selected rule/);
});
test('rejects selected rules without an upstream disposition', t => {
  const f = fixture(t);
  f.coverage.sources[0].destinations = ['rules/README.md'];
  f.write('rules/README.md', '# Rules\n'); f.save();
  assert.match(validateRules(f.root).errors.join('\n'), /No source mapping/);
});
test('rejects duplicate sources and missing destinations', t => {
  const f = fixture(t);
  f.coverage.sources.push({ ...f.coverage.sources[0], destinations: ['rules/missing.md'] }); f.save();
  const errors = validateRules(f.root).errors.join('\n');
  assert.match(errors, /Duplicate source/); assert.match(errors, /Missing destination/);
});
test('requires reasons for exclusions but does not require a destination', t => {
  const f = fixture(t);
  f.coverage.sources.push({ source_repo: 'ref.ECC', source_path: 'rules/rust/testing.md',
    sha256: 'a'.repeat(64), disposition: 'excluded', destinations: [], rationale: '' }); f.save();
  assert.match(validateRules(f.root).errors.join('\n'), /Missing rationale/);
  f.coverage.sources[1].rationale = 'Language not selected.'; f.save();
  assert.equal(validateRules(f.root).status, 'passed');
});
test('rejects source and destination traversal', t => {
  const f = fixture(t);
  f.coverage.sources[0].source_path = '../private.md';
  f.coverage.sources[0].destinations = ['../private.md']; f.save();
  const errors = validateRules(f.root).errors.join('\n');
  assert.match(errors, /Unsafe source path/); assert.match(errors, /Unsafe destination/);
});
test('upstream verification detects changed fingerprints and new rule candidates', t => {
  const f = fixture(t);
  fs.writeFileSync(f.source, '# Changed upstream\n');
  fs.writeFileSync(path.join(path.dirname(f.source), 'new-rule.md'), '# New rule\n');
  const errors = validateRules(f.root, { upstream: true }).errors.join('\n');
  assert.match(errors, /Source fingerprint mismatch/); assert.match(errors, /Unaudited upstream candidate/);
});
test('rejects missing or inconsistent detailed audit records', t => {
  const f = fixture(t);
  const auditPath = 'consolidation/detail-audit.json';
  f.coverage.sources[0].audit_records = [auditPath]; f.save();
  assert.match(validateRules(f.root).errors.join('\n'), /Cannot read audit record/);
  f.write(auditPath, JSON.stringify({ sources: [{ ...f.coverage.sources[0], disposition: 'excluded' }] }));
  assert.match(validateRules(f.root).errors.join('\n'), /Audit record disagrees/);
  f.write(auditPath, JSON.stringify({ sources: [f.coverage.sources[0]] }));
  assert.equal(validateRules(f.root).status, 'passed');
});
