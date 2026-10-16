# csharp Check and Hook Guidance

Extends [shared hooks](../common/hooks.md).

## Deferred activation
These checks are not registered hooks or instructions to modify global Claude/Codex settings. Host lifecycle configuration is a later phase. Use existing local commands manually now; event schemas, payload parsing, quoting and permissions must be verified for actual integration.

## Applicable checks
Use configured format/analyzers, the actual dotnet/MSBuild configuration and relevant tests. dotnet test --no-build requires a successful matching build; preserve exit codes and avoid stale assemblies. Check changed appsettings for credentials without assuming every setting is secret. Native/host checks may require manual execution.

## Scheduling
Prefer changed-file formatting and focused checks, followed by relevant final build/tests. Serialize or debounce costly jobs, bound duration and report failures. Do not download dependencies or apply broad fixes implicitly.
