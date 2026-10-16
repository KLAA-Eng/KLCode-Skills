# Optional local epic/story/sprint mode

Choose this only when the local story model is useful. Its sole task authority is docs/plans/story-ledger/. Do not maintain independent status checkboxes in a second plan or tracker.

The adapted helper is [ledger.js](../../../../support/planning/scripts/story-ledger.js); Node.js 18+ is required. It has no npm dependencies. Paths below refer to a target project root, never the skills repository.

Commands:
- node <absolute-helper> init --root <project>
- node <absolute-helper> allocate --root <project> --epic <slug> --count <n>
- node <absolute-helper> status --root <project>
- node <absolute-helper> apply --root <project> --input <batch.json>
- node <absolute-helper> reconcile --root <project>
- node <absolute-helper> recover --root <project>

Read the helper's validation errors and status before applying a batch. apply consumes JSON with create/update mappings from ledger-relative filenames to Markdown contents. Existing stories move one state at a time: todo -> in-progress -> review -> done. “done” means the task's declared verification and integration condition is evidenced; do not assert remote merge without checking it.

Identifiers: kebab-case epic slug; story <epic>-<positive integer>; sprint <positive integer>. Reject path separators/traversal. Writes must go through the helper for exclusive ID allocation, ownership locks, all-or-nothing transactions and derived epic/sprint tables. Do not edit ledger files around it.

Requires one writable hardlink-capable filesystem (NTFS/ext4/APFS typical; FAT/exFAT unsuitable). Never override a live lock. Inspect pending recovery and obtain appropriate direction before destructive manual recovery; recover only restores owned transaction files. Preview material revisions to existing plans instead of silently overwriting them.

If external tracking later replaces this mode, export once, record the destination and stop updating local state; do not synchronize two competing authorities.
