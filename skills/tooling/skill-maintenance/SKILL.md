---
name: skill-maintenance
description: Inventory, evaluate, consolidate or validate skills/rules and host portability with executable local checks.
---

# skill maintenance

Read the target scope and existing catalog. [Inventory helper](scripts/inventory.py) recursively records skills or rules, source fingerprints and heading indexes; explicit previous/output paths support quick comparison and resumable results without scanning home folders implicitly. Use changed-only review only when the prior baseline covers the same scope.

Evaluate triggers, task value, concision, unique behavior, resource closure, licenses, current facts, invocation policy and actual host support. Overlap is a merge candidate only when outputs and choices coincide. Preserve meaningful specialist modes, scripts and attribution. Use [evaluation and distillation](references/evaluation-and-distillation.md) for independent batch review and append/revise/new-rule decisions.

Run [host compatibility validator](scripts/validate_skills.py) for recursive frontmatter/name/resource checks and Claude-only shell substitutions, then realistic behavior tests when warranted. Required scripts/modules/templates/agent prompts must be included or declared external, not left as deleted-source pointers. Metadata validity alone is not runtime correctness.

Make scoped approved changes, update catalog/references, and report evidence plus unresolved decisions. The validator is available for explicit CI integration; nothing registers it automatically. Use [writing-for-agents](../writing-for-agents/SKILL.md) for instruction design.

Selected delegation can use [skill evaluator](../../../support/tooling/agents/skill-evaluator.md) and [rule distiller](../../../support/tooling/agents/rule-distiller.md). The [manual check command](../../../support/tooling/commands/skill-check.md) and [validation requirements](../../../support/tooling/requirements-validation.txt) are included.
