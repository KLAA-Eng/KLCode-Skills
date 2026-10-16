# Engineering consolidation handoff

Completed all 22 canonical skills in the manifest under `skills/engineering/`. Historical collections and other categories remain unchanged. No staging, commits, remote actions, package installation, or hook/command/agent registration were performed.

## Delivered behavior and resources

- Core workflows: implementation, debugging, test-first-development, code-review, refactoring, verification, commit-preparation, git-workflow, application-security, performance-optimization, and release-readiness.
- Specialists: interface-design, migration, observability, test-governance, connector-development, contract-collaboration, browser-testing, desktop-testing, mcp-development, llm-cost-optimization, and data-collection.
- 37 focused reference documents retain substantial useful source patterns: test design/mocking/parity, click-path state auditing, dual-axis/fresh-context review, interface/idempotency/REST semantics, schema compatibility, UIA/Qt/isolation/DPI/artifacts, Playwright/live QA, security/process/path boundaries, caching/data accounting, observability, source collection, and requested convention extraction/incremental updates.
- 11 adapted agent definitions: implementer, integration coordinator, standards/spec reviewers, test-first guide, build resolver, refactor/security/performance reviewers, browser runner, desktop runner.
- Five manual command templates: review, verify, coverage, browser QA, and build fix.
- Six scripts: Matt's adapted observation-only Bash HITL template; owned-process Python UIA helpers and fixture example; read-only Node package-manager/runner detector; offline prompt-cache calculator; offline integration checker.
- Native architecture/simplicity core, test-registry template, source notices for every canonical skill, Matt PR attribution, and five preserved upstream license notices.

The category contains 111 files including its dependency inventory; `support/engineering/dependencies.json` inventories the other 110 by original source, consumer, role, activation, external prerequisite and validation. Source paths are provenance, not runtime dependencies. Local references resolve inside the grouped repository.

## Adaptation decisions

Proportional rigor replaces universal 80% coverage, mandatory TDD for ordinary work, user approval of every seam, repeated unchanged green checks, and test-stage commits. Meaningful verified local implementation milestones are the commit boundary. Review keeps standards and requirements verdicts separate. Delegation is optional and selected; prompts do not recurse or force a model.

Native/host concerns are explicit: IronPython versus CPython, framework/target differences, real click/command order, Revit/Excel/vendor effects, UIA property verification, per-test filesystem/process ownership, and GPU/device availability. Synthetic/headless/simulator evidence never implies live-host acceptance. Potentially dangerous upstream blanket descendant-process cleanup was replaced with owned-process cleanup. CI desktop examples use an explicitly provisioned interactive host.

Cloud/model/provider choices remain conditional. Removed fixed model names, unsupported pricing/free-tier promises, ECC-Tools sibling-repo switching, and unnecessary wallet/trading examples. Cache arithmetic stays offline; live provider usage needs current documentation and authorized traffic. MCP SDK examples are version-dependent and do not force Node on C# implementations.

## Validation performed

- Official skill-creator `quick_validate.py` passed for all 22 skills using Python 3.14, PyYAML and UTF-8 mode.
- Node 24.21.0 `--check` passed for all three delivered CJS scripts.
- `node support/engineering/scripts/check-offline.cjs` passed: exact 22-skill mapping, frontmatter names, local Markdown links/fences, inventory file/source existence, cache arithmetic, and detector behavior for non-Node, Bun, conflicting locks, declared manager and malformed manifest cases.
- `node skills/engineering/llm-cost-optimization/scripts/cache-cost.cjs --self-test` passed: cached reuse, storage cost, one-off write premium, invalid counters/rates.
- Python AST passed for both Python files. Offline UI helper checks passed for actual artifact write, nested/traversal/non-PNG rejection, satisfied predicate and timeout behavior. Used `-B`; no repository bytecode cache was created.
- Policy scan found no retained mandatory 80% rule, per-test checkpoint commits, mandatory seam-approval rule, persona mode, fixed Gemini/model chain or free-tier promise.

## Remaining external/runtime limits

Actual Windows UIA/pytest GUI journeys, Revit/Excel/vendor/GPU acceptance, browser suites, MCP clients, provider traffic and interactive Bash HITL were not executed. They require the selected target app/session/runtime and authorized fixtures; they are not needed for the completed local consolidation checks. Optional examples name their external packages rather than pretending those packages are bundled.

The integrator can run the offline checker after deleting historical collections: it validates provenance against the untouched sibling reference repositories, while runtime links stay canonical. Final plugin lifecycle wiring remains a later repository-level task.
