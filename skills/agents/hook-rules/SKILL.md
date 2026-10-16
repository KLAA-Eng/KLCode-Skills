---
name: hook-rules
description: Author and validate local Claude hook rules with bounded matching and warn or block actions. Use when the user explicitly chooses hook-based behavior enforcement.
---

# Hook Rules

Author a rule for a concrete repeated behavior. This is an optional Claude hook runtime, not a portable permissions system.

1. Identify the event, evidence field and intended warn/block result. A narrow deterministic pattern is appropriate for a syntactic hazard; judgment calls belong in review guidance.
2. Read [rule syntax](references/rule-syntax.md). Write project rules as .claude/hookify.<name>.local.md only when the user selected rule creation. Avoid secrets and overly broad patterns.
3. Exercise a matching and nonmatching payload against [hookify-runtime.js](../../../support/agents/runtime/scripts/hooks/hookify-runtime.js). The runtime bounds input, rule count, regex work and message size; keep the bundled frontmatter/input helper modules together.
4. Report the file, event, action, example trigger and rollback (disable the rule or remove the selected registration). A rule file alone does not register a hook.

The [activation recipe](../../../support/agents/hooks/activation-recipes.json) is inert. Registration needs the chosen Claude event and an absolute runtime path. For behavioral discovery, the imported [conversation analyst](../../../support/agents/agents/conversation-analyzer.md) can propose candidates; do not enable every suggested rule automatically.

The [KLCode plugin runtime](../../../plugin/README.md) provides separate project-scoped Node adapters for both hosts. Preview and diagnostics do not create Hookify rules or activate hooks; choose Hookify authoring explicitly when its pattern-rule behavior is needed.

Apply the relevant shared rules: [common / hooks](../../../rules/common/hooks.md).
