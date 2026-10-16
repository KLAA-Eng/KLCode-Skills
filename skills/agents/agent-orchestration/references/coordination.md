# Parallel lanes and durable handoff

Before fan-out define a compact lane matrix: owner, task, dependencies, write surface, risk and proving check. Mark lanes parallel, sequential or gated. Read-only repository scans and independent checks can share a checkout. Conflicting writes must not.

For multi-session work extend the existing ledger with ready/running/review/blocked/done, owner, branch/worktree, evidence and next action. One ledger is the execution truth. A control pane may display that state; it must not become another independently edited status system.

Workers return changed paths, what they verified, failures, unresolved decisions and integration notes. No agent claims another worker's check was run without a recorded result. A blocker invalidates dependent lanes, not all independent work. Poll long-running jobs deliberately and stop owned processes when their authorized work ends.

The integrator checks scope overlap, actual diffs and relevant acceptance paths before merging. Reject completion claims based solely on process exit, test counts or empty diffs. Resolve conflicting interpretations explicitly. Worktree isolation prevents file clobbering, not semantic conflicts or shared service/database mutations.
