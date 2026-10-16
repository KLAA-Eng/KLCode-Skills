---
name: python-development
description: "Write, review and test Python using idiomatic patterns compatible with the actual runtime and host. Use for Python implementation, typing, resource handling, parsing or pytest work."
---

# Python Development

Detect the actual interpreter/host, supported Python versions and dependency/test configuration before applying syntax or library examples. Inspect pyproject.toml, requirements/lockfiles, existing tests and runtime entrypoints. A modern CPython project and a constrained embedded/IronPython host need different supported features; do not upgrade or assume CPython-only packages implicitly.

Prefer clear functions, explicit boundaries, context-managed resources, narrow exceptions and useful type contracts where supported. Reuse repository conventions rather than imposing a new package layout or toolchain. Read [types and data](references/types-data.md), [resources and errors](references/resources-errors.md), [concurrency](references/concurrency.md) or [packaging/tooling](references/package-tooling.md) for the relevant branch. Example APIs may require a newer interpreter; verify compatibility first.

For tests use the project's existing framework. Read [pytest fixtures and data](references/pytest-fixtures.md) and [mocking, async and effects](references/pytest-effects.md) when pytest is present. Prove meaningful behavior, not the Python language or a copy of the implementation. Patch where the dependency is looked up, isolate filesystem/network/time and prefer deterministic fixtures. Follow the shared testing rule for test-first defaults, changed-code coverage targets and practical exceptions.

For structured extraction read [deterministic parsing](references/structured-parsing.md). Use parsers/regex for regular formats and validate completeness against representative fixtures; a confidence heuristic is not a measured accuracy rate. LLM fallback is an optional explicitly selected external integration, never the default for every unmatched item.

Use repository check commands and the actual selected interpreter. Report missing host/third-party prerequisites rather than treating a successful syntax check on a different runtime as application verification. The [Python review prompt](../../../support/languages/agents/python-reviewer.md) supports bounded independent review under the shared review rule; it is not autoactivated.

Apply the runtime-compatible language rules: [python / coding style](../../../rules/python/coding-style.md), [python / hooks](../../../rules/python/hooks.md), [python / patterns](../../../rules/python/patterns.md), [python / security](../../../rules/python/security.md), [python / testing](../../../rules/python/testing.md).

Only for an existing FastAPI application, read [python / fastapi](../../../rules/python/fastapi.md).
