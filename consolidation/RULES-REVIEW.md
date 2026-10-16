# Rule integration review

## Agreed policy

The grilling decisions retain one canonical root `rules/` tree, explicit links from applicable skills, an audit across all six reference repositories, and deferred host activation. The following defaults supersede the consolidation's earlier optional-only testing/review policy:

- Test-first development for new testable logic and bug fixes, with documented practical exceptions for documentation, visual exploration, host-bound behavior without an automated seam, and changes where tests add little value.
- An 80% coverage target for new or substantially changed testable code. State the metric, scope and measurement limits; this is not an existing-repository coverage gate.
- Independent review for substantive code changes when delegation is available and authorized; self-review for small, low-risk edits. Sensitive changes require focused security review, with independent-review limits reported honestly.
- Functions over 50 lines, files over 800 lines and nesting beyond four levels prompt assessment rather than automatic failure or extraction.
- Prefer immutability at shared-state/concurrency boundaries; allow deliberate mutation for host APIs, UI models, performance and existing conventions.
- Search local implementations first, consult primary documentation for uncertain APIs, and make external research/dependencies conditional.
- Keep functional accessibility and relevant render checks shared; aesthetic prescriptions remain selected styles. Actual runtimes, frameworks, compilers and project toolchains govern applicability.

## Integrated scope

[Coverage inventory](../rules/coverage.json): 202 upstream source files across six repositories; 70 adapted, 30 incorporated, 5 already covered, 97 excluded. These are file-level dispositions with section-level explanations where adaptation required them, not a claim that every upstream sentence is preserved.

There are 44 selected shared rule files in common, Python, C#, C++, JavaScript/TypeScript, web and conditional React. They have 97 explicit links from 37 canonical skill entrypoints. FastAPI applies only when actually present; React guidance applies to actual React interfaces and Remotion. The 78 rules in other ECC language/framework families remain untouched reference material, outside selected defaults.

The existing Caveman implementation core now lives under `rules/common/`; its support path is a compatibility pointer. Remotion's 28 topic Markdown rules and three TSX assets remain skill-specific. Retained Taste styles remain separate modes. Root installation text no longer assumes ECC installers, agent names or host settings exist here.

Detailed source fingerprints, destinations and rationales:

- [Common audit](rules-common-audit.json)
- [Language, web and React audit](rules-language-web-audit.json)
- [Other-source audit and exclusions](rules-other-sources-audit.json)

The declared discovery-tree check found two additional Matt ADRs. Their hard-versus-soft prerequisite distinction is adapted into development workflow; historical packaging conclusions are excluded from defaults and left for current host verification during packaging.

## Verification and review

Independent review of common policies and integration found a missing React routing entry and false consumer matches in comments/code examples. Both were fixed and rechecked. A separate review of all 33 language/web/React rules found no material omissions or policy contradictions. Authors did not supply the independent verdict on their own rule group.

The rule validator's ten behavioral regressions pass, including missing destinations, invented consumers, examples/comments, unrecorded selected files, duplicate sources, unexplained exclusions, traversal, upstream drift and newly discovered candidates. Intended failures were established before implementing the checks. Node's test coverage reports 90.58% line coverage for the new validator (62.82% branch coverage); this is local structural-check evidence.

See the [rule validation record](rules-validation.json) for final check counts. The repository validator now checks the selected rule documents, glossary, root scripts and rule coverage in addition to its existing inventory/metadata/link/import checks. The optional `--upstream` rule check verifies all recorded source hashes and enumerates candidate files in the declared discovery trees.

## Limits and remaining work

This is a finite file/section audit of relevant named rules, core policies and retained style/topic resources. It does not assert equivalence to every imperative embedded in all upstream scripts, skills, agents or distribution mirrors. Link validation proves paths and explicit consumers; semantic preservation relies on the recorded audit and independent review.

No hooks, background processes, external services or plugin manifests were activated. Project-specific variants and Claude/Codex packaging remain separate. Unselected rule folders must not be installed wholesale. Live Revit, GUI, browser rendering, media and provider behavior were not exercised by this documentation/routing change.
