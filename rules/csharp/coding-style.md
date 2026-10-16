# C# Coding Style

Extends [shared coding style](../common/coding-style.md).

## Standards
Inspect target frameworks, LangVersion, Nullable, packages, platform and host first. Follow existing .NET conventions, explicit API access modifiers and primary-type organization. Expand nullable annotations only where supported and scoped. Do not retarget .NET Framework 4.8 plugins to match examples.

## Types
Use records/record structs for value-like models only where supported. Classes suit identity/lifecycle, interfaces meaningful service boundaries. Prefer models/generics to dynamic, allowing justified COM/interop boundaries.

## Immutability
Prefer immutable shared-state contracts using constructors, supported init members or collections. Binding models and host APIs may need deliberate mutation; make ownership, notifications and threading clear.

## Async and errors
Prefer async/await over Result/Wait where supported. Propagate cancellation and preserve UI-thread/host-transaction requirements. Use specific exceptions and structured context, preserve stacks on rethrow, and avoid duplicate logging or secrets.

## Formatting
Use existing formatting/analyzers and organized imports. dotnet format is conditional on project support; legacy MSBuild may need established tools. Keep expression-bodied members readable.

Use [dotnet development](../../skills/languages/dotnet-development/SKILL.md).
