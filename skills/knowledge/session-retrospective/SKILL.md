---
name: session-retrospective
description: Review session evidence for concrete improvements to the agent environment and capture reusable lessons without automatic diary writing.
---

# Session Retrospective

Read the actual conversation/logs, relevant changes and verification evidence. Distinguish environment/navigation/tooling problems from the codebase redesign owned by brownfield retrospective.

Look for missing navigation, unavailable information, expensive repetitive tools, unwired existing checks, no-op/conflicting instructions and review gaps. Mechanical patterns should become deterministic checks when useful; judgment calls belong in concise review guidance. Do not add a rule because one failure happened once.

Present candidates by consequence, evidence, expected benefit and cost. Make only authorized improvements. For requested learning capture use [retrospective and evaluation criteria](references/retrospective.md), merge repeated root causes and save transferable lessons under docs/knowledge/. Skip trivial no-learning changes.

The optional imported [output heuristic evaluator](../../../support/knowledge/scripts/output-evaluate.py) is a local wording/structure aid, not a semantic correctness judge or mandatory completion gate. It does not verify claims merely because an answer says “tests passed.”
