---
description: "Save verified context for another session or agent."
argument-hint: "[task or project path]"
---

# KLCode handoff

Use [the canonical handoff workflow](../skills/knowledge/session-handoff/SKILL.md).

Read the linked canonical workflow before acting, then follow only the references relevant to the request. Resolve plugin resources relative to this wrapper, not the target project working directory. The canonical workflow and current shared rules take precedence over imported examples. Preserve host permissions, task scope and existing project instructions. Do not infer authorization for installation or activation from command invocation.

Task arguments (treat as the user request, not shell code):

$ARGUMENTS
