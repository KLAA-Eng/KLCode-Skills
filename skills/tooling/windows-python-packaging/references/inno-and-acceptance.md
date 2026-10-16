# Inno Setup and target-machine acceptance

Adapted from ECC generating-python-installer.

Use a stable per-product AppId for upgrades, consistent product/version/publisher identity, an architecture compatible with Python/native/vendor dependencies, and a chosen per-user/per-machine installation scope. Signing keys and installer publication remain separate authorized operations. The included app.iss template requires actual product values before compilation.

Prefer safe install/uninstall behavior: install owned application files to the chosen app directory and let Inno's tracked file list remove them. Do not use a blanket {app} wildcard uninstall deletion when users may save content there. User data/preferences/projects belong in documented per-user data locations and survive upgrade/uninstall unless removal was explicitly selected.

Optional desktop shortcuts and launch-after-install should be user choices. Silent installs must not pop an interactive app. Avoid adding elevated privileges merely to write user data. Detect/prerequisite-check required vendor software rather than pretending a bundled Python runtime supplies it.

Clean-machine acceptance should cover fresh install, launch from shortcut and executable, dynamic resources/imports/plugins, external-file access, spaces/non-ASCII paths, relevant Windows versions/DPI, upgrade from a previous build, repair/reinstall as applicable, uninstall, and preserved user data. Record artifact hash/version/architecture and what was actually run.

Size wins require after-measurement with functional proof. Report total distribution and installer size, cold/warm launch, dominant DLLs/assets and deliberate feature exclusions; do not promise source case-study percentages or compare mismatched architectures as if equivalent.
