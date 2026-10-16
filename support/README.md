# Supporting dependencies

Shared files are grouped by the consuming workflow category. Each category's `dependencies.json` records imported resources, upstream paths, consumers, activation and remaining external prerequisites. Skill-specific code, references, templates and assets remain inside the skill.

Canonical shared rules live under [rules/](../rules/README.md), with a separate [source coverage inventory](../rules/coverage.json). The old engineering implementation-core path is a compatibility pointer. Skills link to the canonical rules they need; copied rule directories and prompt files do not register host behavior.

| Category | Dependency inventory | Handoff |
|---|---|---|
| Engineering | [dependencies](engineering/dependencies.json) | [validation](../consolidation/engineering-handoff.md) |
| Languages | [dependencies](languages/dependencies.json) | [validation](../consolidation/languages-handoff.md) |
| Planning | [dependencies](planning/dependencies.json) | [validation](../consolidation/planning-handoff.md) |
| Knowledge | [dependencies](knowledge/dependencies.json) | [validation](../consolidation/knowledge-handoff.md) |
| Agent systems | [dependencies](agents/dependencies.json) | [validation](../consolidation/agents-handoff.md) |
| Tooling | [dependencies](tooling/dependencies.json) | [validation](../consolidation/tooling-handoff.md) |
| UI/design | [dependencies](ui/dependencies.json) | [validation](../consolidation/ui-handoff.md) |
| Video | [dependencies](video/dependencies.json) | [validation](../consolidation/video-handoff.md) |

Use agent/command Markdown through the active host's native invocation mechanism; copying a prompt definition does not register a role or slash command. Read the consuming skill before running its helpers. Hook recipes are inert until explicitly configured with absolute, reviewed paths and a selected scope. No global settings, background observers, model calls or service connections are enabled by the repository itself.

Some adapters require authenticated CLIs, browsers, GUI/vendor hosts, Python packages, media tools or a POSIX environment. Read the workflow's recorded prerequisites before using those modes. Portable local paths remain available where supported. The later plugin-packaging phase will supply host lifecycle wiring without rewriting the shared workflow contracts.
