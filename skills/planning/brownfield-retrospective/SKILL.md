---
name: brownfield-retrospective
description: Audit an existing project slice, reconstruct its behavior and decisions, identify gaps and plan justified improvements.
---

# Brownfield Retrospective

Audit code, not the team's performance. Start with a bounded slice; broad onboarding is optional.

1. Establish current behavior and executable evidence. Use relevant reviewers only where risk/stack justifies them.
2. Mine requirements and invariants using [the adapted behavior miner](../../../support/planning/agents/behavior-miner.md). Save requested reconstructed specs under `docs/specs/<slice>-reconstructed.md`; distinguish enforced behavior, documented promises and defects.
3. Reconstruct history from source, tests, commits and existing decisions. Mark inference and unknown provenance. A reconstructed ADR is proposed now, not a historical fact retroactively accepted.
4. Build [the four-axis gap register](references/gap-register.md): thinking, coding practice, missing behavior and technology selection. Every finding needs evidence, consequence, recommended treatment and priority.
5. For accepted material changes, use architecture design and implementation planning; the existing task ledger remains authoritative. Do not convert speculative “day-one” features into scope automatically.
6. Handoff scoped changes to implementation and verification with proportional evidence and verified milestone commits. Read-only audit requests stop at findings.
