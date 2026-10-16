---
name: decision-exploration
description: Map a large uncertain effort as dependent decision questions, resolve its frontier over sessions and hand settled decisions to requirements.
---

# Decision Exploration

Use when the route is unknown and cannot fit one conversation. This is decision mapping, not a build backlog.

Create `docs/plans/<topic>-decisions.md` with destination, standing constraints, settled decisions, live questions, fog-of-war and out-of-scope. Use [the decision map contract](references/decision-map.md). This map owns decision state; implementation tasks belong to a later plan rather than a parallel build ledger.

Define only questions whose wording is already clear. Unclear in-scope concerns remain fog until prerequisites settle. A frontier question has resolved blockers and no other active claimant. Use stable IDs and human-readable names; reserve claim/ownership support for concurrent sessions.

Resolve according to type: research establishes facts, grilling settles preferences, prototypes test interactive questions, enabling tasks unblock a decision. Work one substantial human decision at a time; independent fact investigations can run concurrently.

Record the answer and evidence, update dependent questions, graduate newly specifiable fog, and close mis-scoped questions as out-of-scope. Do not claim unanswered human preferences on their behalf.

When the destination is settled, hand to [requirements](../requirements/SKILL.md), then implementation planning. Do not automatically push research branches or implement the destination.
