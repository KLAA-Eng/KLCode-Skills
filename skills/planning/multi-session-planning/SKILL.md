---
name: multi-session-planning
description: Plan a large initiative across multiple sessions or PRs with cold-start context, dependency order, verified milestones and explicit plan evolution.
---

# Multi Session Planning

Use only when one focused session or one PR cannot hold the work. This is a callable planning workflow, not an automatic expansion of ordinary implementation planning.

1. Read requirements, current structure, relevant decisions and existing plans. Check Git/remote/CI capabilities only if branch/PR planning needs them.
2. Divide into useful reviewable milestones, usually several PR-sized steps. Give each stable IDs, real blockers, scope and an independently understandable context brief.
3. Use [the milestone and mutation contract](references/milestones.md). Each milestone includes invariants, relevant files/contracts, verification commands, exit condition, integration point and rollback/recovery where applicable.
4. Identify parallel steps from data/file dependencies. Assign roles according to complexity; do not require a specific provider or premium model.
5. Save under `docs/plans/<initiative>.md`, using that plan's task ledger as the single authority. Link specs and decisions instead of duplicating them.
6. For consequential or ambiguous plans, request an independent challenge using [the plan reviewer](../../../support/planning/agents/plan-reviewer.md). Reconcile findings with evidence; routine plans do not need a mandatory adversarial loop.
7. Handoff to implementation with verified milestone commits. GitHub branches/PRs are optional and remote mutations require task authorization. Without Git/CLI support, plan local milestones honestly.
