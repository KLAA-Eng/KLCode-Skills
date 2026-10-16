# KLCode-Skills

Skills being curated for the development team, primarily for KL&A-Tools (pyRevit) and strHub, with supporting planning, research, documentation, and review workflows.

Canonical repository: [KLAA-Eng/KLCode-Skills](https://github.com/KLAA-Eng/KLCode-Skills). For later installation from GitHub in Claude Code or Codex, use the [plugin installation guide](plugin/README.md#install-from-github-later). The marketplace is `klcode-team`; the plugin is `klcode`. Installation and activation remain deferred.

## Curated workflows

The collection consolidates 209 source skills into 103 canonical workflows, organized by the job they perform.

| Category | Skills | Coverage |
|---|---:|---|
| [Engineering](skills/engineering/) | 22 | Implementation, debugging, review, tests, security, performance and integrations |
| [Languages](skills/languages/) | 3 | Python, .NET/C# and C++ development/testing |
| [Planning](skills/planning/) | 15 | Interviews, requirements, plans, architecture and task coordination |
| [Knowledge](skills/knowledge/) | 16 | Research, documentation, decisions, onboarding and handoffs |
| [Agent systems](skills/agents/) | 12 | Delegation, evaluation, context and optional learning |
| [Tooling](skills/tooling/) | 16 | Automation, guardrails, configuration, packaging and skill maintenance |
| [UI/design](skills/ui/) | 15 | Interface development, accessibility, design systems and selectable styles |
| [Video](skills/video/) | 4 | UI recording, Remotion, style analysis and style-based editing |

Each workflow has a `SKILL.md` entrypoint and `SOURCES.md` provenance, with focused supporting resources where needed. All eleven retained Taste workflows survive: ten in UI/design and `complete-output` in tooling. Ranking-pipeline guidance is an architecture reference; Python installer guidance remains separately callable.

See the [skills and workflow glossary](skills/glossary.md) for the complete linked catalog, common workflow routes and terminology.

## Plugin status

KLCode 0.1.0 includes [Claude/Codex plugin wiring](plugin/README.md) for **native Windows only**, private marketplace metadata and disabled project-scoped Node hooks. Its 16 convenient command names use 15 aliases plus the existing `requirements` skill, giving Codex 118 unique skill exports. Nine Claude role adapters are declared in the manifest; nine Codex role adapters are unregistered TOML templates with a documented delegation alternative.

Use Node.js 22 or later to inspect and package the plugin:

```powershell
node plugin/cli.cjs validate
node plugin/cli.cjs doctor --project .
node plugin/cli.cjs build
```

Builds are written under `.scratch/dist/` with a SHA-256 file index and local offline marketplace catalogs. The source marketplace catalogs reference GitHub. `doctor` reports current configuration and prerequisites without executing project checks. Normal hook launchers require `node.exe` on PATH.

The initial [plugin validation record](consolidation/plugin-validation.json) records 27 passing tests, 118 official skill metadata checks, nine TOML templates, and isolated native Codex discovery of source and release packages. The later [GitHub ownership audit](docs/plans/plugin-wiring.md#github-ownership-and-final-accuracy-audit--2026-10-16) records 31 passing tests and the updated distribution/link checks. Claude-native and installed lifecycle checks were not performed. Installation, hook trust, activation and publication remain separate; this implementation enabled none of them.

## Shared defaults

- Default to test-first development for new testable logic and bug fixes, with practical exceptions. Target 80% coverage for new or substantially changed testable code; explain measurement gaps instead of imposing a repository-wide gate.
- Obtain independent review for substantive changes when delegation is available and authorized, and focused security review for sensitive changes. Treat size and nesting limits as review prompts.
- Use `docs/specs/`, `docs/plans/`, `docs/decisions/` and `docs/knowledge/` as default artifact locations, with one authoritative task ledger per initiative.
- Make local implementation commits at meaningful verified milestones, keeping unrelated changes outside them. Remote mutations follow the requested task scope.
- Keep requirements, planning, implementation and verification independently callable.
- Ask independent interview questions together each round; support one-at-a-time interviewing on request.
- Select autonomous agent infrastructure, persistent memory, continuous learning and visual styles explicitly. Independent review follows the shared review policy; style alternatives do not apply simultaneously.
- Honor current task and repository instructions. Project-specific variants are a later phase.

## Supporting files

Imported agents, commands, hooks, scripts, templates and assets support the grouped skills. Category-shared files live under [support/](support/README.md); each category has a `dependencies.json` inventory recording source, consumer, activation and prerequisites. Skill-specific helpers remain within their skill. Canonical shared rules live under [rules/](rules/README.md), with explicit skill links and a source-by-source [coverage inventory](rules/coverage.json). Unselected upstream rule families are retained as reference material.

Imported files under `support/` are reusable prompt definitions, scripts and optional recipes. The plugin manifests explicitly select the packaged entrypoints and hook declarations. Packaged hooks execute only after the host loads the plugin, any required native hook trust is granted, and the project explicitly opts in. External SDKs, CLIs, GUI hosts, media tools and optional service credentials are recorded prerequisites; the collection does not silently install packages or activate global settings. Retained vendor- or POSIX-dependent workflows keep their documented platform limits.

## Validation and provenance

Run structural, local-link, import-closure and JavaScript syntax checks with Node:

```powershell
node scripts/validate-repo.cjs --syntax
```

With maintenance Python 3.11 or later, parse Python helpers without generating bytecode and check Codex role-template TOML:

```powershell
python -X utf8 -B scripts/validate-python.py
```

Optionally include the installed Skill Creator validator for official canonical and alias skill metadata checks:

```powershell
python -X utf8 -B scripts/validate-python.py --skill-validator "path/to/skill-creator/scripts/quick_validate.py"
```

The optional official validator requires PyYAML. Category handoffs under [consolidation/](consolidation/STATUS.md) record focused behavioral tests and environment-specific limits. The [manifest](consolidation/manifest.json) maps every historical source skill to its replacement; [source-lock.json](consolidation/source-lock.json) records reference checkout revisions and curated-input hashes.

See [third-party notices](THIRD_PARTY_NOTICES.md) and per-skill provenance for source licensing. No blanket repository license overrides those terms.

See [AGENTS.md](AGENTS.md) for repository working guidelines and upstream reference locations.

