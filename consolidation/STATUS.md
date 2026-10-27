# Consolidation board

| Category | Skills | Owner | State | Merge evidence |
|---|---:|---|---|---|
| engineering | 22 | project_context | complete | Official metadata, helpers and independent forward review pass; omitted convention-extraction mode restored and rechecked |
| planning | 15 | skill_inventory | complete | Metadata, Plan Canvas/ledger tests and independent forward review pass |
| agents | 12 | consolidation_infra_ui | complete | Runtime/evaluation checks and independent review pass; Git-backed security6/6; reviewer policy corrected |
| knowledge | 16 | skill_inventory | complete | Helper4/4, CK and vault31 pass; ADR/history regressions corrected; four Windows symlink skips |
| tooling | 16 | project_context | complete | Terminal25/25, Python7/7, operation guard and Git-backed floor guard9/9 pass; naming regression corrected |
| languages | 3 | consolidation_infra_ui | complete | Metadata/links and target-aware forward review pass; four role contracts corrected and rechecked |
| ui | 15 | consolidation_infra_ui | complete | Resource/evidence tests and independent review pass; native select example replaces defective custom control |
| video | 4 | consolidation_infra_ui | complete | Recorder4/4 and portable media-helper suites pass; POSIX-only protections documented; real rendering not exercised |

The integrator validated all 103 skills and 209 historical source assignments, dependency closure, links, invocation boundaries, licensing, scripts, and cross-category integration before removing the five historical collections. Hook activation and plugin publication are outside this pass. See category handoffs and `validation.json` for exact verification scope and runtime limits.

## Subsequent rule integration

The [rule integration review](RULES-REVIEW.md) records the later audit, revised testing/review defaults and selected canonical root rules. Its [validation record](rules-validation.json) supplements the historical consolidation validation above. Rule links and explicit consumers are now checked by the repository validator. Plugin packaging was deferred during that phase and is completed below; hook activation remains deferred.

## Subsequent plugin wiring

[KLCode plugin wiring](../plugin/README.md) is implemented for native Windows, with 16 command names, nine role adapters, private marketplace metadata and disabled project hooks. The [plugin validation record](plugin-validation.json) and [task ledger](../docs/plans/plugin-wiring.md) record source/release checks, independent review and native-host limitations. Installation, trust and activation were explicitly excluded by the user's latest instruction.

## Subsequent source-preserving planning imports

The user requested additional, independently callable `spec-driven-development` and `planning-and-task-breakdown` skills with upstream phase approvals, separate spec/plan/task artifacts and inline templates preserved. The current catalog has 105 workflows, including 17 planning skills. Original workflows and all 209 historical consolidation assignments remain intact. Each new skill's SOURCES.md records direct source hashes; the imported Definition of Done is tracked in planning dependencies. Current metadata/exports are distinct from the historical validation and native-discovery records above.

Validation on 2026-10-27: repository structure/links and 117 JavaScript syntax checks passed; package validation and an offline 1,060-file build passed; all 31 plugin/runtime tests passed (the Windows launcher fixture required an unsandboxed rerun); rule audit passed with all 202 upstream fingerprints; Python checked 115 helpers, 120 official skill exports and nine role templates; portability checks passed for all 17 planning skills. Independent read-only review identified and resolved template anchor mismatches. The imported workflows were not executed, and new native discovery or installed-lifecycle validation was not performed.
