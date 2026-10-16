---
name: agent-loop-design
description: Design or review an explicitly requested iterative agent harness with measurable completion, independent evaluation, budgets and stop conditions.
---

# Agent Loop Design

Use only for an explicitly requested iterative harness. First determine whether repetition is useful: the goal must have a testable completion signal, observable progress, a bounded retry budget and an escalation/fallback path. A one-shot task stays inline.

Read [loop patterns](references/loop-patterns.md) to choose sequential, review-driven PR, dependency-DAG or exploratory generation. Read [verifier and recovery](references/verifier-recovery.md) before implementing a judge or retry loop. The user chooses allowed external effects; an increasing score never grants authority.

Write a task-local contract: objective, inputs, outputs, executable eval, stop conditions, resource limits, owner and handoff artifact. Keep its accepted plan/task ledger under docs/plans/. Use [agent-evaluation](../agent-evaluation/SKILL.md) for reproducible graders and [agent-orchestration](../agent-orchestration/SKILL.md) for parallel ownership.

Each cycle observes current state, attempts the smallest useful change, runs an independent acceptance check and records actual delta. Preserve source material and prior verified checkpoints. Freeze on repeated identical errors, no measured progress, ambiguous external success, budget exhaustion or ownership conflicts.

Start with a manual rehearsal, then bounded assisted cycles, then explicitly selected unattended operation. A reusable harness needs stable inputs/outputs and rerunnable acceptance evidence. Extract repeated workflows into a skill only after useful repetition, not because a one-off script exists.
