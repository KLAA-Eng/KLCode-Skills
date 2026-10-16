# C++ Testing

Extends [shared testing](../common/testing.md).

## Framework and execution
Keep existing GoogleTest/GoogleMock, Catch2, doctest or custom harness. CMake/CTest applies to CMake projects only; preserve MSBuild or other build systems. Build the relevant target/configuration first, then tests. Adapt `cmake --build <build-dir> --config <configuration>` and `ctest --test-dir <build-dir> -C <configuration> --output-on-failure` to real paths.

## Coverage and sanitizers
Default to test-first for new testable logic and bug fixes, with practical exceptions. Target 80% for new or substantially changed testable code, not a repository gate. Select compiler-compatible coverage tooling; GCC/lcov flags are not portable to every Windows target. Run supported sanitizers in suitable CI configurations and report unavailable host/toolchain checks.

Use [C++ development](../../skills/languages/cpp-development/SKILL.md).
