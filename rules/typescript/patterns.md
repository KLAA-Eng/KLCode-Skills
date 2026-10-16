# TypeScript and JavaScript Patterns

Extends [shared patterns](../common/patterns.md).

## APIs
Preserve the actual contract; success/data/error/meta envelopes are options for new APIs. Model pagination and failure states and validate external responses.

## UI hooks
Use React custom hooks only when React is present and shared behavior warrants them. Debounced timers need cleanup on dependency changes/unmount; avoid stale closures. Other frameworks use their own lifecycles or ordinary functions.

## Persistence
Use repository interfaces only for useful data boundaries. Model real IDs, not-found results, filters and errors rather than forcing generic CRUD or duplicating existing clients.

Use [interface development](../../skills/ui/interface-development/SKILL.md).
