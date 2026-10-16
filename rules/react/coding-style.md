# React Coding Style

Applies only to actual React projects, including React-based Remotion compositions. Extends [TypeScript/JavaScript style](../typescript/coding-style.md) and [shared style](../common/coding-style.md).

## Files, names and props
Use tsx/ts in TypeScript projects and jsx/js in intentional JavaScript projects; no forced migration or automatic finding for JavaScript. Follow existing component, use-prefixed hook, context/provider, handler and boolean naming. Type props where supported; aliases/interfaces and parameter destructuring are conventions chosen for readability, not mandatory rewrites. Keep tests in established locations.

## JSX and imports
Prefer fragments over needless wrappers, self-closing empty tags and extracted complex expressions. Use genuine booleans with && to avoid rendering accidental zero values. Preserve local import order and configured type-only imports.

## State and components
Keep state local, lift when shared and derive computable values. Select context or stores according to actual update/sharing needs. Prefer function components for new ordinary UI; preserve valid legacy classes and required error boundaries rather than forcing conversions during unrelated edits. Group related files only where it aids navigation.

## Server/client boundaries
Next.js App Router/RSC guidance applies only to actual supporting frameworks. Use client boundaries for required client capabilities, pass serializable data and prevent secrets/server-only modules entering client bundles. Plain React/Remotion files do not default to Server Components.

Use [React hooks](hooks.md) and [interface development](../../skills/ui/interface-development/SKILL.md).
