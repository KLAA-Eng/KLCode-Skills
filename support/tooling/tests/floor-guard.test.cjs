'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const guard = path.resolve(__dirname, '../../../skills/tooling/quality-constraints/scripts/floor-guard.cjs');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'klcode-floor-guard-'));
const git = (...args) => {
  const r = spawnSync('git', args, { cwd: fixture, encoding: 'utf8', windowsHide: true });
  assert.equal(r.status, 0, r.stderr || String(r.error));
};
const run = (args = ['--base', 'HEAD'], extra = {}) => spawnSync(process.execPath, [guard, ...args], {
  cwd: fixture, encoding: 'utf8', windowsHide: true, ...extra,
});
let cases = 0;
const expect = (result, status, evidence) => {
  assert.equal(result.status, status, result.stderr || result.stdout);
  if (evidence) assert.match(result.stderr + result.stdout, evidence);
  cases++;
};
try {
  git('init', '--quiet');
  fs.writeFileSync(path.join(fixture, 'value.py'), 'value = 1\n');
  fs.writeFileSync(path.join(fixture, 'value.test.py'), 'assert 1 == 1\n');
  fs.writeFileSync(path.join(fixture, 'CONSTRAINTS.md'), '# Selected constraints\n- Coverage: at least 75%\n');
  git('add', '.');
  git('-c', 'user.name=KLCode fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'fixture baseline');
  expect(run([]), 2, /explicit --base/);
  expect(run(), 0, /clean/);
  fs.writeFileSync(path.join(fixture, 'value.py'), 'value = 2\n');
  expect(run(), 0, /clean/);
  fs.writeFileSync(path.join(fixture, 'new file.py'), 'value = 3 # noqa\n');
  expect(run(), 1, /silenced-checker/);
  fs.unlinkSync(path.join(fixture, 'new file.py'));
  fs.writeFileSync(path.join(fixture, 'CONSTRAINTS.md'), '# Selected constraints\n- Coverage: at least 70%\n');
  expect(run(), 1, /threshold-loosened/);
  fs.writeFileSync(path.join(fixture, 'CONSTRAINTS.md'), '# Selected constraints\n- Coverage: at least 80%\n');
  expect(run(), 0, /clean/);
  fs.unlinkSync(path.join(fixture, 'value.test.py'));
  expect(run(), 1, /test-deleted/);
  expect(run(['--base', 'missing-fixture-reference']), 2, /no merge base/);
  expect(run(['--base', 'HEAD'], { env: { ...process.env, PATH: fixture } }), 2, /not inside a git work tree/);
  console.log(`PASS: ${cases} Git-backed floor-guard behavior cases`);
} finally {
  const resolved = fs.realpathSync(fixture);
  assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir()));
  assert.ok(path.basename(resolved).startsWith('klcode-floor-guard-'));
  fs.rmSync(resolved, { recursive: true });
}
