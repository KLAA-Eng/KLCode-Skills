# One plan, one task authority

Default: docs/plans/<topic>.md owns task state. Link the spec rather than copying it. If an explicitly selected external tracker or story ledger owns the tasks, the plan is a design/index document and links that authority; it does not independently declare completion.

## Plan
Goal and linked requirements; current context; chosen design; dependencies; risks; integration strategy; verification; task ledger.

## Task
- Stable ID and human-readable title.
- End-to-end behavior delivered and relevant acceptance IDs.
- Blocking task IDs, or none.
- Scope and expected ownership surface.
- Focused evidence commands/manual checks; practical environment prerequisites.
- Completion criterion and verified milestone.
- Status and evidence pointer.

A task should be coherent enough for one focused implementation session. Build tracer bullets: one behavior all the way through necessary layers. If a foundational change cannot be independently green, make the integration condition explicit; do not falsely promise every intermediate task a standalone working product.

For parallel work: avoid shared-file contention, identify contracts first, choose an integration owner/branch only when supported, and include a final integrated check. Ready tasks have all true blockers satisfied.

When work changes, update the authoritative task once and record why. Never overwrite an incomplete plan silently. Distinguish implementation finished, verified locally, and integrated remotely; one does not imply the others.
