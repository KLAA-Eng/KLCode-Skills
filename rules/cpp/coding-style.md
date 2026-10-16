# C++ Coding Style

Extends [shared coding style](../common/coding-style.md).

## Standard and naming
Inspect configured standard, compiler, ABI and platform first. Use auto when clear, constexpr and structured bindings where supported. Follow local naming for types, functions, constants, namespaces and members instead of forcing a naming migration.

## Resources
Prefer RAII and explicit ownership. unique_ptr suits exclusive ownership; shared_ptr needs genuine shared lifetime. Use make_unique/make_shared where supported. Nonowning pointers and required C/SDK allocations are valid at explicit boundaries with matching cleanup.

## Formatting
Use the repository's clang-format configuration or existing formatter. Limit formatting to the authorized change.

Use [C++ development](../../skills/languages/cpp-development/SKILL.md).
