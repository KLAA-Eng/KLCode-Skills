import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'klcode-ck-test-'));
const commands = fileURLToPath(new URL('../ck/commands/', import.meta.url));
const store = path.join(root, 'docs/knowledge/.ck');
function run(name, input, success = true) {
  const result = spawnSync(process.execPath, [path.join(commands, name + '.mjs')], {
    cwd: root, input: input ? JSON.stringify(input) : undefined, encoding: 'utf8',
    env: { ...process.env, KLCODE_CK_HOME: store },
  });
  if (success) assert.equal(result.status, 0, result.stderr + result.stdout);
  else assert.notEqual(result.status, 0, 'malformed context escaped validation');
  return result;
}
try {
  const registration = spawnSync(process.execPath, [path.join(commands, 'save.mjs'), '--init'], {
    cwd: root, input: JSON.stringify({ name: 'Example', path: root, stack: ['Node'], goal: 'Evidence' }),
    encoding: 'utf8', env: { ...process.env, KLCODE_CK_HOME: store },
  });
  assert.equal(registration.status, 0, registration.stderr);
  run('save', { summary: 'Verified handoff', leftOff: 'Current behavior', nextSteps: ['Review evidence'], decisions: [], blockers: [] });
  assert.ok(run('resume').stdout.includes('Current behavior'));
  assert.ok(fs.existsSync(path.join(store, 'session-notes')));
  const registry = JSON.parse(fs.readFileSync(path.join(store, 'projects.json'), 'utf8'));
  registry[root].contextDir = '../../outside';
  fs.writeFileSync(path.join(store, 'projects.json'), JSON.stringify(registry));
  run('forget', undefined, false);
  assert.ok(fs.existsSync(path.join(store, 'contexts/example/context.json')));
  console.log('PASS CK registration, save/resume, local notes and destructive-target confinement');
} finally {
  assert.ok(root.startsWith(path.join(os.tmpdir(), 'klcode-ck-test-')));
  fs.rmSync(root, { recursive: true, force: true });
}
