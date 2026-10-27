# KLCode plugin

KLCode 0.1.0 packages 105 canonical skills, 16 convenient command names and nine specialist roles for native Windows Claude Code and Codex desktop/CLI. **Implemented and locally validated; not installed or activated.** Project hooks remain disabled in `.klcode/config.json`.

## Inspect and build

Use Node.js 22 or later. Normal host launchers need `node.exe` on PATH; an absolute bundled Node path is sufficient for offline validation but does not configure the host environment. From this repository:

```powershell
node plugin/cli.cjs validate
node plugin/cli.cjs doctor --project .
node plugin/cli.cjs setup --project .
node plugin/cli.cjs build
```

`validate` checks the plugin rooted beside the CLI. `doctor` inspects a selected project's configuration without running its check commands. `setup` previews disabled configuration; `setup --project <path> --write` creates it only when absent and never enables hooks. Existing configuration is preserved. Ensure `.klcode/config.local.json` and `.klcode/state/` are ignored in another project before activation.

`build` creates a fresh release directory under `.scratch/dist/`, containing `plugins/klcode/`, a Claude marketplace and a Codex marketplace. It excludes Git internals, local overrides, runtime state, caches and unselected rule families. The package retains skill resources, supporting dependencies and licensing, and has a SHA-256 file index. Building does not install anything or modify host settings. Rebuilding creates a new directory; it never deletes a previous release.

## Commands and roles

| Command | Workflow |
|---|---|
| `setup` | Inspect setup and preview disabled project configuration |
| `doctor` | Read-only configuration and prerequisite diagnostics |
| `grill` | Dependency-aware decision interview |
| `plan` | Implementation planning |
| `implement` | Implement verified task slices |
| `review` | Evidence-based code review |
| `verify` | Acceptance and verification evidence |
| `commit` | Scoped local milestone preparation |
| `debug` | Diagnose and reproduce defects |
| `test` | Meaningful test-first development |
| `security` | Focused application security work |
| `refactor` | Behavior-preserving refactoring |
| `requirements` | Requirements through the existing canonical skill |
| `docs` | Technical documentation |
| `handoff` | Session handoff |
| `hooks` | Configuration preview and hook diagnostics |

Claude uses `/klcode:<name>` entrypoints. Codex exposes explicit shortcut skills; select the plugin-qualified skill shown by the client. There are 15 alias wrappers: `requirements` already has the requested canonical name. The Codex manifest therefore exports 120 unique skills: 105 canonical workflows plus 15 explicit shortcuts. Canonical skills remain independently callable, including the additional source-preserving `spec-driven-development` and `planning-and-task-breakdown` workflows. The `plan` shortcut continues to select `implementation-planning`; use the new skill names to select their mandatory gates and separate artifacts. The historical native-discovery evidence predates these two imports. See [catalog.json](catalog.json) for exact routes.

The roles are planner, architect, implementer, code reviewer, security reviewer, test guide, and Python/C#/C++ reviewers. Claude's manifest exports their Markdown adapters. Codex TOML adapters are **templates**, not automatically registered agents: use bounded native delegation with the packaged role brief, or separately review project-level native agent configuration later. Copied templates need their plugin root rebound. No model is forced. [Claude's manifest reference](https://code.claude.com/docs/en/plugins-reference) and [Codex's agent configuration](https://learn.chatgpt.com/docs/agent-configuration/subagents) describe those different surfaces.

## Project hooks

The shared config is overridden by ignored `.klcode/config.local.json`. Discovery stops at the nearest project/Git boundary; it does not import user-global configuration. No config, or `hooks.enabled: false`, leaves the runtime inert. The source project includes a disabled JavaScript syntax-check example; the general [template](templates/config.json) starts with no check commands.

- `SessionStart`: concise shared-default guidance and rule pointers.
- `PreToolUse`: destructive-command heuristics, advisory by default. `operations.mode: "block"` is an explicit supplemental guard.
- `PostToolUse`: configured argv checks for recognized changed files, including Codex patches. No shell, downloads, formatters or fixers are invoked implicitly. Use `{node}`, `{file}` and `{project}` argument substitutions; other executables must be absolute native `.exe` paths. Python checks require a compatible installed CPython and explicitly configured tooling.
- `Stop`: session-scoped failed/stale/unverified check feedback. Optional blocking is bounded by the configured attempt limit and avoids recursive Stop loops. It does not run a full build for every response.

