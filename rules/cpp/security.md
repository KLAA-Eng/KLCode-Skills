# C++ Security

Extends [shared security](../common/security.md).

## Memory and buffers
Prefer RAII containers and smart owning pointers. Raw arrays, malloc/free and casts may be required for C/SDK or hardware boundaries; isolate them, document ownership, validate sizes/lifetimes and match allocators. Avoid unbounded strcpy/strcat/sprintf on untrusted data. Use supported strings and checked formatting; fmt is optional.

## Undefined behavior
Initialize values, check bounds/arithmetic overflow and prevent null, dangling and invalidated access. Containers alone do not prove safe indexing.

## Diagnostics
Use supported compiler warnings and configured analyzers with actual compile flags. clang-tidy/cppcheck are options, not blanket all-check mandates. Address/undefined-behavior sanitizers depend on compiler/platform/host support. Keep ThreadSanitizer in a compatible separate configuration. A scan alone does not prove safety.

Use [C++ development](../../skills/languages/cpp-development/SKILL.md).
