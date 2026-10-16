# Python Coding Style

Extends [shared coding style](../common/coding-style.md).

## Standards
Follow existing PEP 8 conventions and the actual interpreter/host. Use type annotations for contracts only where supported. IronPython 2.7 needs compatible syntax or documented types; do not introduce unsupported f-strings, dataclasses, Protocol or union syntax.

## Immutability
Prefer immutable values for shared state. Frozen dataclasses or NamedTuple suit compatible runtimes; tuples or encapsulated classes can serve older hosts. Deliberate mutation for host APIs, UI models or performance is valid with ownership and effects clear.

## Formatting
Use the repository's configured formatter, import sorter and linter. Black, isort and Ruff are options where compatible, not required dependencies or reasons to rewrite unrelated code.

## Reference
Use [Python development](../../skills/languages/python-development/SKILL.md) for compatible patterns and tooling.
