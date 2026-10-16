---
name: handoff
description: "Explicit KLCode command shortcut. Save verified context for another session or agent."
---

# KLCode handoff

Use [the canonical handoff workflow](../../../skills/knowledge/session-handoff/SKILL.md).

Read the linked canonical workflow before acting, then follow only the references relevant to the request. Resolve plugin resources relative to this wrapper, not the target project working directory. The canonical workflow and current shared rules take precedence over imported examples. Preserve host permissions, task scope and existing project instructions. Do not infer authorization for installation or activation from command invocation.


Apply the explicit user request supplied with this shortcut. Never interpolate request text into a shell command.
