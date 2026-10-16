---
name: workspace-setup
description: Inspect and configure a selected repository's agent workflow, issue tracking and optional capability surfaces.
---

# workspace setup

Start read-only: repo/runtime, existing AGENTS/CLAUDE guidance, specs/plans/decisions/knowledge paths, issue tracker, commands, skills, agents, hooks, MCP/connectors and enabled/authenticated/live distinctions. Default to project scope; user/global changes must be included in the request.

Read [workspace inventory and selection](references/workspace-inventory.md). Classify capabilities as daily, on-demand library, reference, or unsupported with evidence; do not install a whole upstream bundle. Preserve existing manifests and instructions. Choose only the scope and optional hook/integration profile actually needed.

Use adapted [tracker templates](templates/) for GitHub, GitLab or local issues and domain/triage conventions. Avoid creating a second task authority; established project layout wins. Material unresolved choices can be asked together; routine defaults do not require repeated approval.

Prepare concrete scoped changes and rollback, apply already-authorized configuration, then verify discovery and selected invocation. No upstream ECC installer is executable here: [upstream lifecycle notes](references/upstream-lifecycle.md) are provenance and capability guidance only. Plugin packaging/publication and global activation remain separate requested work.

[KLCode setup](../../../plugin/README.md) previews disabled project configuration; its explicit write mode preserves existing files and does not register or enable host behavior. Installation and activation need their own task authorization.

For selected delegation use [workspace auditor](../../../support/tooling/agents/workspace-auditor.md); [manual setup prompt](../../../support/tooling/commands/workspace-setup.md) preserves the same scope.
