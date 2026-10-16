---
name: autonomous-operation
description: Design or configure explicitly requested unattended or scheduled agent operation with persistent state, bounded authority and recovery.
---

# Autonomous Operation

Explicitly establish what can run unattended, where it may act and when it stops. Scheduling work is separate from designing a schedule; neither implies permission to send messages, publish, deploy or access unrelated data.

Read [persistent operation](references/persistent-operation.md) for queue/state and specialist routing. Choose the host's native supported scheduler when available. Claude session-scoped /loop tasks end with the interactive session; independently persistent work needs an explicitly configured OS/CI runner. Do not invent a scheduling MCP package.

Record objective, authorized tools/repositories, identity/auth method, schedule/time zone, max duration/cost/iterations, concurrency policy, completion signal and failure owner. Persist accepted scope and queue transitions in project-local artifacts under docs/plans/; keep durable knowledge under docs/knowledge/. Secrets belong in approved credential storage, never queued prompts or memory artifacts.

Use [agent-loop-design](../agent-loop-design/SKILL.md) for iterative execution and [agent-orchestration](../agent-orchestration/SKILL.md) for ownership. Require idempotency or dedupe for retried external effects. An ambiguous provider response must be inspected before resubmission.

Deliver a reviewable schedule/runbook and chosen activation command. Do not start a daemon, add a global hook or configure a memory service as a side effect of explaining this workflow. Imported [loop operator](../../../support/agents/agents/loop-operator.md) is a prompt definition, not an installed scheduler.
