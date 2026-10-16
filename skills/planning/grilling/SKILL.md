---
name: grilling
description: Clarify a plan or decision through dependency-aware interview rounds; use when the user asks to be grilled or unresolved choices would otherwise be silently assumed.
---

# Grilling

Represent the discussion as a design tree. A decision is ready only when its prerequisites are settled.

1. Inspect available facts first. Delegate independent fact-finding to a read-only agent when supported; otherwise investigate inline. Ask the human for preferences and decisions, not facts you can inspect.
2. Ask the whole independent frontier in one numbered round. Give a recommended answer for each question, worded so “yes” accepts it. Do not batch a question whose answer depends on another unanswered question.
3. Wait for the answers. Record settled choices, contradictions and newly opened branches; recompute the frontier rather than following a fixed questionnaire.
4. In explicit one-at-a-time mode, ask one ready question per round. Switch back only when requested.
5. Finish by stating the shared understanding and remaining exclusions. Obtain confirmation that the decision is settled before acting on the interview outcome; this is not a recurring approval gate on subsequent authorized routine work.

For discovering the actual goal, read [intent discovery](references/intent-discovery.md). When requested, use [domain modeling](../domain-modeling/SKILL.md) to retain terminology and [decision records](../../knowledge/architecture-decisions/SKILL.md) for durable tradeoffs. Specification writing belongs to [requirements](../requirements/SKILL.md).
