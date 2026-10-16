"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { loadProjectConfig, safePath } = require("./runtime/config.cjs");
const json = (filename) =>
  JSON.parse(fs.readFileSync(filename, "utf8").replace(/^\uFEFF/, ""));
const digest = (filename) =>
  crypto.createHash("sha256").update(fs.readFileSync(filename)).digest("hex");
const relative = (value) =>
  typeof value === "string" &&
  !value.includes("\\") &&
  !value.includes(":") &&
  !value.startsWith("/") &&
  value
    .replace(/^\.\//, "")
    .split("/")
    .every((p) => p && p !== "." && p !== "..");

function tree(root, directory) {
  const output = [];
  const start = safePath(root, directory);
  if (!fs.statSync(start).isDirectory())
    throw Error("Expected directory: " + directory);
  for (const entry of fs.readdirSync(start, { withFileTypes: true })) {
    const child = path.join(directory, entry.name);
    if (entry.isSymbolicLink())
      throw Error("Symbolic link/junction in package inputs: " + child);
    if (
      [
        "__pycache__",
        "node_modules",
        ".git",
        ".klcode",
        ".pytest_cache",
        ".scratch",
      ].includes(entry.name)
    )
      continue;
    if (/^\.env(?:\.|$)/.test(entry.name) && !entry.name.endsWith(".example"))
      continue;
    if (entry.name === "config.local.json" || /\.py[co]$/.test(entry.name))
      continue;
    if (entry.isDirectory()) output.push(...tree(root, child));
    else if (entry.isFile()) output.push(child.split(path.sep).join("/"));
  }
  return output;
}

function validatePackage(root) {
  root = fs.realpathSync(root);
  const errors = [],
    counts = { canonical_skills: 0, shortcuts: 0, agents: 0, checked_files: 0 };
  try {
    const manifest = json(path.join(root, "consolidation/manifest.json"));
    const catalog = json(path.join(root, "plugin/catalog.json"));
    const aliases = catalog.commands.filter((c) => c.kind !== "canonical");
    const coverage = json(path.join(root, "rules/coverage.json"));
    counts.canonical_skills = manifest.skills.length;
    counts.shortcuts = catalog.commands.length;
    counts.agents = catalog.agents.length;
    if (manifest.skill_count !== manifest.skills.length)
      errors.push("Canonical skill count mismatch");
    const check = (value) => {
      if (!relative(value)) {
        errors.push("Unsafe package path: " + value);
        return false;
      }
      try {
        const filename = safePath(root, value.replace(/^\.\//, ""));
        if (!fs.existsSync(filename)) throw Error("not found");
        counts.checked_files++;
        return true;
      } catch {
        errors.push("Missing or unsafe package resource: " + value);
        return false;
      }
    };
    const canonical = manifest.skills.map((s) => "./" + s.path);
    for (const entry of manifest.skills) check(entry.path + "/SKILL.md");
    for (const entry of [...catalog.commands, ...catalog.agents]) {
      check(entry.skill + "/SKILL.md");
      check(entry.claude);
      check(
        entry.codex + (catalog.commands.includes(entry) ? "/SKILL.md" : ""),
      );
      if (entry.source_prompt) check(entry.source_prompt);
    }
    for (const rule of coverage.rules) check(rule.path);
    for (const host of ["claude", "codex"]) {
      const descriptor = json(
        path.join(root, "." + host + "-plugin/plugin.json"),
      );
      if (
        descriptor.name !== catalog.name ||
        descriptor.version !== catalog.version
      )
        errors.push(host + " plugin identity/version differs from catalog");
      const expected =
        host === "claude"
          ? canonical
          : [...canonical, ...aliases.map((c) => "./" + c.codex)];
      if (!Array.isArray(descriptor.skills))
        errors.push(host + " skills must explicitly list direct skill folders");
      const actual = Array.isArray(descriptor.skills) ? descriptor.skills : [];
      if (
        new Set(actual).size !== actual.length ||
        actual.length !== expected.length ||
        expected.some((p) => !actual.includes(p))
      )
        errors.push(host + " skill exports do not match canonical catalog");
      for (const folder of actual) check(folder);
      const names = new Set();
      for (const folder of actual) {
        if (!relative(folder)) continue;
        const skillFile = path.join(root, folder, "SKILL.md");
        if (!fs.existsSync(skillFile)) continue;
        const name = fs
          .readFileSync(skillFile, "utf8")
          .match(/^name:\s*["']?([a-z0-9-]+)/m)?.[1];
        if (!name || names.has(name))
          errors.push(host + " duplicate or missing skill identity: " + name);
        names.add(name);
      }
      const hookFiles = Array.isArray(descriptor.hooks)
        ? descriptor.hooks
        : [descriptor.hooks];
      for (const hookFile of hookFiles)
        if (check(hookFile)) {
          const hookConfig = json(path.join(root, hookFile));
          if (!hookConfig.hooks || typeof hookConfig.hooks !== "object")
            errors.push(host + " hooks require a hooks object");
          for (const hooks of Object.values(hookConfig.hooks || {}))
            for (const match of hooks)
              for (const handler of match.hooks || []) {
                if (
                  handler.type !== "command" ||
                  typeof handler.command !== "string" ||
                  !Number.isFinite(handler.timeout)
                )
                  errors.push(host + " hook must be a bounded command");
                if (handler.async || /\bbash\b|\bnpx\b/.test(handler.command))
                  errors.push(
                    host + " default hook needs an unsupported launcher",
                  );
              }
        }
      if (host === "claude") {
        for (const entry of aliases)
          if (descriptor.commands?.[entry.name]?.source !== "./" + entry.claude)
            errors.push("Claude command route missing: " + entry.name);
        if (Object.keys(descriptor.commands || {}).length !== aliases.length)
          errors.push("Unexpected Claude command exports");
        for (const entry of aliases)
          if (names.has(entry.name))
            errors.push("Claude command collides with skill: " + entry.name);
        const expectedAgents = catalog.agents.map((a) => "./" + a.claude);
        if (
          !Array.isArray(descriptor.agents) ||
          descriptor.agents.length !== expectedAgents.length ||
          expectedAgents.some((p) => !descriptor.agents.includes(p))
        )
          errors.push("Claude agent exports differ from catalog");
      }
      if (descriptor.mcpServers || descriptor.apps)
        errors.push(host + " unexpectedly declares services");
    }
    const indexPath = path.join(root, "package-index.json");
    if (fs.existsSync(indexPath)) {
      const index = json(indexPath),
        indexed = new Set();
      for (const file of index.files) {
        if (indexed.has(file.path))
          errors.push("Duplicate packaged file: " + file.path);
        indexed.add(file.path);
        if (
          check(file.path) &&
          digest(path.join(root, file.path)) !== file.sha256
        )
          errors.push("Package checksum mismatch: " + file.path);
      }
      for (const filename of tree(root, "."))
        if (filename !== "package-index.json" && !indexed.has(filename))
          errors.push("Unindexed package file: " + filename);
    }
  } catch (e) {
    errors.push("Cannot validate package: " + e.message);
  }
  return { status: errors.length ? "failed" : "passed", counts, errors };
}

function buildPackage(root) {
  root = fs.realpathSync(root);
  const validation = validatePackage(root);
  if (validation.status !== "passed") throw Error(validation.errors.join("\n"));
  const catalog = json(path.join(root, "plugin/catalog.json"));
  const selectedRules = json(path.join(root, "rules/coverage.json")).rules.map(
    (r) => r.path,
  );
  const inputs = new Set(selectedRules);
  for (const directory of [
    "skills",
    "support",
    "licenses",
    "consolidation",
    "plugin",
    "commands",
    "hooks",
    "scripts",
    ".claude-plugin",
    ".codex-plugin",
  ]) {
    if (!fs.existsSync(path.join(root, directory))) continue;
    for (const file of tree(root, directory)) {
      if (file.startsWith("plugin/") && /\.test\.cjs$/.test(file)) continue;
      inputs.add(file);
    }
  }
  for (const file of [
    "rules/README.md",
    "rules/coverage.json",
    "README.md",
    "AGENTS.md",
    "THIRD_PARTY_NOTICES.md",
  ])
    if (fs.existsSync(path.join(root, file))) inputs.add(file);
  const dist = safePath(root, ".scratch/dist", { missing: true });
  fs.mkdirSync(dist, { recursive: true });
  const releaseRoot = fs.mkdtempSync(
    path.join(dist, catalog.name + "-" + catalog.version + "-"),
  );
  const packageRoot = path.join(releaseRoot, "plugins", catalog.name);
  fs.mkdirSync(packageRoot, { recursive: true });
  const files = [];
  for (const file of [...inputs].sort()) {
    const source = safePath(root, file);
    const destination = path.join(packageRoot, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
    files.push({ path: file, sha256: digest(destination) });
  }
  fs.writeFileSync(
    path.join(packageRoot, "package-index.json"),
    JSON.stringify(
      { name: catalog.name, version: catalog.version, files },
      null,
      2,
    ) + "\n",
    { flag: "wx" },
  );
  const write = (file, value) => {
    const target = path.join(releaseRoot, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, JSON.stringify(value, null, 2) + "\n", {
      flag: "wx",
    });
  };
  write(".claude-plugin/marketplace.json", {
    name: "klcode-team",
    owner: { name: "KLCode" },
    plugins: [
      {
        name: catalog.name,
        source: "./plugins/" + catalog.name,
        version: catalog.version,
      },
    ],
  });
  write(".agents/plugins/marketplace.json", {
    name: "klcode-team",
    plugins: [
      {
        name: catalog.name,
        source: { source: "local", path: "./plugins/" + catalog.name },
        policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" },
      },
    ],
  });
  const built = validatePackage(packageRoot);
  if (built.status !== "passed")
    throw Error("Built package invalid: " + built.errors.join("\n"));
  return {
    releaseRoot,
    packageRoot,
    files,
    validation: built,
    activated: false,
  };
}

function setupProject(root, project, { write = false } = {}) {
  project = fs.realpathSync(project);
  const config = json(path.join(root, "plugin/templates/config.json"));
  config.hooks.enabled = false;
  const target = safePath(project, ".klcode/config.json", { missing: true });
  if (write) {
    if (fs.existsSync(target))
      throw Error(
        "Configuration already exists; preview and merge deliberately.",
      );
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, JSON.stringify(config, null, 2) + "\n", {
      flag: "wx",
    });
  }
  return {
    mode: write ? "created-disabled-config" : "preview",
    project,
    path: target,
    config,
    activated: false,
    ignored_local_paths: [".klcode/config.local.json", ".klcode/state/"],
    note: "Ensure local overrides and runtime state are ignored before later activation.",
  };
}

function doctor(root, project) {
  const loaded = loadProjectConfig(project);
  const validation = validatePackage(root);
  const major = Number(process.versions.node.split(".")[0]);
  const nodeOnPath = (process.env.PATH || process.env.Path || "")
    .split(path.delimiter)
    .filter(Boolean)
    .some((directory) =>
      fs.existsSync(path.join(directory.replace(/^"|"$/g, ""), "node.exe")),
    );
  const warnings = [];
  if (process.platform !== "win32")
    warnings.push("Only native Windows is supported.");
  if (major < 22) warnings.push("Node.js 22 or later is required.");
  if (!nodeOnPath)
    warnings.push(
      "node.exe was not found on PATH; add the chosen Node runtime to the host environment before later hook activation. This command does not change PATH.",
    );
  warnings.push(
    "Native host installation, discovery, hook trust and activation are separate from these local checks.",
  );
  warnings.push(
    "Codex cannot guarantee blocking when the hook cannot start or the host skips it; native permissions remain authoritative.",
  );
  return {
    status:
      validation.status === "passed" &&
      !loaded.errors.length &&
      major >= 22 &&
      process.platform === "win32"
        ? "passed-local-checks"
        : "failed",
    platform: process.platform,
    node: process.version,
    node_executable: process.execPath,
    node_on_path: nodeOnPath,
    project: loaded.root,
    config_found: loaded.found,
    hooks_enabled: loaded.config.hooks.enabled,
    config_errors: loaded.errors,
    package: validation,
    warnings,
    activated: false,
    checks_executed: 0,
    note: "Configured project commands were inspected as data and were not executed.",
  };
}
module.exports = { validatePackage, buildPackage, setupProject, doctor };
