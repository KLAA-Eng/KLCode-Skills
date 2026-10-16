---
name: agent-evaluation
description: Evaluate coding-agent reliability using reproducible tasks, capability and regression checks, cost and elapsed-time evidence. Use when explicitly benchmarking agents or harness changes.
---

# Agent Evaluation

Select reproducible tasks before comparing an agent/harness change. Record input snapshot, allowed tools, acceptance criteria, baseline and expected side effects. Benchmarking is explicitly selected; no live provider calls occur merely because a source skill was reviewed.

Use executable graders for deterministic behavior, bounded independent review for subjective properties and human judgment for unresolved domain decisions. Separate capability evals (new ability) from regression evals (preserved ability). Report repeated-trial reliability and failures, not only the best sample.

Read [evaluation design](references/evaluation-design.md) for pass@k versus consistency, task definitions and cost/time comparisons. Imported [eval-harness.js](../../../support/agents/runtime/scripts/eval-harness.js) supplies local capsule/receipt verification and fixture-replay utilities; inspect its --help before running a selected operation. Its gate execution intentionally fails closed (gate.isolation_required): it does not execute arbitrary benchmark candidates. It records evidence and does not install an external benchmarking CLI.

The source agent-eval standalone CLI is not bundled upstream; use the included local harness or an explicitly reviewed external adapter. Do not recommend an unverified package install as if it were present. Imported [agent evaluator](../../../support/agents/agents/agent-evaluator.md) is available as a role prompt.

Compare matched tasks/constraints and actual result, elapsed time, retries and observed cost. Include failed and missing runs. A changed model/version/tool boundary may invalidate comparison. Report which results are measured versus estimated.
