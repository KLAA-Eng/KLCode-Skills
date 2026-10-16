# React Hooks

These are React state/effect APIs, not Claude/Codex lifecycle hooks. Applies only to the installed React version. Extends [TypeScript patterns](../typescript/patterns.md) and [shared patterns](../common/patterns.md).

## Order and dependencies
Call ordinary hooks at the top level of components/custom hooks in consistent order, before conditional returns. Respect supported React use() semantics separately; do not generalize its conditional behavior to other hooks. Use existing compatible hooks linting and include reactive dependencies; explain any justified suppression.

## Effects and cleanup
Use effects to synchronize external systems. Compute derived state during render, notify parents from relevant handlers and avoid effects solely for unnecessary transformations/resets. Clean up subscriptions, listeners, timers and requests; abort or ignore stale results and handle rejection. Module initialization must respect SSR, tests and multiple roots rather than forcing global singletons.

## Memoization and extraction
Memoize only for useful identity guarantees or measured expensive work, accounting for the existing compiler/runtime. Extract hooks for coherent reusable or independently testable behavior; a single caller is not an automatic prohibition. Avoid trivial wrappers that hide intent.

## State and refs
Use lazy expensive initializers and functional updates when based on prior state. Group state by actual transitions; reducers suit complex transitions, not a mandatory three-field threshold. Refs hold imperative handles or nonrender state; avoid unsafe reads/writes during render and preserve supported initialization exceptions. Handle stale closures through dependencies, functional updates or synchronized refs.

## External stores and versions
Use compatible subscription APIs such as useSyncExternalStore where appropriate, with stable snapshots, cleanup and meaningful server snapshots. React 19 use/action/status/optimistic APIs and ref-as-prop patterns require matching React/framework support; useTransition exists in earlier supported versions too. Do not upgrade the framework to match examples.

Use [React testing](testing.md).
