# Scope memory and optional tracker coordination

Check durable rejected concepts and existing decisions before re-opening an incoming request. A rejection record is per concept, with substantive rationale and prior request pointers, stored under docs/decisions/ or the existing decision index. “Not this week” is deferral, not permanent rejection. A changed premise can justify a new decision.

If an external tracker is selected, map logical category/state roles to its actual fields. Exactly one authority owns scheduled work and completion; do not assume GitHub must be public truth or Linear internal truth. Link issues, PRs, CI and owners rather than duplicating state.

Useful backlog treatments: merge-ready for human review, adapt/rebuild, close with reason, park unscheduled. These describe a recommendation until authorized remote updates are actually made. Verify CI/review status and permissions before claiming a blocker is cleared.

For public AI-authored triage comments, clearly identify the generated brief when the team's workflow requires it; do not impersonate a reporter or maintainer.
