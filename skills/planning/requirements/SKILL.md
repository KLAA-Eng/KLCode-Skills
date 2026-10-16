---
name: requirements
description: Turn a request or settled discussion into observable acceptance criteria or a full specification; review existing requirements without restarting discovery.
---

# Requirements

Choose the smallest useful mode:
- Quick capture: goal, scope/non-goals, assumptions and approximately 3–7 observable criteria.
- Full specification: ambiguous, cross-system, persistent-data, security-sensitive or expensive work; use [the acceptance and capability template](references/specification.md).
- Conversation synthesis: summarize decisions already made. Do not restart an interview; surface only genuine blockers.
- Existing-spec review: identify contradictions, missing boundaries and unverifiable claims, then amend rather than replacing valid content.

Inspect current behavior, contracts and verification infrastructure. Code establishes technical facts, not business policy: product rules, compliance obligations, priorities and target users require the user or an authoritative product source.

Give criteria stable IDs such as AC-001. Record condition/trigger, observable result, meaningful prohibited side effects, priority and evidence method. Tests are not the only evidence: manual UX, operational checks and stakeholder judgment can be appropriate. Define vague terms like “fast” or mark them for human review.

For multi-capability initiatives, sketch responsibility/dependency boundaries before writing individual specs. Resolve actual blocking choices through [grilling](../grilling/SKILL.md). Save durable specs under `docs/specs/<topic>.md`; do not create a competing task ledger in the specification.

Requirements do not automatically create plans, implement code or enforce universal review gates. Continue already-authorized work when criteria are clear; get missing decisions before consequential irreversible work. Handoff to [implementation planning](../implementation-planning/SKILL.md) when a breakdown is needed.
