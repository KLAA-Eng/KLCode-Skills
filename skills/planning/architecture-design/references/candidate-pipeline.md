# Optional candidate ranking pipeline

For systems selecting top K items for a user/context, separate:
Source -> Hydrator -> Filter -> Scorer -> Selector -> SideEffect.

Sources gather candidates; hydration supplies facts needed for eligibility/scoring; cheap universal filters precede expensive/context-specific ones; the scorer chain combines relevant objectives; selection sorts or applies an explicit mix/diversity policy; downstream analytics/caches run outside the critical response path where reliability permits.

Clarify items, context, runtime, sources, required hydration, filters, score objectives, selector and side effects. Surface tradeoffs: one relevance prediction versus weighted multiple actions; isolated deterministic candidate scores versus batch-aware joint scoring; request-time versus offline/hybrid retrieval. Do not invent latency guarantees or benchmark gains.

Noncritical analytics can be asynchronous, but do not drop correctness-critical effects via untracked fire-and-forget tasks. Use the host's managed queue/lifecycle when delivery matters. Design retry/idempotency and failure reporting.

The original eight-step workflow ended by generating a runnable scaffold. Architecture design stops at the contract; hand an implementation request to the implementation skill with the selected design and real verification.

Pattern popularized by xAI's open-sourced X For You algorithm (Apache-2.0); ECC adaptation credits mturac/recsys-pipeline-architect (MIT). These are attribution, not bundled external implementations. No external checkout or model service is required for this design reference.
