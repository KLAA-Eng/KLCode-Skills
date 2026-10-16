---
name: configuration-audit
description: Audit agent/automation configuration for stale, broken or redundant surfaces and apply requested reversible cleanup.
---

# configuration audit

Resolve exact scope and requested audit/fix mode. Inventory skills/commands/rules/hooks/permissions/MCP/connectors/jobs plus owner, trigger, configuration, authentication and last verified runtime evidence. Reading a config entry is not proof the tool works.

Read [configuration and automation audit](references/configuration-and-automation-audit.md). Separate configured, authenticated, verified, broken, unknown, stale-candidate and missing. Age alone does not justify deletion; dormant seasonal workflows may matter. Compare overlapping triggers, side effects, outputs and provenance before recommending keep/merge/disable/fix/remove.

Produce a reviewable itemized change set with evidence and recovery. Honor an already-approved batch; do not force one confirmation per item. Prefer reversible disable/backup where uncertainty exists, scoped to the selected config root. Preserve credentials privately and existing user edits.

After authorized changes, verify actual loader/config validity and relevant behavior, update references and report changed versus merely recommended items. Do not truncate memory/history or expand into home-directory/global surfaces without scope.

The [manual audit prompt](../../../support/tooling/commands/configuration-audit.md) is available without registering a command.
