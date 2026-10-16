"use strict";
const { test } = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  os = require("node:os"),
  path = require("node:path");
const { loadProjectConfig, validateConfig } = require("./config.cjs");
const { handle, editedFiles } = require("./hook.cjs");
const { spawn, spawnSync } = require("node:child_process");
function removeFixture(target, prefix) {
  const resolved = path.resolve(target);
  const real = fs.realpathSync(resolved);
  const temp = fs.realpathSync(os.tmpdir());
  assert.equal(path.dirname(real).toLowerCase(), temp.toLowerCase());
  assert.ok(path.basename(real).startsWith(prefix));
  assert.equal(fs.lstatSync(resolved).isSymbolicLink(), false);
  fs.rmSync(resolved, { recursive: true, force: true });
}
function fixture(t, overrides = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "klcode hooks space "));
  t.after(() => removeFixture(root, "klcode hooks space "));
  fs.mkdirSync(path.join(root, ".git"));
  fs.mkdirSync(path.join(root, ".klcode"));
  const config = { schema_version: 1, hooks: { enabled: true, ...overrides } };
  fs.writeFileSync(
    path.join(root, ".klcode", "config.json"),
    JSON.stringify(config),
  );
  return root;
}
const payload = (root, extra = {}) => ({
  cwd: root,
  session_id: "test session",
  ...extra,
});
test("disabled and missing configuration produce no side effects", (t) => {
  const root = fixture(t, { enabled: false });
  assert.deepEqual(handle("claude", "SessionStart", payload(root)), {});
  assert.equal(fs.existsSync(path.join(root, ".klcode/state")), false);
  fs.unlinkSync(path.join(root, ".klcode/config.json"));
  assert.equal(loadProjectConfig(root).config.hooks.enabled, false);
});
test("local merge preserves defaults; nested git boundary prevents parent inheritance", (t) => {
  const root = fixture(t);
  fs.writeFileSync(
    path.join(root, ".klcode/config.local.json"),
    JSON.stringify({ hooks: { operations: { mode: "block" } } }),
  );
  assert.equal(loadProjectConfig(root).config.hooks.operations.mode, "block");
  const nested = path.join(root, "nested");
  fs.mkdirSync(nested);
  fs.mkdirSync(path.join(nested, ".git"));
  assert.equal(loadProjectConfig(nested).found, false);
});
test("malformed config cannot silently enable hooks or lose known block intent", (t) => {
  const root = fixture(t, { operations: { mode: "block" } });
  fs.writeFileSync(path.join(root, ".klcode/config.local.json"), "bad");
  const loaded = loadProjectConfig(root);
  assert.ok(loaded.errors.length);
  assert.equal(loaded.config.hooks.operations.mode, "block");
  assert.equal(validateConfig({ schema_version: 2 }).valid, false);
});
test("edit extraction covers MultiEdit and documented Codex patch command including move", () => {
  assert.deepEqual(
    editedFiles({
      tool_name: "MultiEdit",
      tool_input: { file_path: "a.py", edits: [{ old_string: "a" }] },
    }),
    ["a.py"],
  );
  assert.deepEqual(
    editedFiles({
      tool_name: "apply_patch",
      tool_input: {
        command:
          "*** Begin Patch\n*** Update File: a.py\n*** Move to: b.py\n*** Add File: path with spaces/a.js\n*** End Patch",
      },
    }),
    ["a.py", "b.py", "path with spaces/a.js"],
  );
});
test("advisory and blocking destructive operations never approve permissions", (t) => {
  const root = fixture(t);
  const p = payload(root, {
    tool_name: "PowerShell",
    tool_input: { command: "Remove-Item -Recurse -Force C:\\important" },
  });
  assert.match(handle("claude", "PreToolUse", p).systemMessage, /destructive/i);
  fs.writeFileSync(
    path.join(root, ".klcode/config.local.json"),
    JSON.stringify({ hooks: { operations: { mode: "block" } } }),
  );
  assert.equal(
    handle("codex", "PreToolUse", p).hookSpecificOutput.permissionDecision,
    "deny",
  );
});
test("configured argv checks cache only status; stop notices stale files and bounds blocking", (t) => {
  const root = fixture(t, {
    quality: {
      enabled: true,
      checks: [
        {
          id: "syntax",
          extensions: [".js"],
          argv: ["{node}", "--check", "{file}"],
        },
      ],
    },
    completion: { mode: "block", max_block_attempts: 1 },
  });
  const file = path.join(root, "bad.js");
  fs.writeFileSync(file, "const =");
  const p = payload(root, {
    tool_name: "Write",
    tool_input: { file_path: file },
  });
  assert.match(handle("claude", "PostToolUse", p).systemMessage, /failed/i);
  const stop = handle("claude", "Stop", payload(root));
  assert.equal(stop.decision, "block");
  assert.equal(handle("claude", "Stop", payload(root)).decision, undefined);
  fs.writeFileSync(file, "const fine=1;");
  assert.match(handle("claude", "Stop", payload(root)).systemMessage, /stale/i);
  assert.match(handle("codex", "PostToolUse", p).systemMessage, /passed/i);
  assert.equal(handle("codex", "Stop", payload(root)).decision, undefined);
  const state = fs.readFileSync(
    fs
      .readdirSync(path.join(root, ".klcode/state"))
      .map((n) => path.join(root, ".klcode/state", n))[0],
    "utf8",
  );
  assert.equal(state.includes("const fine"), false);
});
test("timeouts are failures, never false passes", (t) => {
  const root = fixture(t, {
    quality: {
      enabled: true,
      checks: [
        {
          id: "timeout",
          extensions: [".js"],
          argv: ["{node}", "-e", "setTimeout(()=>{},5000)"],
          timeout_ms: 50,
        },
      ],
    },
  });
  fs.writeFileSync(path.join(root, "a.js"), "");
  assert.match(
    handle(
      "claude",
      "PostToolUse",
      payload(root, { tool_name: "Edit", tool_input: { file_path: "a.js" } }),
    ).systemMessage,
    /failed/i,
  );
});
test("outside edits, missing sessions and symlink state never write external state", (t) => {
  const root = fixture(t);
  assert.match(
    handle(
      "claude",
      "PostToolUse",
      payload(root, {
        tool_name: "Edit",
        tool_input: { file_path: "../external.js" },
      }),
    ).systemMessage,
    /outside|scope/i,
  );
  assert.match(
    handle("claude", "Stop", { cwd: root }).systemMessage,
    /session/i,
  );
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), "klcode outside "));
  t.after(() => removeFixture(outside, "klcode outside "));
  try {
    fs.symlinkSync(outside, path.join(root, ".klcode/state"), "junction");
  } catch (e) {
    if (e.code === "EPERM") return;
    throw e;
  }
  assert.match(
    handle("claude", "Stop", payload(root)).systemMessage,
    /state|link/i,
  );
  assert.deepEqual(fs.readdirSync(outside), []);
});

