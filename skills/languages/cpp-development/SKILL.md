---
name: cpp-development
description: "Write, review and test C++ with explicit ownership, RAII, type-safe interfaces and toolchain-compatible concurrency and test practices."
---

# Cpp Development

Inspect the build system, compiler/toolchain, C++ standard, target platform and ABI/public interfaces first. Apply modern features only when supported; do not force concepts, ranges or newer threading primitives into a lower-standard target. Hardware/embedded boundaries and intentional C interfaces may require scoped exceptions.

Use RAII and explicit ownership, value semantics where suitable, narrow interfaces and initialized state. Raw nonowning pointers/references differ from ownership transfer. Read [interfaces and classes](references/interfaces-classes.md), [resources and errors](references/resources-errors.md), [concurrency and generic code](references/concurrency-templates.md), or [source and performance](references/source-performance.md) for relevant Core Guidelines-derived detail.

For tests inspect the existing framework/build integration. Read [test design](references/test-design.md) for GoogleTest/GoogleMock/CTest examples and [diagnostics](references/test-diagnostics.md) for failure isolation, coverage and sanitizers. Catch2/doctest or existing custom runners are valid alternatives. Source examples are illustrative and must be adapted to real project types, not delivered as production stubs.

Use focused behavioral/characterization checks, then relevant integration/regression paths. Enable compiler warnings/sanitizers appropriate to the target and supported compiler. Sanitizer/coverage flags are toolchain-specific, and ThreadSanitizer must not be blindly combined with unsupported sanitizer sets. No coverage percentage or universal test-first policy is implied.

Optional [C++ reviewer](../../../support/languages/agents/cpp-reviewer.md) and [build resolver](../../../support/languages/agents/cpp-build-resolver.md) are scoped role prompts. They are not registered global agents. Preserve unrelated user changes while resolving build/test failures.
