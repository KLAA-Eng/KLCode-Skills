---
name: quality-constraints
description: Establish or revise an explicit project quality contract and check changes for silently weakened guarantees.
---

# quality constraints

Read current project rules, constraints, tooling, measured coverage/performance and actual host limits. Preserve existing quality authority. For a new contract, ask independent material choices together and use evidence-informed defaults; a universal threshold is not evidence. Noninteractive work follows established constraints and records unresolved choices rather than inventing a binding contract.

Choose applicable correctness/security/data-integrity/compatibility/accessibility/performance/test dimensions. Record measurable bounds, commands, scope, exceptions, owner and expiration in the project's existing contract or CONSTRAINTS.md. Avoid requiring web metrics or a new runner where they do not fit.

Read [constraint design](references/constraint-design.md). The executable [floor guard](scripts/floor-guard.cjs) is an adapted shallow diff detector for new suppressions, skipped/weakened tests, stubs and changed constraint thresholds. Pass an explicit comparison ref, inspect findings and distinguish a renamed rule from a weakened guarantee. It is not a proof engine or an automatic reason to reject every changed test.

Translate meaningful constraints into existing local/CI checks when requested. Preserve tracked exceptions and repository authority. The skill does not install hooks merely because constraints are defined.
