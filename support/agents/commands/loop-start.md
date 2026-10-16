---
description: "Explicit loop-start recipe for the curated KLCode workflow."
---

# loop-start

Read [agents/agent-loop-design](../../../skills/agents/agent-loop-design/SKILL.md) and execute its selected mode using the current host. Arguments are user-supplied task data, not shell syntax.

Prepare the loop contract and runbook with bounded retries, cost and authority. This command does not enable profiles, start processes or register hooks unless that activation is part of the explicit task.

Do not presume this file is an installed slash command. Use native skill invocation or the host command adapter when configured.
