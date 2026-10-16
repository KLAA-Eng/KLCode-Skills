# C# Patterns

Extends [shared patterns](../common/patterns.md).

## API responses
For HTTP APIs preserve established success/error/pagination contracts and safe serialization. Envelopes are optional, not requirements for desktop commands or existing public APIs.

## Repositories
Introduce a repository for a useful persistence boundary; do not wrap every collection or duplicate an ORM automatically. Model actual IDs, results, errors and supported async/cancellation behavior.

## Configuration
Use validated typed configuration at boundaries instead of scattered raw strings. Options binding fits supporting stacks; ordinary settings classes suit older/native apps. required/init members depend on actual compiler/runtime support.

## Dependency injection
Use interfaces at meaningful boundaries and focused constructors. Set lifetimes intentionally: shared singletons must be safe, request scopes apply to web requests, while desktop document/window/transaction scopes have their own lifecycles. Dispose owned resources and avoid capturing shorter-lived services.

Use [dotnet development](../../skills/languages/dotnet-development/SKILL.md).
