# Upstream lifecycle provenance and scoped setup

The original configure-ecc skill invokes an upstream conversational installer and native plugin lifecycle. Those installers assume the full ECC repository and are intentionally not active dependencies of this curated collection. Do not download/install the upstream bundle or execute its installer to complete KLCode setup.

Retain the useful lifecycle: inventory → collect material scope/profile choices → show concrete changes → apply authorized selections → verify actual discovery/invocation and recovery. Current host official support and existing installed capabilities determine the integration. An imported prompt file does not mean a command or hook is registered.

Scope choices: selected project files, user-level configuration, and machine/global installs have different blast radii. Default requested project work remains project-scoped. Optional hooks/integrations remain disabled until explicitly selected. A native plugin lifecycle should be used only when the current platform supports the final packaged KLCode artifact; packaging/publication is a later task.

repo-scan is also an optional external tool, not bundled. Use native file/search/manifests for a local inventory first; if requested, review the tool's exact source/version and dependencies before installation. No remote installer is necessary for workspace setup.
