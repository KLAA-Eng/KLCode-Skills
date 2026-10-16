# Release readiness evidence

Adapted from shipping-and-launch and production-audit. Select checks from the actual product and release procedure.

## Artifact and compatibility
Pin revision, artifact identity, channel, supported host/runtime versions, resource/dependency contents, and authoritative version source. Reproduce packaging from the documented process; inspect generated metadata and included files. Test startup from the packaged layout on an appropriate clean environment, not only the development checkout.

For pyRevit/.NET desktop: distinguish command-engine syntax, Revit API assembly targets, WPF resources, native SQLite dependencies, Excel COM availability, and vendor installation requirements. For Avalonia/GPU: distinguish framework/headless results from runtime resource, accessibility and conformant-device acceptance. Report each tested target precisely.

## User and data outcome
Check representative success, empty/cancelled input, validation failures, interrupted work and repeat invocation. For model/file writers, use disposable fixtures, verify transaction/file atomicity and output readback, preserve originals, reconcile units/signs/IDs/provenance and document rollback or recovery.

## Operability
Confirm actionable errors, redacted diagnostic context, relevant logs, version/loaded-path troubleshooting, documentation and support ownership. For connected services consider authorization, quotas/timeouts, offline behavior and data privacy. For web surfaces additionally assess security headers, sessions, dependency audit, responsiveness and selected accessibility/performance budgets.

## Rollout and recovery
Use the repository's release authority and PR/tag/publication sequence. Identify who accepts host tests, rollout channel, explicit stop/rollback triggers, compatibility overlap, recovery data and known irreversible effects. A feature flag may help a connected product but is not compulsory desktop architecture.

When staged rollout is useful, define a small representative cohort, observable success/error/performance criteria, an observation window, and the explicit advance/stop condition. A release switch and a schema migration are separate controls: disabling the feature may not undo persisted data. For offline desktop tools, a beta package plus representative host fixtures may be the practical first cohort. Remove temporary flags only after compatibility and rollback commitments allow it.

## Verdict
Ready: required evidence is current and all blockers resolved.
Ready with conditions: identify each remaining limited risk, owner and acceptance condition.
Blocked: identify unmet mandatory gate and the next concrete proving action.
Distinguish unavailable evidence from a known failure. Preparing this report never publishes, deploys, merges, tags or sends messages on its own.