test("concurrent edit hooks preserve a failed result alongside another successful check", async (t) => {
  const root = fixture(t, {
    quality: {
      enabled: true,
      checks: [
        {
          id: "syntax",
          extensions: [".js"],
          argv: [
            "{node}",
            "-e",
            "setTimeout(()=>process.exit(require('node:fs').readFileSync(process.argv[1],'utf8').includes('FAIL')?1:0),200)",
            "{file}",
          ],
        },
      ],
    },
  });
  fs.writeFileSync(path.join(root, "failed.js"), "FAIL");
  fs.writeFileSync(path.join(root, "passed.js"), "PASS");
  const invoke = (file) =>
    new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [
          path.join(__dirname, "hook.cjs"),
          "--host",
          "claude",
          "--event",
          "PostToolUse",
        ],
        { cwd: root, windowsHide: true },
      );
      let output = "";
      child.stdout.on("data", (chunk) => (output += chunk));
      child.on("error", reject);
      child.on("close", (code) =>
        code === 0 ? resolve(JSON.parse(output)) : reject(Error("hook failed")),
      );
      child.stdin.end(
        JSON.stringify(
          payload(root, {
            tool_name: "Write",
            tool_input: { file_path: file },
          }),
        ),
      );
    });
  const results = await Promise.all([invoke("failed.js"), invoke("passed.js")]);
  assert.match(results[0].systemMessage, /failed/);
  assert.match(results[1].systemMessage, /passed/);
  assert.match(
    handle("claude", "Stop", payload(root)).systemMessage,
    /failed check syntax/,
  );
  const cache = JSON.parse(
    fs.readFileSync(
      path.join(
        root,
        ".klcode/state",
        fs.readdirSync(path.join(root, ".klcode/state"))[0],
      ),
      "utf8",
    ),
  );
  assert.equal(cache.results.length, 2);
});

test("malformed and oversized CLI input fails closed for a known explicit operation blocker", (t) => {
  const root = fixture(t, { operations: { mode: "block" } });
  for (const input of ["{bad", "x".repeat(1024 * 1024 + 1)]) {
    const child = spawnSync(
      process.execPath,
      [
        path.join(__dirname, "hook.cjs"),
        "--host",
        "codex",
        "--event",
        "PreToolUse",
      ],
      { cwd: root, input, encoding: "utf8", maxBuffer: 2 * 1024 * 1024 },
    );
    assert.equal(
      JSON.parse(child.stdout).hookSpecificOutput.permissionDecision,
      "deny",
    );
  }
  assert.equal(fs.existsSync(path.join(root, ".klcode/state")), false);
});

