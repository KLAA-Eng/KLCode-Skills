# Tracker schema and reporting

Imported [cost-tracker.js](../../../../support/agents/runtime/scripts/hooks/cost-tracker.js) and its helper closure consume Claude Stop payloads with session_id/transcript_path. It reads transcript usage and publishes cumulative rows plus rebuildable per-session snapshots. No hook is registered by this import. Node and compatible Claude transcript shape are prerequisites.

Rows include timestamp, session_id, transcript_path, model, input_tokens, output_tokens, cache_write_tokens, cache_read_tokens and estimated_cost_usd. Use the latest valid snapshot for each session before aggregation. Diagnose malformed/missing rows and do not include transcript contents or credentials in reports.

If the user's statusline supplies a fresh authoritative harness-cost cache, the tracker prefers that; otherwise its built-in rate table is an estimate. Rates can become stale and cannot express every pricing/cache/long-context tier. Do not present estimated logs as current provider pricing or invoice totals. Report unknown model rates as unavailable when interpreting results.

The inert activation-recipes.json has a Stop-hook recipe requiring an explicitly chosen absolute script path. The runtime preserves Claude compatibility locations and environment names; those identifiers do not mean the ECC plugin is installed. Other hosts require their own observed log adapters rather than coercing Codex records into a Claude schema.
