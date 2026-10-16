# TypeScript and JavaScript Coding Style

Extends [shared coding style](../common/coding-style.md). Respect runtime, bundler and language targets; JavaScript needs no automatic TypeScript migration.

## Contracts
Type exported functions, public methods, shared models and props in TypeScript. Infer clear locals, extract repeated shapes and follow local interface/type conventions. Interfaces suit extensible objects, aliases unions/tuples/mapped types; string literal unions often suffice without runtime enums. Use helpful JSDoc in JavaScript.

## Safe types and input
Prefer unknown plus validated narrowing to any. Use generics for caller-dependent contracts. Runtime validation is still needed: Zod, existing schema libraries or explicit guards are alternatives, not mandatory dependencies.

## Frameworks
In actual React code define clear prop/callback contracts and follow existing conventions; React.FC is optional. Do not impose React on another stack.

## State and errors
Prefer immutable shared-state updates; spread is shallow. Deliberate local mutation and framework-managed models are valid when effects are controlled. Await work, narrow errors and preserve causes/stacks where supported instead of losing context with generic wrapping.

## Logging
Remove accidental debug output. Console output remains valid for CLIs, browser diagnostics or simple tools; use existing logging and redact secrets rather than adding a library automatically.

Use [interface development](../../skills/ui/interface-development/SKILL.md).
