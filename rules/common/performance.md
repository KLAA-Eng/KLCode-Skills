# Performance and Agent Resources

## Application performance

Measure the relevant workload before optimizing. Preserve correctness, compatibility, and maintainability; distinguish verified bottlenecks from speculation. Use bounded queries, batching, pagination, or caching when supported by evidence. Remeasure after changes. See [performance optimization](../../skills/engineering/performance-optimization/SKILL.md).

## Model and context choices

Use supported host model/reasoning controls subject to user preferences and authorization. Match capability to uncertainty and risk. Repeated or expensive review should have concrete benefit. Do not rely on fixed provider rankings, cost claims, model names, or invented settings.

Preserve context headroom for cross-file changes and difficult debugging. Before handoff capture decisions, file locations, evidence, and pending work; a fixed 20% threshold is not a guarantee. Read [context management](../../skills/agents/context-management/SKILL.md), [context budget](../../skills/agents/context-budget/SKILL.md), and [LLM cost optimization](../../skills/engineering/llm-cost-optimization/SKILL.md).

Consequential uncertainty benefits from structured planning and appropriate critique. Additional agents need available, permitted delegation. Do not assume provider-specific plan or thinking controls exist.

## Build failures

Read diagnostics, reproduce with the project toolchain, isolate the cause, fix incrementally, and rerun relevant checks. Use a specialist when useful and available. Do not replace runtime versions or weaken checks merely to pass.

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
