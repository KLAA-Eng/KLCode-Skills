# KLCode-Skills

Skills being curated for the development team, primarily for KL&A-Tools (pyRevit) and strHub, with supporting planning, research, documentation, and review workflows.

## Curated workflows

The collection consolidates 209 source skills into 103 canonical workflows, organized by the job they perform.

| Category | Skills | Coverage |
|---|---:|---|
| [Engineering](skills/engineering/) | 22 | Implementation, debugging, review, tests, security, performance and integrations |
| [Languages](skills/languages/) | 3 | Python, .NET/C# and C++ development/testing |
| [Planning](skills/planning/) | 15 | Interviews, requirements, plans, architecture and task coordination |
| [Knowledge](skills/knowledge/) | 16 | Research, documentation, decisions, onboarding and handoffs |
| [Agent systems](skills/agents/) | 12 | Explicitly selected orchestration, evaluation, context and learning |
| [Tooling](skills/tooling/) | 16 | Automation, guardrails, configuration, packaging and skill maintenance |
| [UI/design](skills/ui/) | 15 | Interface development, accessibility, design systems and selectable styles |
| [Video](skills/video/) | 4 | UI recording, Remotion, style analysis and style-based editing |

Each workflow has a `SKILL.md` entrypoint, focused supporting resources and `SOURCES.md` provenance. All eleven retained Taste workflows survive: ten in UI/design and `complete-output` in tooling. Ranking-pipeline guidance is an architecture reference; Python installer guidance remains separately callable.

See the [skills and workflow glossary](skills/glossary.md) for the complete linked catalog, common workflow routes and terminology.

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

Agent and command files are usable prompt definitions. Hook recipes remain unregistered until the appropriate host integration is configured. External SDKs, CLIs, GUI hosts, media tools and optional service credentials are recorded prerequisites; the collection does not silently install packages or activate global settings.

Claude/Codex plugin lifecycle wiring and publication remain the next phase.

## Validation and provenance

Run structural, local-link, import-closure and JavaScript syntax checks with Node:

```powershell
node scripts/validate-repo.cjs --syntax
```

Compile-check Python helpers without generating bytecode; optionally pass the installed Skill Creator validator to validate metadata using its official checks:

```powershell
python -X utf8 -B scripts/validate-python.py --skill-validator "path/to/skill-creator/scripts/quick_validate.py"
```

The optional official validator requires PyYAML. Category handoffs under [consolidation/](consolidation/STATUS.md) record focused behavioral tests and environment-specific limits. The [manifest](consolidation/manifest.json) maps every historical source skill to its replacement; [source-lock.json](consolidation/source-lock.json) records reference checkout revisions and curated-input hashes.

See [third-party notices](THIRD_PARTY_NOTICES.md) and per-skill provenance for source licensing. No blanket repository license overrides those terms.

See [AGENTS.md](AGENTS.md) for repository working guidelines and upstream reference locations.

