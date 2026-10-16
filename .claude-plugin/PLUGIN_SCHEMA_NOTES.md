# KLCode manifest contract

Use the [official Claude manifest reference](https://code.claude.com/docs/en/plugins-reference) and [marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference) when changing these files. Earlier inherited ECC notes described different manifest shapes and are superseded by this document.

- `plugin/catalog.json` owns package identity, version, repository and command/role routes. Keep the manifest and marketplace aligned with it.
- `skills` explicitly lists the 103 canonical skill folders. Keep supporting resources inside the plugin root.
- `commands` maps 15 aliases to their Markdown sources. The `requirements` canonical skill supplies its own entrypoint; do not add a colliding alias.
- `agents` explicitly lists nine Markdown role adapters. This field is supported by the official manifest schema.
- `hooks` references the additional `./hooks/claude-hooks.json` file. There is no conventional `hooks/hooks.json` to cause duplicate discovery. Do not add a second declaration of the same hooks.
- No MCP server configuration is bundled. Imported optional recipes under `support/` are not automatically registered services.
- The source marketplace points to GitHub. Generated release marketplaces point to the local built package for offline inspection.

From the repository root, run `node plugin/cli.cjs validate` and `node scripts/validate-repo.cjs --syntax`. These are local structural checks. When Claude Code is available, `claude plugin validate .` can provide native validation without installing the plugin; record its actual result separately. This repository has not yet established Claude-native or installed lifecycle behavior.

See the [plugin guide](../plugin/README.md) for Windows prerequisites, hook trust and disabled project configuration.
