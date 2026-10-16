"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const cp = require("node:child_process");
test(
  "Windows Codex launchers pass plugin paths as data through cmd and PowerShell",
  { skip: process.platform !== "win32" },
  (t) => {
    const tempBase = fs.realpathSync(os.tmpdir());
    const temp = fs.mkdtempSync(path.join(tempBase, "klcode-launch-test-"));
    t.after(() => {
      assert.ok(path.resolve(temp).startsWith(tempBase + path.sep));
      assert.ok(path.basename(temp).startsWith("klcode-launch-test-"));
      fs.rmSync(temp, { recursive: true, force: true });
    });
    const packageRoot = path.join(temp, "plugin space $dollar 'quote");
    const project = path.join(temp, "project");
    for (const relative of [
      "plugin/runtime/hook.cjs",
      "plugin/runtime/config.cjs",
      "support/tooling/hooks/operation_guard.cjs",
    ]) {
      const destination = path.join(packageRoot, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(__dirname, "..", relative), destination);
    }
    fs.mkdirSync(path.join(project, ".klcode"), { recursive: true });
    fs.writeFileSync(
      path.join(project, ".klcode/config.json"),
      '{"schema_version":1,"hooks":{"enabled":false}}',
    );
    const environment = { ...process.env, PLUGIN_ROOT: packageRoot };
    const currentPath = process.env.PATH || process.env.Path || "";
    for (const key of Object.keys(environment))
      if (key.toLowerCase() === "path") delete environment[key];
    environment.PATH =
      path.dirname(process.execPath) + path.delimiter + currentPath;
    const hooks = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../hooks/codex-hooks.json"),
        "utf8",
      ),
    ).hooks;
    for (const [event, definitions] of Object.entries(hooks)) {
      const command = definitions[0].hooks[0].commandWindows;
      assert.equal(command.includes("${PLUGIN_ROOT}"), false);
      for (const [shell, args] of [
        [process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", command]],
        [
          "powershell.exe",
          ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", command],
        ],
      ]) {
        const result = cp.spawnSync(shell, args, {
          cwd: project,
          env: environment,
          input: JSON.stringify({
            cwd: project,
            session_id: "launcher-test",
            hook_event_name: event,
          }),
          encoding: "utf8",
          timeout: 10000,
          windowsHide: true,
          windowsVerbatimArguments:
            path.basename(shell).toLowerCase() === "cmd.exe",
        });
        assert.equal(result.status, 0, shell + ": " + result.stderr);
        assert.deepEqual(JSON.parse(result.stdout), {});
        assert.equal(fs.existsSync(path.join(project, ".klcode/state")), false);
      }
    }
  },
);
