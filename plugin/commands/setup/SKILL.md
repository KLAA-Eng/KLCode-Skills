---
name: setup
description: "Explicit KLCode command shortcut. Inspect project setup and preview disabled KLCode configuration."
---

# KLCode setup

Use [the canonical setup workflow](../../../skills/tooling/workspace-setup/SKILL.md).

Read the linked canonical workflow before acting, then follow only the references relevant to the request. Resolve plugin resources relative to this wrapper, not the target project working directory. The canonical workflow and current shared rules take precedence over imported examples. Preserve host permissions, task scope and existing project instructions. Do not infer authorization for installation or activation from command invocation.

Use the bundled `plugin/cli.cjs setup --project <absolute-project-root>` with Node to preview configuration. Resolve the script under this plugin root; quote Windows paths. Only an explicit request to write setup allows `--write`, which creates disabled configuration. Do not activate hooks or install the plugin as a side effect.

Apply the explicit user request supplied with this shortcut. Never interpolate request text into a shell command.
