# Staging, independent sanitization and public packaging

Adapted from ECC opensource pipeline and forker/sanitizer/packager agents.

## Staging
Resolve private source and a distinct owned staging directory. Enumerate source, ignored/untracked files, generated binaries, credentials and internal fixtures before deciding what to copy. Preserve source history; a new public history can be chosen for staging, but never erase the private repository to obtain a clean public candidate. Preserve license files and dependency notices.

Replace confidential implementation data with safe fixtures/configuration. .env.example contains names and dummy values, never copied secrets. Generic home paths and internal endpoints require context: documented examples differ from real private infrastructure. Do not rewrite every number/IP or delete every .map/agent file mechanically.

## Independent audit
Review candidate source, config, docs, history policy, generated files and assets. The included scanner uses high-signal credential patterns and reports only category/path/line, never values. Unreadable, symlinked, skipped large and binary files remain explicit unreviewed items; a green text scan does not clear their content. Case-specific manual review may use document/image/archive tools without executing target code.

Keep original evidence and stage reports separate from publishable content. Review false positives against realistic dummy examples, never weaken all scanning because a sample matches. Rotate an exposed credential; removing the literal is not revocation. Historical exposure requires authorized history/hosting review.

## Package
Use the actual platform commands and dependency locks; do not force setup.sh on Windows-only tools. Preserve README content, contributor instructions and user-facing startup/prerequisite docs. Provide AGENTS/CLAUDE pointers consistent with existing host conventions, scoped example configuration, license/NOTICE, test entry points and issue templates only where useful.

Return a concrete sanitized artifact, scan coverage, unresolved assets, license/attribution state, exact validation and next publication step. Publishing/private-to-public conversion is a separate consequential action. Do not send messages or create remote repositories through a preparation-only request.