Checks have bounded input, output, time and local state. Status records contain file/check identifiers and fingerprints rather than source contents, transcripts or raw command output. Concurrent session updates are serialized. A checker that mutates its target cannot produce a valid cached pass. Configured programs are trusted code, **not an OS sandbox**; the timeout controls the direct child, not arbitrary descendants. Use checks that terminate their own children. Crashed lock files require deliberate cleanup after confirming no checker is active; the runtime does not guess that a lock is stale.

Advisory failures report a gap and continue. An executing explicit blocking guard denies its affected call on input/configuration failure. Native hook launch errors, skipped/untrusted hooks and unsupported tool paths can still prevent enforcement, especially in Codex. These guards never replace host permissions. Claude supports additional host-level failure behavior on recent releases; it is not silently enabled here. See the [Claude hook reference](https://code.claude.com/docs/en/hooks), [Codex hook reference](https://learn.chatgpt.com/docs/hooks) and [recorded host capabilities](host-capabilities.json).

## Install from GitHub later

The canonical repository is [KLAA-Eng/KLCode-Skills](https://github.com/KLAA-Eng/KLCode-Skills), on its default `main` branch. Both source marketplace catalogs reference that GitHub repository. The marketplace is `klcode-team` and the plugin is `klcode`. Team members need Git access to the repository if it is private. The ownership transfer and default branch were verified with a read-only Git remote query; no publication or push was performed.

After installation is authorized, run the following in PowerShell for the selected host. These commands register and install the plugin and may enable its skills; they are documentation, not part of validation.

Claude Code:

```powershell
claude plugin marketplace add KLAA-Eng/KLCode-Skills
claude plugin install klcode@klcode-team
```

Codex CLI:

```powershell
codex plugin marketplace add KLAA-Eng/KLCode-Skills
codex plugin add klcode@klcode-team
codex plugin list --json
```

Codex desktop users can use its plugin marketplace UI for the same repository and plugin where their client/account supports repository marketplaces. Restart the client after installation when prompted. See the official [Claude marketplace guide](https://code.claude.com/docs/en/plugin-marketplaces), [Codex developer commands](https://learn.chatgpt.com/docs/developer-commands) and [Codex plugins guide](https://learn.chatgpt.com/docs/plugins). GitHub installs use the remote branch contents, so local changes must be committed and separately pushed before teammates can receive them. No release tag is implied by the package version.

Project hooks require separate review of native hook trust and an explicit project opt-in. Keep `hooks.enabled: false` until that activation is requested. This phase installs, enables and trusts nothing. No target-project configuration, home settings, observers, transcript analytics, learning services or remote repository state is changed.

## Offline release validation

`node plugin/cli.cjs build` emits a separate release root with local marketplace entries pointing to `plugins/klcode`. These deliberately avoid fetching GitHub. Keep version `0.1.0` and repository identity consistent in the catalog and both manifests; validation detects drift.

Inspect native discovery without installation using `node plugin/native-validate.cjs --codex <absolute-codex.exe> --package <release-root>/plugins/klcode --marketplace <release-root>/.agents/plugins/marketplace.json`. Use absolute paths and quote paths containing spaces. The helper requires a local marketplace; the GitHub-backed source catalog is intentionally rejected. It uses an isolated temporary Codex home and only initializes the protocol and reads plugin metadata. Current evidence and limits are recorded in [host-capabilities.json](host-capabilities.json). Offline fixtures and parser discovery do not prove GitHub installation or installed lifecycle behavior. Claude-native validation requires an available Claude executable; it was unavailable in this environment.

Some retained workflows require vendor hosts, external packages or POSIX-only media protections. Packaging preserves those workflows and their stated limits; it does not certify them as native Windows capabilities. See the [skill glossary](../skills/glossary.md), [rules](../rules/README.md) and [third-party notices](../THIRD_PARTY_NOTICES.md).
