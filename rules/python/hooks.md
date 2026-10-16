# python Check and Hook Guidance

Extends [shared hooks](../common/hooks.md).

## Deferred activation
These checks are not registered hooks or instructions to modify global Claude/Codex settings. Host lifecycle configuration is a later phase. Use existing local commands manually now; event schemas, payload parsing, quoting and permissions must be verified for actual integration.

## Applicable checks
Use configured compatible formatting/linting (Black, Ruff or isort where appropriate), type checks and focused tests. Modern-only tooling does not prove IronPython host behavior. Identify accidental print debugging while preserving intentional CLI/host output.

## Scheduling
Prefer changed-file formatting and focused checks, followed by relevant final build/tests. Serialize or debounce costly jobs, bound duration and report failures. Do not download dependencies or apply broad fixes implicitly.
