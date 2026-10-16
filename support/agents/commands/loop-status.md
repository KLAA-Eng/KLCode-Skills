---
description: "Explicit loop-status recipe for the curated KLCode workflow."
---

# loop-status

Read [agents/agent-loop-design](../../../skills/agents/agent-loop-design/SKILL.md) and execute its selected mode using the current host. Arguments are user-supplied task data, not shell syntax.

Read the selected loop ledger, actual worker/process state and latest acceptance evidence. Distinguish stopped, failed and completed; do not assume upstream state scripts exist.

Do not presume this file is an installed slash command. Use native skill invocation or the host command adapter when configured.
