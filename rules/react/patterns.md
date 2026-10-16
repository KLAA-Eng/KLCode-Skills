# React Patterns

Extends [TypeScript patterns](../typescript/patterns.md), [shared patterns](../common/patterns.md) and [React hooks](hooks.md). Applies only to actual React.

## Composition and state
Separate data/effects from presentation where useful without imposing a container for every component. Keep state local, lift to nearest useful owner, then consider context or existing stores for broad sharing. Profile high-frequency context churn; no store is mandatory.

## Server/client
Only in actual Next.js App Router/RSC: preserve supported server/client boundaries and serializable props, and mark server-only modules with the framework's compatible mechanism. Never pull database clients or secrets into client bundles. These are not requirements for browser-only React or Remotion.

## Loading and errors
Place Suspense boundaries where supported asynchronous rendering benefits the user, with meaningful loading feedback and an appropriate error recovery boundary. Do not require a separate Error Boundary for every Suspense if the framework/ancestor already provides correct coverage. Supported class error boundaries or existing wrappers are valid.

## Forms and data
Controlled inputs suit live interaction/formatting; uncontrolled forms suit appropriate submission flows. Version-specific form actions require actual support, validated inputs and authorization. Existing form/query libraries are options for complexity, not required packages. Effect-based fetch can be valid with cancellation/race handling; reuse existing loaders/cache where beneficial.

## Lists and UI structure
Use stable sibling-unique keys for reorderable lists. Prefer children, slots, render props and compound composition to inheritance. Portals can escape stacking/overflow but need correct focus, labels and dismissal; native dialog/other existing patterns may suffice. Ref-as-prop requires supported React; older versions use forwardRef where needed.

## Scope and reference
Next-specific routing/actions and React Native platform APIs apply only in those stacks, without adding dedicated framework rules automatically. Use [interface development](../../skills/ui/interface-development/SKILL.md) and [accessibility](../../skills/ui/interface-accessibility/SKILL.md).
