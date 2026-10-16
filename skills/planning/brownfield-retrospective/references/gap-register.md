# Four-axis retrospective register

Working evidence: current-state audit, reconstructed behavior, history notes, gap register and any selected target design. Link these from docs/plans/<slice>-retro.md; do not create a second task authority.

| Axis | Question |
| --- | --- |
| Thinking | Were assumptions, constraints, alternatives or significant decisions left implicit? |
| Coding practice | Do boundaries, error handling, verification and conventions support the actual behavior? |
| Missing behavior | Which evidenced requirement or realistic failure is unhandled? |
| Technology selection | Does the chosen dependency/approach cause demonstrated limitations? |

Each gap: stable ID, axis, observed evidence/path, consequence, suggested treatment, priority, effort/uncertainty, and linked implementation task when accepted. “Could add” is not a requirement.

Behavior mining uses WHEN -> THEN requirements and always-true invariants. Label whether observed enforcement is code/test-backed or merely documented; retain test anchors, entity names and uninspected/deferred paths. A defect should be recorded as observed behavior plus intended correction, not normalized into the desired spec.

Reconstructed decisions include today's date, proposed/reconstructed status, original-period evidence and uncertainty. The owner confirms acceptance; never forge historical approval.
