# Explicit observation setup

Keep hooks/observe.sh, scripts/detect-project.sh, scripts/lib/homunculus-dir.sh and agents/ together. The observer scripts find the skill from their own location; all paths must resolve to this canonical directory. No installation is presumed.

Use CLV2_HOMUNCULUS_DIR as an explicit absolute data directory when choosing an isolated project observation store. The compatibility default remains XDG_DATA_HOME/ecc-homunculus or ~/.local/share/ecc-homunculus; this is a learning data store, not a task ledger. The environment variable and legacy directory names are upstream storage compatibility identifiers.

Project detection uses explicit CLAUDE_PROJECT_DIR, then normalized Git remote, then root path. Remote credentials are stripped before hashing. Verify scope before promoting patterns. Logs may contain private code or behavior even after best-effort redaction; keep collection bounded to authorized projects, and inspect exports.

The background observer is disabled in config.json. Explicitly selected activation uses the inert support hook recipe after substituting an absolute path. Do not add duplicate pre/post registrations or reuse undefined CLAUDE_PLUGIN_ROOT substitutions. Inspect scripts with --help and run fixture tests before selecting observation. There is no cross-host auto-registration.

Scripts/instinct-cli.py handles status/import/export/evolve/promote/projects/prune; export and promotion are separate actions. The bundled parser tests exercise instinct parsing. Evolve produces draft reusable behavior, not approval to change project policy.
