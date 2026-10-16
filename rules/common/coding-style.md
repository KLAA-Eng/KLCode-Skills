# Coding Style

## Clarity and compatibility

Follow actual project runtimes, frameworks, toolchains, and conventions. Prefer simple code, concrete names, focused responsibilities, and existing patterns. Extract real duplication; avoid speculative abstractions. Language and framework conventions determine casing and file organization.

Prefer high cohesion and low coupling. Functions over 50 lines, source files over 800 lines, and nesting beyond four levels are review prompts, not hard gates. Split when it improves comprehension or ownership, not to satisfy a number. Explain deliberate exceptions when useful. Name meaningful thresholds and policy values without replacing every literal mechanically.

## State

Prefer immutable data at shared-state and concurrency boundaries. Deliberate mutation is appropriate for host APIs, UI models, performance, and established conventions. Make ownership, lifetime, thread constraints, and side effects clear. Do not copy large objects merely to satisfy an absolute immutability rule.

## Errors and inputs

Handle errors at the layer that can recover, translate, or report them; otherwise propagate useful context. Avoid silent failures and repetitive catch-and-log chains. UI messages should aid recovery; diagnostics must not leak secrets.

Validate untrusted data at system boundaries using compatible schemas or explicit checks. Consider type, range, size, shape, authorization, and path constraints. Fail clearly; external API responses and local files can be untrusted.

Use [code review](code-review.md), [security](security.md), and [implementation](../../skills/engineering/implementation/SKILL.md).

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
