# Web Check and Hook Guidance

Extends [shared hooks](../common/hooks.md).

## Deferred activation
No hooks are installed or registered. Claude/Codex lifecycle schemas/settings are separate later work; do not copy upstream illustrative JSON into global settings or assume FILE_PATH is host-supplied.

## Checks
Use repository-owned formatter/lint/stylelint/type-check/build commands where configured. Do not fetch packages or hardcode pnpm for another package manager. Limit fixes to selected files and authorized scope.

## Scheduling
Serialize/debounce costly jobs. Reuse incremental TypeScript data when supported by the real configuration and use a writable ignored cache. Bound duration with a platform-appropriate wrapper; Windows timeout is not GNU timeout. Clean up only child processes this integration owns, never unrelated tsc processes.

## Size and completion
Functions above 50 lines, files above 800 lines or nesting beyond four levels prompt cohesion/complexity review, not a blocking write hook or automatic split. Run relevant final checks; documentation edits need no unrelated production build. Apply format, lint, type checks, tests/build where appropriate and report failures/limits.
