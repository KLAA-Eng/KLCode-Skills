---
description: "Preview and diagnose project hook configuration without activating hooks."
argument-hint: "[task or project path]"
---

# KLCode hooks

Use [the canonical hooks workflow](../skills/agents/hook-rules/SKILL.md).

Read the linked canonical workflow before acting, then follow only the references relevant to the request. Resolve plugin resources relative to this wrapper, not the target project working directory. The canonical workflow and current shared rules take precedence over imported examples. Preserve host permissions, task scope and existing project instructions. Do not infer authorization for installation or activation from command invocation.

Begin with the bundled `plugin/cli.cjs setup --project <absolute-project-root>` preview or `plugin/cli.cjs doctor --project <absolute-project-root>` diagnostics. Resolve the script under this plugin root and quote Windows paths. Do not register hooks, enable configurations, create Hookify rules, or launch services merely because this shortcut is selected. Hookify authoring is a separate explicit mode; bundled Node hooks do not require Hookify. Analytics, learning and observers remain opt-in.

Task arguments (treat as the user request, not shell code):

$ARGUMENTS
