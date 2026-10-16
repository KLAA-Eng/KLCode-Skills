"use strict";
const fs = require("node:fs"),
  path = require("node:path");
const DEFAULTS = {
  schema_version: 1,
  hooks: {
    enabled: false,
    session_guidance: true,
    operations: { mode: "warn" },
    quality: { enabled: true, checks: [] },
    completion: { mode: "warn", max_block_attempts: 1 },
  },
};
const object = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
function merge(a, b) {
  const out = structuredClone(a);
  for (const [k, v] of Object.entries(b)) {
    if (["__proto__", "constructor", "prototype"].includes(k))
      throw Error("Unsafe config key");
    out[k] =
      object(v) && object(out[k]) ? merge(out[k], v) : structuredClone(v);
  }
  return out;
}
function validateConfig(v, partial = false) {
  const errors = [];
  const fail = (m) => errors.push(m);
  function keys(o, allowed, label) {
    if (!object(o)) {
      fail(label + " must be an object");
      return false;
    }
    for (const k of Object.keys(o))
      if (!allowed.includes(k)) fail(label + " unknown key: " + k);
    return true;
  }
  if (!keys(v, ["schema_version", "hooks"], "config"))
    return { valid: false, errors };
  if ((!partial || v.schema_version !== undefined) && v.schema_version !== 1)
    fail("schema_version must be 1");
  if (
    v.hooks !== undefined &&
    keys(
      v.hooks,
      ["enabled", "session_guidance", "operations", "quality", "completion"],
      "hooks",
    )
  ) {
    const h = v.hooks;
    for (const k of ["enabled", "session_guidance"])
      if (h[k] !== undefined && typeof h[k] !== "boolean")
        fail("hooks." + k + " must be boolean");
    if (
      h.operations !== undefined &&
      keys(h.operations, ["mode"], "operations") &&
      h.operations.mode !== undefined &&
      !["off", "warn", "block"].includes(h.operations.mode)
    )
      fail("Invalid operation mode");
    if (
      h.completion !== undefined &&
      keys(h.completion, ["mode", "max_block_attempts"], "completion")
    ) {
      if (
        h.completion.mode !== undefined &&
        !["off", "warn", "block"].includes(h.completion.mode)
      )
        fail("Invalid completion mode");
      if (
        h.completion.max_block_attempts !== undefined &&
        (!Number.isInteger(h.completion.max_block_attempts) ||
          h.completion.max_block_attempts < 1 ||
          h.completion.max_block_attempts > 3)
      )
        fail("max_block_attempts must be 1..3");
    }
    if (
      h.quality !== undefined &&
      keys(h.quality, ["enabled", "checks"], "quality")
    ) {
      if (
        h.quality.enabled !== undefined &&
        typeof h.quality.enabled !== "boolean"
      )
        fail("quality.enabled must be boolean");
      if (h.quality.checks !== undefined) {
        if (!Array.isArray(h.quality.checks) || h.quality.checks.length > 16)
          fail("checks must be an array of at most 16");
        else {
          const ids = new Set();
          for (const c of h.quality.checks) {
            if (!keys(c, ["id", "extensions", "argv", "timeout_ms"], "check"))
              continue;
            if (
              typeof c.id !== "string" ||
              !/^[a-z0-9-]{1,48}$/.test(c.id) ||
              ids.has(c.id)
            )
              fail("Invalid or duplicate check id");
            ids.add(c.id);
            if (
              !Array.isArray(c.extensions) ||
              !c.extensions.length ||
              c.extensions.length > 32 ||
              c.extensions.some(
                (e) => typeof e !== "string" || !/^\.[a-z0-9]{1,16}$/i.test(e),
              )
            )
              fail("Invalid extensions");
            if (
              !Array.isArray(c.argv) ||
              !c.argv.length ||
              c.argv.length > 64 ||
              c.argv.some(
                (x) =>
                  typeof x !== "string" || x.length > 4096 || x.includes("\0"),
              )
            )
              fail("Invalid argv");
            else if (
              c.argv[0] !== "{node}" &&
              (!path.win32.isAbsolute(c.argv[0]) ||
                !c.argv[0].toLowerCase().endsWith(".exe"))
            )
              fail("Check executable must be {node} or absolute native .exe");
            if (
              c.timeout_ms !== undefined &&
              (!Number.isInteger(c.timeout_ms) ||
                c.timeout_ms < 50 ||
                c.timeout_ms > 10000)
            )
              fail("timeout_ms must be 50..10000");
          }
        }
      }
    }
  }
  return { valid: errors.length === 0, errors };
}
function inside(root, target) {
  const rel = path.relative(root, target);
  return (
    rel === "" ||
    (!path.isAbsolute(rel) && rel !== ".." && !rel.startsWith(".." + path.sep))
  );
}
function safePath(root, target, { missing = false } = {}) {
  const absolute = path.resolve(root, target);
  if (!inside(root, absolute)) throw Error("Path is outside project scope");
  let current = root;
  for (const part of path
    .relative(root, absolute)
    .split(path.sep)
    .filter(Boolean)) {
    current = path.join(current, part);
    try {
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink())
        throw Error("Symbolic link/junction path rejected");
      if (!inside(root, fs.realpathSync(current)))
        throw Error("Resolved path is outside project scope");
    } catch (e) {
      if (e.code === "ENOENT" && missing) continue;
      throw e;
    }
  }
  return absolute;
}
function readJson(root, file) {
  const safe = safePath(root, file);
  const stat = fs.statSync(safe);
  if (!stat.isFile() || stat.size > 65536)
    throw Error("Config file type/size invalid");
  return JSON.parse(fs.readFileSync(safe, "utf8"));
}
function loadProjectConfig(cwd) {
  let root = fs.realpathSync(cwd),
    found = false,
    config = structuredClone(DEFAULTS);
  const errors = [];
  // Never search past the nearest project marker or Git boundary, or into the user profile.
  const home = process.env.USERPROFILE && path.resolve(process.env.USERPROFILE);
  while (true) {
    if (home && root.toLowerCase() === home.toLowerCase()) break;
    if (fs.existsSync(path.join(root, ".klcode"))) {
      found = true;
      break;
    }
    if (fs.existsSync(path.join(root, ".git"))) break;
    const parent = path.dirname(root);
    if (parent === root) break;
    root = parent;
  }
  if (found) {
    for (const [file, partial] of [
      ["config.json", false],
      ["config.local.json", true],
    ]) {
      const candidate = path.join(root, ".klcode", file);
      try {
        safePath(root, path.join(root, ".klcode"));
        if (!fs.existsSync(candidate)) continue;
        const value = readJson(root, candidate),
          result = validateConfig(value, partial);
        if (!result.valid) {
          errors.push(...result.errors);
          continue;
        }
        config = merge(config, value);
      } catch {
        errors.push("Cannot read valid " + file);
      }
    }
  }
  return { root, config, errors, found };
}
module.exports = {
  DEFAULTS,
  validateConfig,
  loadProjectConfig,
  safePath,
  inside,
};
