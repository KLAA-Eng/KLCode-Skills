---
name: technical-research
description: Investigate a technical question against current primary sources, verify relevant versions and record cited findings without prescribing a hosted search provider.
---

# Technical Research

Inspect local context first: exact library/runtime versions, current behavior, existing contracts and the question that needs evidence. Research only what changes the decision.

Use official documentation, source code, standards, first-party APIs and changelogs. Fetch the relevant page or symbol rather than an entire manual. Separate sourced facts, user-supplied constraints, inference, recommendation and unresolved evidence. Check dates/version scope and surface source conflicts.

Use available tools; configured Context7 is an optional retrieval adapter, not a prerequisite. Read [source and retrieval discipline](references/source-discipline.md) for exact-version and trust rules. Delegate independent reading when useful and supported; do not require a background agent for a simple lookup.

Save requested durable findings under `docs/knowledge/<topic>-research.md`, with source links near claims and limitations. No automatic uploads, provider installation or recurring monitors. For adopt/extend/build decisions use [solution discovery](../solution-discovery/SKILL.md); for systematic scholarly evidence use [literature review](../literature-review/SKILL.md).