test("mutation during a configured checker cannot be cached as passing", (t) => {
  const root = fixture(t, {
    quality: {
      enabled: true,
      checks: [
        {
          id: "bad-checker",
          extensions: [".js"],
          argv: [
            "{node}",
            "-e",
            "require('node:fs').appendFileSync(process.argv[1],'changed')",
            "{file}",
          ],
        },
      ],
    },
  });
  fs.writeFileSync(path.join(root, "a.js"), "initial");
  assert.match(
    handle(
      "claude",
      "PostToolUse",
      payload(root, { tool_name: "Edit", tool_input: { file_path: "a.js" } }),
    ).systemMessage,
    /failed/,
  );
  assert.match(handle("claude", "Stop", payload(root)).systemMessage, /stale/);
});

test("configuration rejects executable wrappers, unknown fields, invalid limits and duplicate checks", () => {
  const check = {
    id: "syntax",
    extensions: [".js"],
    argv: ["{node}", "--check", "{file}"],
  };
  for (const value of [
    { schema_version: 1, unknown: true },
    {
      schema_version: 1,
      hooks: { quality: { checks: [{ ...check, argv: ["check.cmd"] }] } },
    },
    {
      schema_version: 1,
      hooks: { quality: { checks: [{ ...check, timeout_ms: 10001 }] } },
    },
    { schema_version: 1, hooks: { quality: { checks: [check, check] } } },
    { schema_version: 1, hooks: { completion: { max_block_attempts: 0 } } },
    JSON.parse('{"schema_version":1,"__proto__":{"polluted":true}}'),
  ])
    assert.equal(validateConfig(value).valid, false);
});

test("Codex Bash alias also recognizes native Windows destructive commands", (t) => {
  const root = fixture(t, { operations: { mode: "block" } });
  assert.equal(
    handle(
      "codex",
      "PreToolUse",
      payload(root, {
        tool_name: "Bash",
        tool_input: { command: "Remove-Item -Recurse -Force C:\\important" },
      }),
    ).hookSpecificOutput.permissionDecision,
    "deny",
  );
});

test("bounded result eviction stays visible as a completion gap", (t) => {
  const root = fixture(t, {
    quality: {
      enabled: true,
      checks: [
        {
          id: "syntax",
          extensions: [".JS"],
          argv: ["{node}", "--check", "{file}"],
        },
      ],
    },
  });
  fs.writeFileSync(path.join(root, "a.js"), "let x=1");
  assert.match(
    handle(
      "claude",
      "PostToolUse",
      payload(root, { tool_name: "Write", tool_input: { file_path: "a.js" } }),
    ).systemMessage,
    /passed/,
  );
  const stateFile = path.join(
    root,
    ".klcode/state",
    fs.readdirSync(path.join(root, ".klcode/state"))[0],
  );
  const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
  // 128 existing checks followed by one new result forces the supported cache bound.
  state.results = Array.from({ length: 128 }, (_, i) => ({
    ...state.results[0],
    file: `old-${i}.js`,
    status: "deleted",
    fingerprint: "",
  }));
  fs.writeFileSync(stateFile, JSON.stringify(state));
  handle(
    "claude",
    "PostToolUse",
    payload(root, { tool_name: "Write", tool_input: { file_path: "a.js" } }),
  );
  assert.match(
    handle("claude", "Stop", payload(root)).systemMessage,
    /incomplete/,
  );
});

test("valid JSON with invalid cached state schema reports a verification gap", (t) => {
  const root = fixture(t, {
    quality: {
      enabled: true,
      checks: [
        {
          id: "syntax",
          extensions: [".js"],
          argv: ["{node}", "--check", "{file}"],
        },
      ],
    },
    completion: { mode: "block", max_block_attempts: 1 },
  });
  fs.writeFileSync(path.join(root, "a.js"), "const =");
  handle(
    "claude",
    "PostToolUse",
    payload(root, { tool_name: "Write", tool_input: { file_path: "a.js" } }),
  );
  const stateFile = path.join(
    root,
    ".klcode/state",
    fs.readdirSync(path.join(root, ".klcode/state"))[0],
  );
  const original = JSON.parse(fs.readFileSync(stateFile, "utf8"));
  for (const corrupt of [
    { ...original, results: null },
    { ...original, results: [{ ...original.results[0], status: "unknown" }] },
    { ...original, stop_attempts: -1 },
    { ...original, incomplete: "false" },
  ]) {
    fs.writeFileSync(stateFile, JSON.stringify(corrupt));
    const result = handle("claude", "Stop", payload(root));
    assert.match(result.systemMessage, /verification gap/i);
    assert.doesNotMatch(
      result.systemMessage,
      /no known failures|no cached checks/i,
    );
    assert.equal(result.decision, undefined);
    assert.match(
      handle("claude", "Stop", payload(root, { stop_hook_active: true }))
        .systemMessage,
      /verification gap/i,
    );
  }
});
