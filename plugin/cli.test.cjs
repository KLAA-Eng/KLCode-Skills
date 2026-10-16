"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const cp = require("node:child_process");
const cli = path.join(__dirname, "cli.cjs");
test("CLI rejects ignored project options instead of implying another package was validated", () => {
  const result = cp.spawnSync(
    process.execPath,
    [cli, "validate", "--project", os.tmpdir()],
    { encoding: "utf8", windowsHide: true },
  );
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--project.*setup.*doctor/);
});
test("CLI setup preview creates nothing and unsupported activation flags are rejected", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "klcode-cli-test-"));
  t.after(() => {
    assert.ok(
      path.resolve(root).startsWith(path.resolve(os.tmpdir()) + path.sep),
    );
    assert.ok(path.basename(root).startsWith("klcode-cli-test-"));
    fs.rmSync(root, { recursive: true, force: true });
  });
  const before = fs.readdirSync(root);
  const preview = cp.spawnSync(
    process.execPath,
    [cli, "setup", "--project", root],
    { encoding: "utf8", windowsHide: true },
  );
  assert.equal(preview.status, 0, preview.stderr);
  assert.equal(JSON.parse(preview.stdout).config.hooks.enabled, false);
  const refused = cp.spawnSync(
    process.execPath,
    [cli, "setup", "--project", root, "--activate"],
    { encoding: "utf8", windowsHide: true },
  );
  assert.equal(refused.status, 1);
  assert.deepEqual(fs.readdirSync(root), before);
});
test("CLI requires an explicit project for a setup write", () => {
  const result = cp.spawnSync(process.execPath, [cli, "setup", "--write"], {
    encoding: "utf8",
    windowsHide: true,
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /explicit --project/);
});
