---
name: agent-tool-design
description: Design agent tools, action spaces, observations and error recovery. Use when building or changing an agent harness tool interface.
---

# Agent Tool Design

Design an action space that lets an agent make useful progress and recover from failure without guessing. This concerns tool/harness interfaces rather than ordinary application APIs.

Use stable explicit tool names and narrow schemas. Choose micro-tools for irreversible operations, medium tools for read/edit/search and macro-tools only when round-trip overhead dominates. Return deterministic shapes with bounded observations, clear status and the minimum identifiers needed for the next action.

Define errors as recoverable, terminal or authority-boundary failures. Include a useful diagnostic and retry hint without leaking credentials. Idempotency and external status readback matter more than hiding every failure behind automatic retry.

Read [action and observation design](references/action-observation.md) for the detailed checklist. Evaluate the tool change on representative tasks with [agent-evaluation](../agent-evaluation/SKILL.md); compare completion, invalid calls, retries, elapsed time and cost before expanding the interface.
