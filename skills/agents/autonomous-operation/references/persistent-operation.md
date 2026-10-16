# Persistent operating model

Keep a small kernel: intent-to-role routing, available tools, authority limits, and pointers to specialist prompts. Avoid embedding every specialist workflow in the root instruction file. Use the project's existing AGENTS.md/CLAUDE.md conventions and canonical skill paths.

Queue entries need id, task, scope, dependencies, owner, state, attempt count, last result and next permitted action. Use atomic transitions or a single queue owner to prevent duplicate processing. Store structured state in JSON/JSONL and human rationale in Markdown when that fits existing project conventions. A local file store is adequate until concurrency or data volume justifies more infrastructure.

Separate execution truth from memory: task ledger records active work; specs record desired behavior; decisions record durable tradeoffs; knowledge records reusable facts. Native memory or optional graph storage is not a task tracker and is not enabled by this workflow.

Schedules must declare whether they require a live interactive host. External runners require explicit authentication and tool permission configuration. Windows uses an explicitly selected Task Scheduler/CI setup; Linux/macOS timers are platform-specific alternatives, not commands to execute on Windows. Run one bounded dry rehearsal before enabling recurrence when available.

For each run record started/finished/failed, work actually changed, observed checks, pending external effects and resume point. Stop on budget/authority limit, repeated identical failure or unverifiable completion. Recovery freezes new dispatch, preserves artifacts and resumes the smallest failing unit after its cause is understood.
