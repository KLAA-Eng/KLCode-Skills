"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const {
  validatePackage,
  buildPackage,
  setupProject,
  doctor,
} = require("./package.cjs");

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "klcode-package-test-"));
  function write(file, value) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(
      target,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  }
  const canonical = "skills/engineering/implementation";
  write("consolidation/manifest.json", {
    skill_count: 1,
    skills: [{ name: "implementation", path: canonical }],
  });
  write(
    canonical + "/SKILL.md",
    "---\nname: implementation\ndescription: Implement behavior.\n---\nWork.\n",
  );
  write("plugin/catalog.json", {
    schema_version: 1,
    name: "klcode",
    version: "0.1.0",
    commands: [],
    agents: [],
  });
  write("rules/coverage.json", {
    rules: [{ path: "rules/common/testing.md" }],
  });
  write("rules/common/testing.md", "# Testing\n");
  write("rules/rust/testing.md", "# Not selected\n");
  write("rules/README.md", "# Rules\n");
  write("support/helper.cjs", "module.exports = {};\n");
  write("licenses/ref.ECC/LICENSE", "Retained notice\n");
  write("THIRD_PARTY_NOTICES.md", "# Notices\n");
  write("README.md", "# KLCode\n");
  write("AGENTS.md", "# Instructions\n");
  write("plugin/runtime/hook.cjs", "// Hook runtime\n");
  write("plugin/templates/config.json", {
    schema_version: 1,
    hooks: { enabled: false },
  });
  write(".claude-plugin/plugin.json", {
    name: "klcode",
    version: "0.1.0",
    skills: ["./" + canonical],
    commands: {},
    agents: [],
    hooks: "./hooks/claude-hooks.json",
  });
  write(".codex-plugin/plugin.json", {
    name: "klcode",
    version: "0.1.0",
    skills: ["./" + canonical],
    hooks: "./hooks/codex-hooks.json",
  });
  write("hooks/claude-hooks.json", { hooks: {} });
  write("hooks/codex-hooks.json", { hooks: {} });
  t.after(() => {
    const target = path.resolve(root);
    assert.ok(target.startsWith(path.resolve(os.tmpdir()) + path.sep));
    assert.ok(path.basename(target).startsWith("klcode-package-test-"));
    fs.rmSync(target, { recursive: true, force: true });
  });
  return { root, write };
}
test("validates explicit native export paths and catches missing canonical skill", (t) => {
  const f = fixture(t);
  assert.equal(validatePackage(f.root).status, "passed");
  fs.unlinkSync(
    path.join(f.root, "skills/engineering/implementation/SKILL.md"),
  );
  assert.match(validatePackage(f.root).errors.join("\n"), /Missing/);
});
test("rejects version drift and missing hook declarations", (t) => {
  const f = fixture(t);
  f.write(".codex-plugin/plugin.json", {
    name: "ecc",
    version: "2.2.3",
    skills: ["./skills/engineering/implementation"],
    hooks: "./missing.json",
  });
  const errors = validatePackage(f.root).errors.join("\n");
  assert.match(errors, /identity/);
  assert.match(errors, /Missing/);
});
test("rejects escaped export roots", (t) => {
  const f = fixture(t);
  f.write(".codex-plugin/plugin.json", {
    name: "klcode",
    version: "0.1.0",
    skills: ["../private"],
    hooks: "./hooks/codex-hooks.json",
  });
  assert.match(validatePackage(f.root).errors.join("\n"), /Unsafe/);
});
test("rejects duplicate skill identities even when export paths differ", (t) => {
  const f = fixture(t);
  const catalogPath = path.join(f.root, "plugin/catalog.json");
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  catalog.commands.push({
    name: "implement",
    skill: "skills/engineering/implementation",
    claude: "commands/implement.md",
    codex: "plugin/commands/implement",
  });
  f.write("plugin/catalog.json", catalog);
  f.write("commands/implement.md", "# Implement\n");
  f.write(
    "plugin/commands/implement/SKILL.md",
    "---\nname: implementation\ndescription: Duplicate.\n---\n",
  );
  for (const host of ["claude", "codex"]) {
    const filename = "." + host + "-plugin/plugin.json";
    const descriptor = JSON.parse(
      fs.readFileSync(path.join(f.root, filename), "utf8"),
    );
    if (host === "claude")
      descriptor.commands = {
        implement: { source: "./commands/implement.md" },
      };
    else descriptor.skills.push("./plugin/commands/implement");
    f.write(filename, descriptor);
  }
  assert.match(
    validatePackage(f.root).errors.join("\n"),
    /duplicate.*identity/i,
  );
});
test("build excludes unselected rules, local settings, state, Git and package tests", (t) => {
  const f = fixture(t);
  f.write(".klcode/config.local.json", "private override");
  f.write(".klcode/state/session.json", "private state");
  f.write(".git/config", "private git config");
  f.write("plugin/private.test.cjs", "test-only");
  f.write("support/__pycache__/cache.pyc", "cache");
  const built = buildPackage(f.root);
  assert.equal(validatePackage(built.packageRoot).status, "passed");
  for (const excluded of [
    "rules/rust",
    ".klcode",
    ".git",
    "plugin/private.test.cjs",
    "support/__pycache__",
  ]) {
    assert.equal(
      fs.existsSync(path.join(built.packageRoot, excluded)),
      false,
      excluded,
    );
  }
  assert.equal(
    fs.readFileSync(
      path.join(built.packageRoot, "licenses/ref.ECC/LICENSE"),
      "utf8",
    ),
    "Retained notice\n",
  );
  assert.ok(built.files.every((file) => /^[a-f0-9]{64}$/.test(file.sha256)));
  fs.appendFileSync(
    path.join(built.packageRoot, "rules/common/testing.md"),
    "\nTampered content\n",
  );
  assert.match(
    validatePackage(built.packageRoot).errors.join("\n"),
    /checksum mismatch/,
  );
});
test("setup previews without writes, writes only disabled config, and preserves existing configuration", (t) => {
  const f = fixture(t);
  const project = path.join(f.root, "target project");
  fs.mkdirSync(project);
  const preview = setupProject(f.root, project);
  assert.equal(preview.config.hooks.enabled, false);
  assert.equal(fs.existsSync(path.join(project, ".klcode")), false);
  setupProject(f.root, project, { write: true });
  const target = path.join(project, ".klcode/config.json");
  assert.equal(
    JSON.parse(fs.readFileSync(target, "utf8")).hooks.enabled,
    false,
  );
  fs.writeFileSync(target, '{"schema_version":1,"hooks":{"enabled":true}}');
  assert.throws(() => setupProject(f.root, project, { write: true }), /exists/);
  assert.equal(JSON.parse(fs.readFileSync(target, "utf8")).hooks.enabled, true);
});
test("doctor reports prerequisites without executing configured project commands", (t) => {
  const f = fixture(t);
  const project = path.join(f.root, "doctor project");
  fs.mkdirSync(project);
  const marker = path.join(project, "should-not-exist.txt");
  f.write("doctor project/.klcode/config.json", {
    schema_version: 1,
    hooks: {
      enabled: false,
      quality: {
        checks: [
          {
            id: "unsafe",
            extensions: [".js"],
            argv: [
              "{node}",
              "-e",
              'require("fs").writeFileSync(' +
                JSON.stringify(marker) +
                ',"bad")',
            ],
          },
        ],
      },
    },
  });
  const result = doctor(f.root, project);
  assert.equal(result.activated, false);
  assert.equal(result.hooks_enabled, false);
  assert.equal(fs.existsSync(marker), false);
});
test("setup refuses redirected project configuration directories", (t) => {
  const f = fixture(t);
  const project = path.join(f.root, "junction project");
  fs.mkdirSync(project);
  const elsewhere = path.join(f.root, "other project");
  fs.mkdirSync(elsewhere);
  try {
    fs.symlinkSync(elsewhere, path.join(project, ".klcode"), "junction");
  } catch (error) {
    if (["EPERM", "EACCES", "ENOTSUP"].includes(error.code))
      return t.skip("Junction creation unavailable");
    throw error;
  }
  assert.throws(
    () => setupProject(f.root, project, { write: true }),
    /link|junction|scope/i,
  );
  assert.equal(fs.existsSync(path.join(elsewhere, "config.json")), false);
});
