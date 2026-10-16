# Version identity, release history, and recovery

Adapted from agent-skills git-workflow-and-versioning and ECC git-workflow. Repository release rules take precedence.

## Separate version axes

Choose the product bump from observable compatibility and user impact. A breaking change, compatible feature, and compatible fix conventionally imply major/minor/patch, but pre-1.0 and channel policies belong to the project. Public schema, bridge protocol, dependency/host API and per-tool versions may move independently; do not bump all of them merely to make numbers match.

Find the authoritative source before editing mirrors or generated metadata. Change version, changelog, generated build identity and validation contracts coherently. A metadata source revision may differ from the eventual squash-merge revision; preserve that distinction in provenance.

## History evidence

Explain behavior and migration implications in release notes. Connect relevant issues and commits without assuming every commit is a user-visible feature. Preserve deprecated channels/tags and published compatibility commitments. Preparing notes/version changes does not authorize tag creation, publication, PR merge or changing branch protections.

## Recovery

Before a risky local history operation, inspect status, branch, upstream, untracked files and relevant staged/unstaged changes. Use a separate worktree or a named temporary branch when exploration could disturb user work. A stash can omit untracked files and may mix unrelated work; inspect what it saves and avoid using it as an automatic cleanup step.

Use reflog to locate a known commit and inspect it before resetting or restoring. For a published error, a reviewed revert often communicates intent better than rewriting shared history. Reverting a migration commit does not necessarily reverse persisted data; use the documented recovery/migration procedure.

After conflict resolution verify affected behavior and inspect staged content before the meaningful local milestone commit. Do not delete worktrees or branches merely because a command failed: confirm ownership and preserve any unique work.
