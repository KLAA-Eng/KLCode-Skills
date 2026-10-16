---
name: public-release-preparation
description: Prepare a private repository as a sanitized, attributed, reviewable public-release candidate.
---

# public release preparation

Work on an explicitly chosen staging copy; preserve the private source and existing history. Inventory secrets, credentials, internal domains/paths, confidential fixtures, binaries/assets, licenses and third-party notices. Decide what should be removed, replaced with nonsecret configuration, documented, or intentionally published.

Use [staging and sanitization](references/staging-and-sanitization.md) and the imported [forker](../../../support/tooling/agents/public-forker.md), [sanitizer](../../../support/tooling/agents/public-sanitizer.md), and [packager](../../../support/tooling/agents/public-packager.md) when delegation is selected. Secret examples contain variable names and safe dummy values, never extracted real values. Rotating leaked credentials is a separate required remedy; rewriting text alone does not revoke a secret.

Run the [local staging scanner](scripts/sanitize_staging.py) without executing target code. Record scanned, skipped, unreadable and binary files honestly; a partial scan cannot become a clean verdict. Inspect uncertain binary assets through the appropriate viewer before treating them as cleared.

Preserve applicable licenses and attribution; ask for the intended outbound license if undecided. Prepare accurate setup/contribution/user docs and reproducible checks. Report a concrete candidate, remaining review and publish commands. Creating a public repo, rewriting source history, deleting staging, pushing or publishing requires the task's authorization; do not infer it from preparation.

Apply the relevant shared rules: [common / git workflow](../../../rules/common/git-workflow.md).
