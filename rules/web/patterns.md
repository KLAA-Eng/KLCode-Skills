# Web Patterns

Extends [shared patterns](../common/patterns.md).

## Composition
Compose related state and interaction semantics. Compound components/context, slots and render props are conditional framework options. Keep keyboard/ARIA/focus in the interaction layer. Separate effects/loading from presentation where useful without forcing extra components.

## State
Distinguish server, client, URL and form state. Use existing libraries or simple native mechanisms; TanStack Query, SWR, tRPC, Zustand, Jotai and form packages are examples, not dependencies to install. Derive computed values and avoid duplicating authoritative state.

## URLs
Use URLs for appropriate shareable filters, sorting, pagination, tabs and queries. Exclude secrets/sensitive data and respect embedded-host navigation.

## Loading and writes
Use stale-while-revalidate only where staleness is acceptable; avoid cross-user cache leakage. Optimistic writes need rollback and visible errors. Load independent data in parallel, avoid waterfalls and prefetch only when justified.

Use [interface development](../../skills/ui/interface-development/SKILL.md).
