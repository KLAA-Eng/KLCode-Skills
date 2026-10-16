---
name: agent-orchestration
description: Coordinate multi-agent engineering work or substantive independent review with scoped ownership, dependency lanes, integration and evidence.
---

# Agent Orchestration

Use when multi-agent work is selected, including independent review required by the shared review rule when the host permits delegation. A single focused implementation can remain single-agent; extra agents need independent work or a meaningful review perspective. Full autonomous loops and external providers remain explicitly selected.

Define objective, acceptance evidence, one owner per work item, dependency edges, write scope and integration owner. Batch independent reads/checks. Parallel implementation needs disjoint files or isolated branches/worktrees; shared edits need a sequential integrator. Record state in the existing plan/task ledger under docs/plans/ rather than inventing a parallel board.

Read [engineering operations](references/operations.md) to distinguish new capability, changed behavior, defect, refactor and MVP slices. Read [coordination](references/coordination.md) for lane ownership, checkpoints and merge evidence. For work that needs repeated autonomous iterations, explicitly select [agent-loop-design](../agent-loop-design/SKILL.md).

Dispatch bounded context: task, constraints, relevant files, permitted changes, done signal and return format. The imported [role prompts](../../../support/agents/agents/) are usable prompt definitions; use the active host's native delegation mechanism, without assuming a slash command installs an agent. Read [role mapping](references/roles.md) for appropriate specialists.

At integration, inspect actual diffs, run relevant checks and resolve conflicts in dependency order. Local commits occur at meaningful verified milestones, scoped to this task; do not stage unrelated edits. Remote pushes, PR mutations and deployment require the task's authorization. Do not make plan/review/commit approval rituals mandatory for routine authorized work.

Optional [DevFleet adapter](references/devfleet.md) uses a separately installed local server. Its presence is not inferred from this skill. No server, scheduler, memory backend or hook is enabled automatically.

Apply the relevant shared rules: [common / agents](../../../rules/common/agents.md).
