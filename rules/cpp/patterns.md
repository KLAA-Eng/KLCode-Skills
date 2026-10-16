# C++ Patterns

Extends [shared patterns](../common/patterns.md).

## RAII
Tie memory, locks, files and native handles to scoped owners; check acquisition failure and pair resources with the correct deleter without changing required ABI contracts.

## Rule of Zero/Five
Prefer standard owning members and Rule of Zero. When custom lifetime/copy/move behavior is needed assess all five special members, explicitly implementing, defaulting or deleting as appropriate. Do not add meaningless bodies merely to satisfy a count.

## Values
Pass small/trivial values by value, large read-only objects by const reference; transfer ownership explicitly. Return by value and use copy elision/move semantics where supported without relying on moved-from contents.

## Errors
Respect exception policy and ABI boundaries. optional requires C++17, expected C++23; use compatible result types or existing conventions on older toolchains.

Use [C++ development](../../skills/languages/cpp-development/SKILL.md).
