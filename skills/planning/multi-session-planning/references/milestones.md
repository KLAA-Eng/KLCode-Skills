# Cold-start milestones and plan mutation

Each milestone carries enough context for a fresh agent:
- Stable ID, title, user-visible outcome and linked requirements.
- Relevant current architecture, interfaces, files and decisions; what must remain true.
- Explicit blockers, safe parallel neighbors and write surfaces.
- Task list, verification commands, environment constraints, exit condition and evidence location.
- Integration/commit boundary; branch/PR only when supported and authorized.
- Rollback or recovery for consequential data/interface changes.

A milestone is reviewable scope, not a time estimate or arbitrary layer. Keep shared context once at plan level and provide minimal self-contained context for each step.

For a changed plan, retain stable IDs. Splitting creates new linked IDs, insertion records blockers, skipping records rationale and impact, reordering preserves true dependencies, abandonment records what supersedes it. Reassess downstream assumptions and evidence after each material mutation.

Use an independent review for high uncertainty or consequence. Ask whether requirements are complete, dependency edges are justified, parallel ownership conflicts, invariants are testable, rollback is realistic and a fresh agent can start without undisclosed context. Classify findings; fix material issues without endless re-review over stylistic preferences.
