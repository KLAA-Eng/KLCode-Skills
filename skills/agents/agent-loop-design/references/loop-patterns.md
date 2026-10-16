# Choosing a loop structure

**Sequential:** isolate discovery/implementation/review/verification prompts as warranted, passing scope and state through project artifacts. Fresh sessions reduce author anchoring but lose implicit context, so include exact current task and evidence. Commit at meaningful verified milestones, not each phase.

**Review-driven PR loop:** implement an accepted task, review, verify and optionally open/update a PR when remote work is authorized. Cap iterations, runtime and cost. CI failure recovery must read the actual run/log and avoid reopening duplicate PRs. External actions need idempotent identifiers and explicit status readback.

**Dependency DAG:** decompose an RFC into independently checkable units; choose narrower checks for local changes and broader review for cross-module invariants. Give workers isolated branches/worktrees and clean reviewer context. A sequential merge queue rechecks integration; conflicting work is revised/rebased, not silently dropped. Stop dependent tasks when a prerequisite changes.

**Exploratory generation:** assign non-overlapping candidate spaces or variation dimensions rather than asking identical agents for novelty. Bound candidate count and select against the same rubric. More samples are not proof of correctness. Retain provenance and reject duplicate/invalid candidates.

**Generator/evaluator:** separate creation from judgment using an explicit rubric and executable gates where available. Capture failure feedback for the next attempt. Don't let the generator edit the acceptance fixture to make itself pass. The agent-evaluation workflow ships local task-record/capsule tooling; external loop frameworks are optional prerequisites, not bundled capabilities.

**Repeated rollout ledger:** append trial id/time, prior winner, fresh evidence, search space, model/heuristics, actual/effective trial count, candidate marks, coherence checks and promotion result. Mark uncertain conclusions as such. Correlated rollouts do not multiply independent evidence. Ledger confidence never auto-approves deploys, destructive changes or financial actions.
