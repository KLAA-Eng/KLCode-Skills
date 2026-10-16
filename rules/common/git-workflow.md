# Git Workflow

Inspect branch, worktree, upstream, contribution rules, and existing edits. Preserve unrelated changes and the project's branch/release model.

## Local milestones

Commit meaningful verified milestones during authorized implementation, not every red/green stage. Stage task-owned paths or hunks and inspect the staged diff. Diagnose failed checks rather than bypassing them. Follow repository message conventions; absent one, use a concise type and description: feat, fix, refactor, docs, test, chore, perf, or ci. Respect configured attribution without changing global settings.

## Remote actions

When PR creation is in scope, review full branch history and the merge-base diff. Explain the problem, resulting behavior, actual validation, pending checks, and material limits. Follow repository templates and target-branch policy. Establish the upstream when pushing a new authorized branch.

Pushes, PR publication/merge, tags, releases, and published-history rewrites follow existing task authorization. Never discard user work merely to clean the tree.

Read [development workflow](development-workflow.md), [commit preparation](../../skills/engineering/commit-preparation/SKILL.md), and [Git workflow skill](../../skills/engineering/git-workflow/SKILL.md).

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
