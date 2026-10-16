#!/usr/bin/env node
"use strict";
// Native discovery only: never install, enable, trust hooks, or start an agent turn.
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

function expectedSkills(root) {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, ".codex-plugin/plugin.json"), "utf8"),
  );
  if (!Array.isArray(manifest.skills))
    throw Error("Expected explicit compatibility skill paths");
  return manifest.skills.map((entry) => {
    if (typeof entry !== "string" || !entry.startsWith("./"))
      throw Error("Invalid skill export");
    const folder = path.resolve(root, entry);
    const relative = path.relative(root, folder);
    if (relative.startsWith("..") || path.isAbsolute(relative))
      throw Error("Skill export escapes package");
    const body = fs.readFileSync(path.join(folder, "SKILL.md"), "utf8");
    const match = body.match(/^name:\s*["']?([a-z0-9-]+)["']?\s*$/m);
    if (!match) throw Error("Cannot determine exported skill name");
    return `${manifest.name}:${match[1]}`;
  });
}

function readPlugin(executable, root, home, marketplace) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      executable,
      ["app-server", "--stdio", "-c", "analytics.enabled=false"],
      {
        cwd: root,
        env: { ...process.env, CODEX_HOME: home },
        windowsHide: true,
        stdio: ["pipe", "pipe", "pipe"],
      },
    );
    let buffer = "",
      bytes = 0,
      stderrBytes = 0,
      response,
      failure;
    const timer = setTimeout(() => {
      failure = Error("Native discovery timed out");
      child.kill();
    }, 15000);
    const send = (value) => child.stdin.write(JSON.stringify(value) + "\n");
    child.on("error", (error) => {
      failure = error;
    });
    child.stdin.on("error", () => {});
    child.stderr.on("data", (chunk) => {
      stderrBytes += chunk.length;
      if (stderrBytes > 65536) {
        failure = Error("Native diagnostic output limit exceeded");
        child.kill();
      }
    });
    child.stdout.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > 4 * 1024 * 1024) {
        failure = Error("Native response output limit exceeded");
        child.kill();
        return;
      }
      buffer += chunk.toString("utf8");
      for (;;) {
        const end = buffer.indexOf("\n");
        if (end < 0) break;
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 1);
        let message;
        try {
          message = JSON.parse(line);
        } catch {
          failure = Error("Invalid native protocol response");
          child.kill();
          return;
        }
        if (message.id === 1) {
          if (!message.result) {
            failure = Error("Native initialize failed");
            child.kill();
            return;
          }
          send({ method: "initialized" });
          send({
            id: 2,
            method: "plugin/read",
            params: { pluginName: "klcode", marketplacePath: marketplace },
          });
        }
        if (message.id === 2) {
          response = message.result?.plugin;
          if (!response)
            failure = Error("Native plugin/read rejected the package");
          child.kill();
        }
      }
    });
    child.on("close", () => {
      clearTimeout(timer);
      if (failure || !response)
        reject(
          failure || Error("Native server closed without a plugin response"),
        );
      else resolve(response);
    });
    send({
      id: 1,
      method: "initialize",
      params: {
        clientInfo: { name: "klcode-offline-validation", version: "0.1.0" },
        capabilities: { experimentalApi: true },
      },
    });
  });
}

async function validate(
  executable,
  source,
  marketplace = path.join(source, ".agents/plugins/marketplace.json"),
) {
  if (process.platform !== "win32") throw Error("Native Windows is required");
  if (
    !path.isAbsolute(executable) ||
    !executable.toLowerCase().endsWith(".exe")
  )
    throw Error("Supply an absolute Codex .exe path");
  if (!path.isAbsolute(source) || !path.isAbsolute(marketplace))
    throw Error("Supply absolute package and marketplace paths");
  source = fs.realpathSync(source);
  marketplace = fs.realpathSync(marketplace);
  const catalog = JSON.parse(fs.readFileSync(marketplace, "utf8"));
  const entry = catalog.plugins?.find((plugin) => plugin.name === "klcode");
  if (
    entry?.source?.source !== "local" ||
    typeof entry.source.path !== "string" ||
    !entry.source.path.startsWith("./")
  )
    throw Error("Validation requires an explicit local marketplace source");
  const catalogRoot = path.resolve(path.dirname(marketplace), "../..");
  if (fs.realpathSync(path.resolve(catalogRoot, entry.source.path)) !== source)
    throw Error("Marketplace source differs from the requested package");
  const expected = expectedSkills(source);
  if (new Set(expected).size !== expected.length)
    throw Error("Duplicate exported skill identities");
  const tempBase = fs.realpathSync(os.tmpdir());
  const temp = fs.mkdtempSync(path.join(tempBase, "klcode-native-validation-"));
  try {
    const home = path.join(temp, "isolated-home");
    fs.mkdirSync(home);
    const plugin = await readPlugin(executable, temp, home, marketplace);
    const actual = plugin.skills.map((skill) => skill.name);
    if (plugin.summary.installed !== false || plugin.summary.enabled !== false)
      throw Error("Expected an uninstalled, disabled discovery target");
    if (
      new Set(actual).size !== expected.length ||
      actual.length !== expected.length ||
      expected.some((name) => !actual.includes(name))
    )
      throw Error("Native exported skill identities differ from the manifest");
    const events = [
      ...new Set(plugin.hooks.map((hook) => hook.eventName)),
    ].sort();
    if (
      JSON.stringify(events) !==
      JSON.stringify(["postToolUse", "preToolUse", "sessionStart", "stop"])
    )
      throw Error(
        "Native lifecycle hook declarations differ from the expected four events",
      );
    return {
      passed: true,
      name: plugin.summary.name,
      version: plugin.summary.localVersion,
      skills: actual.length,
      uniqueSkills: new Set(actual).size,
      hookEvents: events,
      installed: false,
      enabled: false,
      activationPerformed: false,
      modelRequests: 0,
      scope:
        "Native read-only package discovery with isolated temporary Codex configuration; lifecycle execution remains untested.",
    };
  } finally {
    // Verify the concrete deletion target stays within the task-owned temporary directory.
    const resolved = fs.realpathSync(temp),
      relative = path.relative(tempBase, resolved);
    if (
      path.isAbsolute(relative) ||
      relative.startsWith("..") ||
      path.dirname(relative) !== "." ||
      !path.basename(relative).startsWith("klcode-native-validation-")
    )
      throw Error("Unsafe temporary cleanup target");
    fs.rmSync(resolved, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  }
}

module.exports = { validate };
if (require.main === module) {
  const args = process.argv.slice(2);
  if (
    ![4, 6].includes(args.length) ||
    args[0] !== "--codex" ||
    args[2] !== "--package" ||
    (args.length === 6 && args[4] !== "--marketplace")
  ) {
    process.stderr.write(
      "Usage: node plugin/native-validate.cjs --codex <absolute-codex.exe> --package <absolute-package-root> [--marketplace <absolute-marketplace.json>]\n",
    );
    process.exitCode = 1;
  } else
    validate(args[1], args[3], args[5])
      .then((result) =>
        process.stdout.write(JSON.stringify(result, null, 2) + "\n"),
      )
      .catch(() => {
        process.stderr.write(
          "KLCode native discovery validation failed; no installation or activation was requested.\n",
        );
        process.exitCode = 1;
      });
}
