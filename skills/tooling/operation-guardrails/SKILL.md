---
name: operation-guardrails
description: Configure optional destructive-command, write-scope, or first-touch fact gates for agent tool use.
---

# operation guardrails

Identify the host's native permissions and the user's selected protection. Modes: careful flags destructive operations; freeze confines Edit/Write paths; guard combines both; facts uses the imported GateGuard investigation prompts; strict-git can forbid all pushes and destructive Git patterns. These are supplemental heuristics, not a security sandbox or proof of user approval.

Read [guard modes and limitations](references/guard-modes.md). The executable [guard adapter](../../../support/tooling/hooks/operation_guard.cjs) is off unless explicitly configured. It includes the upstream GateGuard [runtime closure](../../../support/tooling/runtime/scripts/hooks/gateguard-fact-force.js), not a dangling hook reference. Fact mode state is project-local and metrics are optional. A denial/retry is not evidence that the requested facts are correct; inspect changed files after partially applied parallel batches.

Scope state/config to the selected project, preserve existing permissions, and explain the protected operations and false-positive/escape limits. Test allowed and denied representative inputs offline before an explicitly requested enablement. Hooks do not grant remote publication, destructive changes, or extra directories. Do not install globally or activate a mode as a consequence of reading this skill.

Apply the relevant shared rules: [common / security](../../../rules/common/security.md).

Apply the relevant shared rules: [common / hooks](../../../rules/common/hooks.md).
