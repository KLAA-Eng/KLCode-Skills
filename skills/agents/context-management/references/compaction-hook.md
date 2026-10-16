# Optional Claude compaction hints

Runtime: [suggest-compact.js](../../../../support/agents/runtime/scripts/hooks/suggest-compact.js). Requires Node and a Claude tool hook payload with session/transcript data. Its relative helper modules are bundled. Configure manually only when selected; no hooks are registered here.

The hook considers observed context usage and tool-call counts, with window-scaled thresholds, interval reminders, safe per-session counter names and stale-state cleanup. Environment controls include COMPACT_THRESHOLD, COMPACT_CONTEXT_THRESHOLD, COMPACT_CONTEXT_INTERVAL and COMPACT_STATE_TTL_DAYS. Inspect the runtime before changing defaults. Tool-call count is only a fallback proxy. A suggestion does not invoke native compaction or authorize dropping current work.

Use the template in [hook recipes](../../../../support/agents/hooks/activation-recipes.json) only after resolving its absolute script path for the chosen host. Codex and Claude hook schemas are different; this adapter consumes Claude payloads.
