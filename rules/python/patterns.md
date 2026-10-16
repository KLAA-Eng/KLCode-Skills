# Python Patterns

Extends [shared patterns](../common/patterns.md).

## Protocol and duck typing
Prefer narrow behavioral contracts. typing.Protocol requires a supported runtime; ordinary duck typing and compatible test doubles remain valid in IronPython 2.7. Annotations do not validate external input at runtime.

## Data transfer objects
Use dataclasses where supported and useful. Named tuples, dictionaries or ordinary classes can serve older hosts; choose explicit fields and ownership without forcing dependencies.

## Context managers and generators
Use context managers for files, transactions and disposable resources where supported; use try/finally when the host API needs explicit cleanup. Use generators for lazy processing when resource lifetime and repeated iteration remain clear.

## Reference
[Python development](../../skills/languages/python-development/SKILL.md) covers errors, concurrency and packaging. Preserve Revit transaction and UI-thread requirements.
