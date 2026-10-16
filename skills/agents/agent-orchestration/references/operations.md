# Engineering operation modes

| Operation | Baseline and first move | Implementation evidence |
|---|---|---|
| New capability | Confirm absent behavior and contract; plan a thin slice | New behavior check and relevant regressions |
| Change working feature | Identify desired difference and obsolete assertions | Update expected contract, then implementation |
| Defect | Reproduce failure and trace root cause | Regression reproduces failure and passes after fix |
| Refactor | Capture existing behavior and relevant green checks | Preserve behavior, use characterization checks where coverage is thin |
| MVP | Read accepted spec, extract scope/locked decisions | First end-to-end vertical slice before horizontal infrastructure |

Use research when APIs/constraints are uncertain; plan when dependencies or risk justify it. Follow [shared testing defaults](../../../../rules/common/testing.md) for new testable logic, bug fixes, changed-code coverage and practical exceptions. Do not impose fixed phase counts, repository-wide coverage targets or checkpoint commits after every test stage.

Core canonical workflows remain authoritative: planning/requirements, planning/implementation-planning, engineering/implementation, engineering/debugging, engineering/refactoring, engineering/verification and engineering/commit-preparation. Orchestration selects and delegates them; it does not duplicate their policies. Agent role prompts are read from support/agents/agents/ and command recipes from support/agents/commands/.

Choose model capability based on dominant uncertainty and available host models, not hard-coded upstream marketing tiers. Escalate only for an observed reasoning gap. Keep task/result/cost evidence when available; do not invent savings.
