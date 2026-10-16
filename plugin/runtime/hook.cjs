#!/usr/bin/env node
"use strict";
const fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto"),
  { spawnSync } = require("node:child_process");
const { loadProjectConfig, safePath } = require("./config.cjs");
const { decide } = require("../../support/tooling/hooks/operation_guard.cjs");
const hash = (s) => crypto.createHash("sha256").update(s).digest("hex");
const note = (m) => ({ systemMessage: "KLCode: " + m });
const deny = (m) => ({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: "KLCode: " + m,
  },
});
function withStateLock(root, p, action) {
  if (
    typeof p.session_id !== "string" ||
    !p.session_id ||
    p.session_id.length > 512
  )
    throw Error("Missing session id");
  const dir = path.join(root, ".klcode", "state");
  safePath(root, dir, { missing: true });
  fs.mkdirSync(dir, { recursive: true });
  safePath(root, dir);
  const lock = path.join(dir, hash(p.session_id) + ".lock");
  let fd;
  const deadline = Date.now() + 15000;
  while (fd === undefined) {
    safePath(root, lock, { missing: true });
    try {
      fd = fs.openSync(lock, "wx");
    } catch (error) {
      if (error.code !== "EEXIST" || Date.now() >= deadline)
        throw Error("Session state lock unavailable");
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25);
    }
  }
  try {
    return action();
  } finally {
    fs.closeSync(fd);
    safePath(root, lock);
    fs.unlinkSync(lock);
  }
}
function editedFiles(p) {
  const i = p.tool_input || {},
    tool = p.tool_name;
  let files = [];
  if (["Write", "Edit", "NotebookEdit"].includes(tool))
    files = [i.file_path || i.notebook_path];
  else if (tool === "MultiEdit")
    files = Array.isArray(i.edits)
      ? i.edits.map((e) => e.file_path || i.file_path)
      : [i.file_path];
  else if (tool === "apply_patch") {
    const patch = typeof i === "string" ? i : i.command || i.patch || "";
    files = [
      ...String(patch).matchAll(
        /^\*\*\* (?:Add File|Update File|Delete File|Move to): (.+)\r?$/gm,
      ),
    ].map((m) => m[1].trim());
  }
  if (files.length > 256)
    throw Error("Edit path count exceeds invocation limit");
  return [
    ...new Set(files.filter((v) => typeof v === "string" && v.length > 0)),
  ];
}
function fingerprint(root, file) {
  const target = safePath(root, file);
  const s = fs.statSync(target);
  if (!s.isFile() || s.size > 16 * 1024 * 1024)
    throw Error("Check target type/size invalid");
  return hash(fs.readFileSync(target));
}
function stateStore(root, p, config) {
  if (
    typeof p.session_id !== "string" ||
    !p.session_id ||
    p.session_id.length > 512
  )
    throw Error("Missing or invalid session id; cached checks unavailable");
  const dir = path.join(root, ".klcode", "state");
  safePath(root, dir, { missing: true });
  fs.mkdirSync(dir, { recursive: true });
  safePath(root, dir);
  const file = path.join(dir, hash(p.session_id) + ".json");
  safePath(root, file, { missing: true });
  const configHash = hash(JSON.stringify(config)),
    initial = {
      version: 1,
      config_hash: configHash,
      updated: Date.now(),
      results: [],
      stop_attempts: 0,
      incomplete: false,
    };
  let state = initial;
  if (fs.existsSync(file)) {
    const s = fs.statSync(file);
    if (s.size > 131072 || !s.isFile()) throw Error("State size/type invalid");
    try {
      const value = JSON.parse(fs.readFileSync(file, "utf8"));
      const valid =
        value !== null &&
        typeof value === "object" &&
        value.version === 1 &&
        typeof value.config_hash === "string" &&
        /^[a-f0-9]{64}$/.test(value.config_hash) &&
        Number.isFinite(value.updated) &&
        value.updated <= Date.now() + 1000 &&
        value.updated >= 0 &&
        Array.isArray(value.results) &&
        value.results.length <= 128 &&
        value.results.every(
          (r) =>
            r &&
            typeof r.file === "string" &&
            r.file.length <= 4096 &&
            typeof r.check === "string" &&
            /^[a-z0-9-]{1,48}$/.test(r.check) &&
            typeof r.fingerprint === "string" &&
            /^(?:[a-f0-9]{64})?$/.test(r.fingerprint) &&
            ["passed", "failed", "deleted"].includes(r.status),
        ) &&
        typeof value.incomplete === "boolean" &&
        Number.isInteger(value.stop_attempts) &&
        value.stop_attempts >= 0 &&
        value.stop_attempts <= 3;
      if (!valid) throw Error("Invalid cached state schema");
      // Expired or differently configured valid records are not applicable evidence.
      if (
        value.config_hash === configHash &&
        Date.now() - value.updated < 24 * 3600000
      )
        state = value;
    } catch {
      throw Error("Invalid cached state");
    }
  }
  function save() {
    safePath(root, dir);
    state.updated = Date.now();
    if (state.results.length > 128) state.incomplete = true;
    state.results = state.results.slice(-128);
    const tmp = path.join(
      dir,
      hash(p.session_id) + "." + crypto.randomBytes(8).toString("hex") + ".tmp",
    );
    try {
      fs.writeFileSync(tmp, JSON.stringify(state), { flag: "wx" });
      safePath(root, file, { missing: true });
      fs.renameSync(tmp, file);
    } finally {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }
  // Bounded retention without reading transcripts or touching other directories.
  const entries = fs
    .readdirSync(dir)
    .filter((n) => /^[a-f0-9]{64}\.json$/.test(n));
  if (entries.length >= 128 && !fs.existsSync(file))
    throw Error(
      "State file limit reached; remove old project state explicitly",
    );
  return { state, save };
}
function runChecks(root, p, config) {
  const files = editedFiles(p);
  if (!files.length)
    return [
      "Write",
      "Edit",
      "MultiEdit",
      "NotebookEdit",
      "apply_patch",
    ].includes(p.tool_name)
      ? note("Edit payload has no recognized paths; verification gap.")
      : {};
  for (const file of files) safePath(root, file, { missing: true });
  if (!config.hooks.quality.enabled) return {};
  const store = stateStore(root, p, config),
    messages = [];
  let count = 0,
    deadline = Date.now() + 12000;
  for (const file of files) {
    const full = safePath(root, file, { missing: true }),
      relative = path.relative(root, full);
    const checks = config.hooks.quality.checks.filter((c) =>
      c.extensions.some(
        (extension) =>
          extension.toLowerCase() === path.extname(full).toLowerCase(),
      ),
    );
    for (const check of checks) {
      if (++count > 32 || Date.now() >= deadline) {
        store.state.incomplete = true;
        messages.push("remaining checks not run: invocation budget exhausted");
        break;
      }
      let status = "failed",
        stamp = "";
      if (!fs.existsSync(full)) {
        status = "deleted";
        messages.push(check.id + ": target deleted; check not run");
      } else {
        stamp = fingerprint(root, full);
        const argv = check.argv.map((a) =>
          a
            .replaceAll("{file}", full)
            .replaceAll("{project}", root)
            .replaceAll("{node}", process.execPath),
        );
        const timeout = Math.min(
          check.timeout_ms || 3000,
          Math.max(1, deadline - Date.now()),
        );
        const child = spawnSync(argv[0], argv.slice(1), {
          cwd: root,
          shell: false,
          windowsHide: true,
          timeout,
          maxBuffer: 8192,
          stdio: ["ignore", "pipe", "pipe"],
        });
        status =
          !child.error &&
          child.status === 0 &&
          fingerprint(root, full) === stamp
            ? "passed"
            : "failed";
        messages.push(
          check.id +
            ": " +
            status +
            (child.error ? " (runtime error or timeout)" : ""),
        );
      }
      store.state.results = store.state.results.filter(
        (r) => !(r.file === relative && r.check === check.id),
      );
      store.state.results.push({
        file: relative,
        check: check.id,
        status,
        fingerprint: stamp,
      });
    }
  }
  store.save();
  return messages.length
    ? note(messages.join("; "))
    : note(
        "No configured lightweight check matched; verification remains task-specific.",
      );
}
function stop(root, p, config) {
  if (config.hooks.completion.mode === "off") return {};
  const store = stateStore(root, p, config),
    problems = [];
  if (store.state.incomplete)
    problems.push("cached check inventory is incomplete");
  for (const r of store.state.results) {
    try {
      if (r.status === "deleted") {
        if (fs.existsSync(safePath(root, r.file, { missing: true })))
          problems.push("stale check result");
        continue;
      }
      if (fingerprint(root, r.file) !== r.fingerprint)
        problems.push("stale check result");
      else if (r.status === "failed") problems.push("failed check " + r.check);
    } catch {
      problems.push("unavailable check target");
    }
  }
  if (!problems.length)
    return note(
      store.state.results.length
        ? "Cached lightweight checks contain no known failures; full task verification is still required."
        : "No cached checks available; verify this task before completion.",
    );
  const message =
    [...new Set(problems)].join("; ") +
    ". Resolve or report verification gaps.";
  if (
    config.hooks.completion.mode === "block" &&
    !p.stop_hook_active &&
    store.state.stop_attempts < config.hooks.completion.max_block_attempts
  ) {
    store.state.stop_attempts++;
    store.save();
    return { decision: "block", reason: "KLCode: " + message };
  }
  return note(message);
}
function handle(host, event, p) {
  if (
    !["claude", "codex"].includes(host) ||
    !["SessionStart", "PreToolUse", "PostToolUse", "Stop"].includes(event)
  )
    throw Error("Unsupported host/event");
  if (
    !p ||
    typeof p !== "object" ||
    Array.isArray(p) ||
    typeof p.cwd !== "string"
  )
    throw Error("Invalid hook payload cwd");
  const loaded = loadProjectConfig(p.cwd),
    { root, config, errors } = loaded;
  if (!config.hooks.enabled)
    return errors.length
      ? note("Configuration invalid; hooks are disabled. Run doctor.")
      : {};
  const blocking =
    event === "PreToolUse" && config.hooks.operations.mode === "block";
  if (errors.length)
    return blocking
      ? deny("Configuration invalid for explicit blocking guard. Run doctor.")
      : note("Configuration invalid; advisory checks unavailable. Run doctor.");
  try {
    if (event === "SessionStart")
      return config.hooks.session_guidance
        ? {
            hookSpecificOutput: {
              hookEventName: "SessionStart",
              additionalContext:
                "KLCode defaults: use project runtime and explicit scope; test-first for testable changes with practical exceptions; target 80% changed-code coverage; independently review substantive changes. Read " +
                path.resolve(__dirname, "../../rules/README.md") +
                " and applicable canonical skills under " +
                path.resolve(__dirname, "../../skills") +
                " on demand. Hooks do not replace native permissions. No analytics, learning or background observers are enabled.",
            },
          }
        : {};
    if (event === "PreToolUse" && config.hooks.operations.mode !== "off") {
      let reason = decide(p, "careful", root);
      if (
        ["Bash", "PowerShell", "exec_command", "shell_command"].includes(
          p.tool_name,
        ) &&
        typeof p.tool_input?.command !== "string" &&
        typeof p.tool_input?.cmd !== "string"
      )
        reason = "Unknown shell payload requires review.";
      if (
        ["Bash", "PowerShell", "exec_command", "shell_command"].includes(
          p.tool_name,
        )
      )
        reason =
          decide(
            {
              ...p,
              tool_name: "PowerShell",
              tool_input: { command: p.tool_input.command || p.tool_input.cmd },
            },
            "careful",
            root,
          ) || reason;
      for (const file of editedFiles(p))
        safePath(root, file, { missing: true });
      return reason ? (blocking ? deny(reason) : note(reason)) : {};
    }
    if (event === "PostToolUse") {
      if (
        !["Write", "Edit", "MultiEdit", "NotebookEdit", "apply_patch"].includes(
          p.tool_name,
        ) ||
        !config.hooks.quality.enabled
      )
        return {};
      for (const file of editedFiles(p))
        safePath(root, file, { missing: true });
      return withStateLock(root, p, () => runChecks(root, p, config));
    }
    if (event === "Stop" && config.hooks.completion.mode !== "off")
      return withStateLock(root, p, () => stop(root, p, config));
    return {};
  } catch {
    return blocking
      ? deny(
          "Explicit operation guard could not validate this operation. Run doctor.",
        )
      : note(
          "Hook check unavailable (invalid path/scope, session, state or runtime); verification gap. Run doctor.",
        );
  }
}
module.exports = { handle, editedFiles };
if (require.main === module) {
  let raw = "";
  const args = process.argv.slice(2),
    host = args[args.indexOf("--host") + 1],
    event = args[args.indexOf("--event") + 1];
  function inputFailure() {
    let blocking = false;
    try {
      const { config } = loadProjectConfig(process.cwd());
      blocking =
        config.hooks.enabled &&
        event === "PreToolUse" &&
        config.hooks.operations.mode === "block";
    } catch {}
    process.stdout.write(
      JSON.stringify(
        blocking
          ? deny("Invalid hook input for explicit blocking guard; run doctor.")
          : note("Invalid hook input; unavailable. Run doctor."),
      ),
    );
  }
  process.stdin.setEncoding("utf8");
  const timer = setTimeout(() => {
    inputFailure();
    process.exit(0);
  }, 5000);
  process.stdin.on("data", (chunk) => {
    raw += chunk;
    if (Buffer.byteLength(raw) > 1024 * 1024) {
      inputFailure();
      process.exit(0);
    }
  });
  process.stdin.on("end", () => {
    clearTimeout(timer);
    try {
      process.stdout.write(
        JSON.stringify(handle(host, event, JSON.parse(raw))),
      );
    } catch {
      inputFailure();
    }
  });
}
