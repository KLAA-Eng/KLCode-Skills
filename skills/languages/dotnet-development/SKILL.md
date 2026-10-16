---
name: dotnet-development
description: "Write, review and test C# and .NET code compatible with the project target framework, language version and runtime boundaries."
---

# Dotnet Development

Inspect project/solution files, TargetFramework(s), LangVersion, Nullable settings, package versions, platform target and host constraints before choosing syntax or APIs. Respect the existing runtime; records, required/init members, collection expressions and modern async APIs may not work on older targets. Do not retarget a desktop/plugin project merely to match an example.

Use explicit contracts, suitable immutability/nullability, deterministic disposal and cancellation propagation. Avoid sync-over-async and unobserved work; UI-thread affinity and host API transactions must remain explicit. Read [core patterns](references/core-patterns.md) for conditional language examples and [async and results](references/async-results.md) for cancellation/error boundaries.

For a web/service or EF-based application only, read [service integration](references/service-integration.md). ASP.NET middleware, Minimal APIs, EF repositories and DI scopes are not requirements for every desktop tool. Use existing application architecture and supported package versions.

Read [unit testing](references/unit-testing.md) for arrange/act/assert, theories, mocks and builders, and [integration testing](references/integration-testing.md) when the application actually uses ASP.NET/database services. Preserve existing xUnit/NUnit/MSTest choices and assertion-library licensing; do not add the source's preferred packages automatically. Testcontainers requires its own runtime, not a bundled capability.

Run the relevant dotnet/MSBuild/test commands for the selected target; native/desktop/host-bound behavior may require its actual Windows application. A compile or unit pass alone does not prove host integration. Use [C# review prompt](../../../support/languages/agents/csharp-reviewer.md) for a bounded independent review under the shared review rule.

Apply the runtime-compatible language rules: [csharp / coding style](../../../rules/csharp/coding-style.md), [csharp / hooks](../../../rules/csharp/hooks.md), [csharp / patterns](../../../rules/csharp/patterns.md), [csharp / security](../../../rules/csharp/security.md), [csharp / testing](../../../rules/csharp/testing.md).
