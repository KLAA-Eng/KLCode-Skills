'use strict';
// KLCode adaptation checks: local-default paths, atomic publication and refusal.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const helper = path.resolve(__dirname, '../../scripts/story-ledger.js');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'klcode-story-ledger-'));
const dir = path.join(root, 'docs/plans/story-ledger');
function run(args, success = true) {
  const result = spawnSync(process.execPath, [helper, ...args, '--root', root], { encoding: 'utf8' });
  if (success) assert.equal(result.status, 0, result.stderr);
  else assert.notEqual(result.status, 0, 'invalid write unexpectedly succeeded');
  return result.stdout ? JSON.parse(result.stdout) : null;
}
function apply(changes, success = true) {
  const input = path.join(root, 'changes.json');
  fs.writeFileSync(input, JSON.stringify(changes));
  return run(['apply', '--input', input], success);
}
try {
  run(['init']);
  assert.ok(fs.existsSync(path.join(dir, 'epics')));
  assert.ok(!fs.existsSync(path.join(root, '.stories')));
  const epic = '# Epic: Example\n\n<!-- Derived from story files -->\n| ID | Title | Status |\n| --- | --- | --- |\n';
  apply({ create: { 'epics/example.md': epic } });
  const ids = run(['allocate', '--epic', 'example', '--count', '2']).ids;
  assert.equal(new Set(ids).size, 2);
  function story(status) { return `# Story: Useful behavior\n\n**ID:** ${ids[0]}\n**Epic:** example\n**Sprint:** unassigned\n**Status:** ${status}\n**Points:** 3\n`; }
  apply({ create: { [`${ids[0]}.md`]: story('todo') } });
  const before = fs.readFileSync(path.join(dir, `${ids[0]}.md`), 'utf8');
  apply({ update: { [`${ids[0]}.md`]: story('done') } }, false);
  assert.equal(fs.readFileSync(path.join(dir, `${ids[0]}.md`), 'utf8'), before);
  apply({ create: { '../outside.md': 'escape' } }, false);
  assert.ok(!fs.existsSync(path.join(root, 'docs/plans/outside.md')));
  apply({ create: { [`${ids[0]}.md`]: story('todo') } }, false);
  for (const status of ['in-progress', 'review', 'done']) apply({ update: { [`${ids[0]}.md`]: story(status) } });
  const result = run(['status']);
  assert.equal(result.stories[0].status, 'done');
  assert.deepEqual(result.drift, []);
  assert.ok(!fs.existsSync(path.join(dir, '.txn')));
  console.log('PASS ledger default path, IDs, atomic refusal, confinement, transitions and projections');
} finally {
  // The only deletion target is this test's uniquely created temp fixture.
  assert.ok(root.startsWith(path.join(os.tmpdir(), 'klcode-story-ledger-')));
  fs.rmSync(root, { recursive: true, force: true });
}
