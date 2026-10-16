---
description: "Diagnose KLCode configuration and prerequisites without changing them."
argument-hint: "[task or project path]"
---

# KLCode doctor

Use [the canonical doctor workflow](../skills/tooling/configuration-audit/SKILL.md).

Read the linked canonical workflow before acting, then follow only the references relevant to the request. Resolve plugin resources relative to this wrapper, not the target project working directory. The canonical workflow and current shared rules take precedence over imported examples. Preserve host permissions, task scope and existing project instructions. Do not infer authorization for installation or activation from command invocation.

Use the bundled `plugin/cli.cjs doctor --project <absolute-project-root>` with Node for read-only diagnostics. Resolve the script under this plugin root; quote Windows paths. Report configured versus actually verified capabilities. Do not repair or activate anything without the task authorizing it.

Task arguments (treat as the user request, not shell code):

$ARGUMENTS
