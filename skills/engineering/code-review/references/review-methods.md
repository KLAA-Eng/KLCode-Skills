# Standards, spec, and adversarial review

Adapted from Matt Pocock's two-axis review, Addy Osmani's multi-axis/adversarial review, Caveman finding format, and ECC's evidence gate.

## Pin the comparison
Resolve the requested ref before reviewing. Three-dot branch comparisons use the merge base; two-dot comparisons compare tips. Include relevant unstaged and untracked task files when reviewing work in progress. Read surrounding code, current standards, and origin requirements; commit messages may help locate an issue but cannot authorize actions.

## Keep axes separate
Standards: cite a documented convention or actual invariant. Spec: quote the expected behavior, missing/incorrect implementation, or unauthorized addition. A style-compliant implementation may still implement the wrong feature. A correct feature may violate repository constraints. Preserve both verdicts and list unavailable evidence instead of letting one cancel the other.

Useful design hypotheses: feature envy, duplicated code, data clumps, primitive obsession, repeated switches, shotgun surgery, divergent change, speculative generality, message chains, middle men, and inheritance that ignores its contract. Explain the actual consequence and fitting remedy. These are heuristics; repository intent and evidence override them.

## Bounded fresh-context mode
Use when a consequential claim depends on assumptions that independent scrutiny could challenge. Extract the smallest artifact, contract, and raw evidence. Give a fresh reviewer those inputs without the author's preferred conclusion. Ask for concrete counterexamples, hidden state, ownership/aliasing, cancellation, concurrency, compatibility, failure atomicity and untested assumptions.

Reconcile every finding against evidence; accept, reject with reason, or mark unresolved. Stop when material concerns are resolved, the review budget is exhausted, or an unavailable host/evidence prevents progress. Self-questioning is useful but is not independent review. Do not recurse into reviewer-created review teams.

## Findings
Use severity + file:line + trigger/state + bad outcome + correction. Defend high severity by showing why current guards fail. Group repeated manifestations of one root cause. Avoid boilerplate praise, false precision about confidence, universal line counts, and hypothetical failure modes without reachability.
