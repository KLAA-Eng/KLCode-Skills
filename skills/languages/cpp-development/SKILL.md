---
name: cpp-development
description: "Write, review and test C++ with explicit ownership, RAII, type-safe interfaces and toolchain-compatible concurrency and test practices."
---

# Cpp Development

Inspect the build system, compiler/toolchain, C++ standard, target platform and ABI/public interfaces first. Apply modern features only when supported; do not force concepts, ranges or newer threading primitives into a lower-standard target. Hardware/embedded boundaries and intentional C interfaces may require scoped exceptions.

Use RAII and explicit ownership, value semantics where suitable, narrow interfaces and initialized state. Raw nonowning pointers/references differ from ownership transfer. Read [interfaces and classes](references/interfaces-classes.md), [resources and errors](references/resources-errors.md), [concurrency and generic code](references/concurrency-templates.md), or [source and performance](references/source-performance.md) for relevant Core Guidelines-derived detail.

For tests inspect the existing framework/build integration. Read [test design](references/test-design.md) for GoogleTest/GoogleMock/CTest examples and [diagnostics](references/test-diagnostics.md) for failure isolation, coverage and sanitizers. Catch2/doctest or existing custom runners are valid alternatives. Source examples are illustrative and must be adapted to real project types, not delivered as production stubs.

Use focused behavioral/characterization checks, then relevant integration/regression paths. Enable compiler warnings/sanitizers appropriate to the target and supported compiler. Sanitizer/coverage flags are toolchain-specific, and ThreadSanitizer must not be blindly combined with unsupported sanitizer sets. Follow the shared testing rule for test-first defaults, changed-code coverage targets and practical exceptions.

The [C++ reviewer](../../../support/languages/agents/cpp-reviewer.md) and optional [build resolver](../../../support/languages/agents/cpp-build-resolver.md) are scoped role prompts. Select independent review under the shared review rule; these files are not registered global agents. Preserve unrelated user changes while resolving build/test failures.

Apply the runtime-compatible language rules: [cpp / coding style](../../../rules/cpp/coding-style.md), [cpp / hooks](../../../rules/cpp/hooks.md), [cpp / patterns](../../../rules/cpp/patterns.md), [cpp / security](../../../rules/cpp/security.md), [cpp / testing](../../../rules/cpp/testing.md).
