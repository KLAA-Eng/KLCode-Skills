# Hooks and Permissions

Hooks may validate before an action, check after it, or verify completion at a host lifecycle boundary. Event names and guarantees depend on the host; Claude-specific PreToolUse, PostToolUse, and Stop names are not portable activation APIs.

## Activation is separate

These rules do not register hooks, change settings, enable auto-accept, or install commands. Read [hook rules](../../skills/agents/hook-rules/SKILL.md) and [operation guardrails](../../skills/tooling/operation-guardrails/SKILL.md) before selecting an optional integration. [KLCode's host adapters](../../plugin/README.md) are packaged with disabled project configuration; installation, native trust and activation remain separate.

Permissions remain controlled by active user, host, and repository instructions. When configuration is requested, prefer narrow scoped permissions. Do not disable safeguards or use bypass flags as a shortcut. Hooks do not prove action authorization or successful checks.

## Progress tracking

Use an available plan/task tool or existing task ledger for multi-step work. Keep steps actionable, update from evidence, and expose missing dependencies and changed direction. No particular TodoWrite tool is required.

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
