# Quality contract design

Adapted from agent-skills constraint-driven-development. These are selected project controls, not installed universal defaults.

## Discover and choose

Read existing project rules, manifests, CI, runtimes and measured gates before asking. A repository already has a quality authority even if it has no file named CONSTRAINTS.md. Preserve its canonical location and vocabulary.

Ask independent material choices together: which dimensions matter, which are blocking versus advisory, whether to establish a measured baseline or selected target, and how much local/CI runtime is acceptable. One-question-at-a-time is available when requested, not mandatory. State each option's operational cost and host requirements. Avoid inventing a coverage number, a web URL or a model limit.

Useful dimensions include correctness and data integrity, supported runtime/host compatibility, security and secret handling, accessibility, architecture boundaries, responsiveness/throughput, testing and package reproducibility. Select only dimensions that the actual product needs.

## Contract contents

For each chosen rule record scope, observable guarantee, command/tool, measured baseline, target or direction, blocking/advisory mode, execution boundary, owner and exception policy. A threshold with no measuring command is an aspiration until its evidence exists.

Use existing commands wherever possible. New checks can run at a relevant milestone, pre-commit, CI or host acceptance; every-edit checks are appropriate only when explicitly selected and cheap enough. GUI/COM/vendor evidence may require a separate interactive environment and cannot be inferred from a generic CI pass.

An illustrative row is: 'Supported IronPython command paths remain syntax-compatible; existing compatibility checker; block at release gate; owner developer.' A second might be 'Large model import retains all expected IDs and units; fixture accounting test; block at relevant milestone.' Neither implies a fixed coverage percentage or a new tool install.

## Ratchets and exceptions

When no useful target is known, measure a representative baseline and hold an agreed direction while improving it. Do not turn a noisy measurement into an impossible exact requirement. Define sampling, host/workload and tolerance, plus when the baseline can legitimately change.

Exceptions name a rule, affected paths, reason, owner, expiry/review point and the compensating verification. A legitimate suppression, test deletion or changed threshold requires explanation and review; a text match alone does not prove malicious weakening. Do not preserve obsolete tests solely because removing them triggers a shallow guard.

## Enforcement and review

The floor-guard script detects candidate suppressions, test skips/deletions, stubs and constraint changes in a diff. It is deliberately shallow. Review context and tracked exceptions before deciding whether the guarantee was weakened or merely renamed. Never report a clean scan if Git comparison failed.

Add or revise executable CI/local checks only within the requested setup scope. Review dependency versions and data flows first; selecting a dimension does not authorize arbitrary global installation. Link the contract from existing agent/contributor guidance without overwriting unrelated instructions. Record the actual reviewer/date when the project contract is created, not an upstream example identity.
