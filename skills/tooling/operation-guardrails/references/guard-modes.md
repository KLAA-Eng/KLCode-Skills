# Supplemental guard modes

Adapted from ECC safety-guard/GateGuard and Matt Git guardrails.

The adapter is disabled by default. Set KLCODE_GUARD_MODE explicitly for a manually selected profile. Native host permissions remain authoritative. A regular expression or first-touch state file cannot prove user approval, prevent every shell escape, or replace a sandbox.

| Mode | Behavior |
|---|---|
| off | Pass without creating state |
| careful | Inspect shell command for the imported destructive classification |
| freeze | Constrain known Edit/Write/MultiEdit/NotebookEdit target paths to KLCODE_GUARD_ROOT |
| guard | Careful plus freeze |
| facts | Imported GateGuard first-touch investigation workflow, scoped local state |
| strict-git | Conservative Matt-style block of git push and destructive Git variants |

Freeze handles resolved existing targets and nearest existing parents. Path checks should reject traversal, sibling-prefix matches and symlinks escaping the selected root. It cannot constrain arbitrary shell writes: native sandbox permissions must cover shell tools. Unknown tool payload shapes require review, not a false claim of full coverage.

## Fact gating
The included runtime closure preserves class-aware questions for instruction, test, prose, config and code targets. Code asks actual callers/importers, affected public API, relevant data schema and current user instruction. Existing search evidence may earn credit. Sensitive/hard-linked targets have stricter treatment. Comment-only changes and sibling batches can behave differently; inspect partial application after a denial.

A denied first attempt may mark the target checked so later attempts pass. That retry is not verification that the facts were supplied correctly. The mode nudges investigation, not correctness certification.

Selected facts mode uses a local .klcode/gateguard state directory unless GATEGUARD_STATE_DIR is explicitly supplied. Metrics are opt-in and omit raw paths/commands. State failures can fail open with a warning; do not describe this mode as a fail-closed security boundary. Routine command gating is disabled by the adapter unless explicitly chosen to avoid blocking ordinary validation.

Do not copy an upstream all-hooks settings file. Merge the specific selected host hook only after reviewing its exact event, command, timeout and state paths. No global installation occurs during skill use.
