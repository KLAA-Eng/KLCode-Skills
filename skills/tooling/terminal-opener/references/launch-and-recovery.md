# Shell-free terminal launch plans

Adapted reference. Apply only the branch relevant to the requested task. Repository conventions, chosen scope, authorization and canonical skill policies govern all examples; command blocks are not automatic execution or installation.

## Launch a command

Pass launcher options before `--`, then pass exactly one executable followed by
its argument array:

```bash
node skills/tooling/terminal-opener/scripts/open-terminal.js \
  --launch \
  --cwd /absolute/host/path \
  -- ssh -t example.test command-with-arguments
```

Run normal mode first. Let WezTerm try its mux with a new window, then let the
launcher fall back to a detached `wezterm start` process if the mux is not
available. When fallback is used, read `muxFailure` from JSON output (or the
human-readable failure line) to diagnose why the mux path failed.

## Recover from terminal configuration

Add `--recover` or `--standalone` when user configuration or mux state may
interfere with the requested command. Start a detached WezTerm process with:

```text
--skip-config start --always-new-process
```

Expect recovery mode to skip all user terminal configuration intentionally.

## Inspect before launch

Omit `--launch` (or add `--dry-run`) and add `--json` to inspect the exact
executable, argv, working directory, terminal adapter, primary launch, and
fallback without opening a window. Treat the JSON plan as the composition
boundary for callers.

Run `--detect --json` without a command to probe terminal availability. Follow
the returned `action` when the adapter is missing or unsupported. Use WezTerm
for the current adapter; treat other requested terminals as unsupported plans,
not as commands to execute.

Canonical executable path: skills/tooling/terminal-opener/scripts/open-terminal.js. The source example path is adapted here. A visible terminal is only appropriate for an explicitly requested interactive window; background helpers should stay hidden through host-supported methods.
