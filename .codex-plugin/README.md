# KLCode for Codex

This directory contains KLCode's native Codex plugin manifest. The repository is [KLAA-Eng/KLCode-Skills](https://github.com/KLAA-Eng/KLCode-Skills).

The manifest exports 105 canonical skills and 15 explicit shortcut aliases, plus four optional hook events. Nine Codex role TOML files are unregistered templates. No MCP servers or cloud services are bundled as defaults.

See the [shared plugin guide](../plugin/README.md#install-from-github-later) for GitHub installation commands, desktop guidance, prerequisites and activation boundaries. The marketplace is named `klcode-team`; its plugin is `klcode`. Installation and hook activation have not been performed as part of repository validation.

The [native validation helper](../plugin/native-validate.cjs) uses an isolated temporary home and a generated local release catalog. It does not install, enable or trust the plugin. Read the [recorded host capabilities](../plugin/host-capabilities.json) for the distinction between parser discovery and installed lifecycle checks.
