---
name: implementation-planning
description: Break settled requirements into ordered, independently verifiable implementation slices and one authoritative task ledger.
---

# Implementation Planning

Read requirements and relevant code before proposing tasks. Skip planning ceremony when a task is already small and obvious.

1. Define vertical slices that demonstrate behavior end to end. Foundations may precede a slice where technically necessary; avoid a plan consisting only of database/UI/backend layers.
2. Record genuine dependency edges. A ready task has all blockers satisfied. Do not sequence independent tasks arbitrarily or assign parallel writers overlapping files without an integration strategy.
3. Use [the plan and task contract](references/task-ledger.md). Each task has stable ID, delivered behavior, blockers, scope, evidence, risk and completion condition.
4. Save the plan and its task ledger under `docs/plans/<topic>.md`. This is the default authority; a separately selected tracker or transactional ledger replaces it rather than mirroring completion independently.
5. Match detail to risk. Clarify blocking architecture/product choices; do not require approval after every routine planning phase.
6. Handoff to [implementation](../../engineering/implementation/SKILL.md). Plan meaningful verified milestone commits, not red-test checkpoint commits.

For multiple sessions or PRs use [multi-session planning](../multi-session-planning/SKILL.md), which remains separately callable. For an explicitly selected local epic/story/sprint ledger, read [transactional ledger mode](references/transactional-ledger.md); it is optional, not a second authority.

A host may delegate planning using the adapted [planner brief](../../../support/planning/agents/planner.md). It requires no globally installed persona or fixed model.
