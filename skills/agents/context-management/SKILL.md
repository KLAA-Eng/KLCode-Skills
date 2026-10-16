---
name: context-management
description: Curate working context, retrieve task-relevant evidence and preserve restartable handoffs. Use when setting up session context, recovering context quality or explicitly configuring compaction guidance.
---

# Context Management

Load the evidence needed for the active task, preserving the user's decisions and current source of truth. Ordinary context curation does not enable an observer, memory backend or hook.

1. Read project instructions, relevant spec/plan and the files actually involved. Reuse local examples before introducing a pattern.
2. Separate stable conventions from current task state. Keep accepted scope, active error, current implementation and verification evidence available; condense resolved failed attempts and verbose discovery output into conclusions.
3. When a delegated task lacks context, refine retrieval by the missing concept or relationship; stop after three passes and report remaining gaps rather than loading the whole repository. Read [retrieval](references/retrieval.md) for the scoring and query-refinement contract.
4. At a real phase boundary, record accepted scope, the authoritative task ledger, changed files and working-tree state, exact checks/outcomes, and unresolved decisions. Use [session-handoff](../../knowledge/session-handoff/SKILL.md) for a handoff artifact. Preserve existing project conventions; defaults live under docs/plans/ and docs/knowledge/.
5. For live headroom use [context-budget](../context-budget/SKILL.md). Do not infer provider capacity by adding file sizes. Summarize or use native compaction at a useful boundary, preserving unfinished work.

Read [context patterns](references/context-patterns.md) for selective includes, project maps and trust boundaries. If explicitly configuring Claude compaction hints, use the imported [suggestion hook](../../../support/agents/runtime/scripts/hooks/suggest-compact.js) and [activation notes](references/compaction-hook.md). The hook is not installed or enabled by this skill.
