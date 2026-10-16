# cpp Check and Hook Guidance

Extends [shared hooks](../common/hooks.md).

## Deferred activation
These checks are not registered hooks or instructions to modify global Claude/Codex settings. Host lifecycle configuration is a later phase. Use existing local commands manually now; event schemas, payload parsing, quoting and permissions must be verified for actual integration.

## Applicable checks
Use configured formatting, analysis with actual compile flags, build and tests. clang-format, clang-tidy, cppcheck, CMake and CTest are options only where installed/configured. Do not hardcode -std=c++17 or incomplete globs; use the real compilation database and supported sanitizer configuration.

## Scheduling
Prefer changed-file formatting and focused checks, followed by relevant final build/tests. Serialize or debounce costly jobs, bound duration and report failures. Do not download dependencies or apply broad fixes implicitly.
