# Local Markdown issue/task authority

Use the repository's established local tracker when one exists. Otherwise keep accepted requirements in docs/specs/<feature>.md and one authoritative implementation plan/task ledger in docs/plans/<feature>.md.

Each task row or section has a stable ID, outcome, acceptance, dependencies, status, owner/claim and evidence links. Comments/decisions append to the relevant task or linked knowledge artifact; do not maintain a second status list in separate ticket files by default.

Fetching a ticket means reading its task section and linked spec. Publishing locally means updating this authoritative ledger within the requested scope, not creating a remote issue. A task becomes ready when its dependencies are completed and it is unclaimed; claim before implementation when multiple actors share it.

Decision exploration can keep a selected map in docs/plans/ or docs/knowledge/ and link investigation evidence, but the map must not duplicate execution state owned by the task ledger. Existing tracker-specific metadata and locations take precedence over these defaults.
