---
name: agent-cost-report
description: Report observed coding-agent usage and cost from selected local records, deduplicating cumulative session snapshots; optionally create a shareable usage card.
---

# Agent Cost Report

Read only the selected local usage log(s) needed for the report. Claude's optional imported tracker writes ~/.claude/metrics/costs.jsonl when registered; this workflow does not enable it. If no record exists, report unavailable data instead of estimating activity from unrelated files.

Each tracker row is a cumulative session snapshot. Select the latest row per session_id (fallback transcript identity when necessary) before totaling. Do not sum repeated stops. Prefer observed harness totals; estimated_cost_usd may itself be an approximate transcript-price estimate and is not an invoice.

Report time range/time zone, deduplication rule, session count, model breakdown and measured/estimated/missing fields. Session snapshots attributed by latest timestamp are not precise daily allocation for sessions crossing midnight. Read [reporting and tracker](references/reporting.md) for schema and activation.

For a shareable usage card read [token card](references/token-card.md). Its tokenchit package is external and not installed here; review package/source and download only under the user's task authorization. Generated cards can expose activity and repository information; inspect before committing or publishing.

For application API routing/caching design use [LLM cost optimization](../../engineering/llm-cost-optimization/SKILL.md). For live context headroom use [context-budget](../context-budget/SKILL.md), which is a different question from historical spending.
