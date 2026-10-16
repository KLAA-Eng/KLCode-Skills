# One owner per fact

Reuse existing sources when instructions select them. Default shared documentation:
- Rules/navigation: AGENTS.md with short pointers.
- Map: docs/knowledge/map.md, real structure/entry points.
- Task/status: one docs/plans/<topic>.md ledger or explicitly selected tracker.
- Requirements/contracts: docs/specs/.
- Durable decisions/history: docs/decisions/.
- Vocabulary, research, onboarding, verification references: docs/knowledge/.

The optional artifact-role map identifies ownership without making every default file mandatory. A small project can combine roles with clear sections. Do not create empty files just to satisfy a diagram/audit.

Maintaining documentation means update the owner when behavior changes; use links elsewhere. Preserve intentional removals, replacement and consequential incidents as durable history so future agents do not recreate them. Archive only when useful, with active pointers; do not copy every commit into a second ledger.

Comments explain rationale, preconditions, tricky contracts, units and surprising failure behavior. Public interfaces need inputs/results/errors and compatibility expectations. User guides show a runnable path and expected result. Do not document obvious syntax or create ADRs for routine details.

The deterministic audit checks containment, links, mapped roles, ADR indexes/status and evidence IDs. Warnings are review prompts; history checks may be unavailable without Git. A mechanically valid document is not semantically verified.
