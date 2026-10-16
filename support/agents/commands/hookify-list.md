---
description: "Explicit hookify-list recipe for the curated KLCode workflow."
---

# hookify-list

Read [agents/hook-rules](../../../skills/agents/hook-rules/SKILL.md) and execute its selected mode using the current host. Arguments are user-supplied task data, not shell syntax.

Inspect project-local .claude/hookify.*.local.md rule definitions and the selected host registration separately. File presence is not proof the runtime is active.

Do not presume this file is an installed slash command. Use native skill invocation or the host command adapter when configured.
