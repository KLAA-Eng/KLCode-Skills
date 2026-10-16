# C# Testing

Extends [shared testing](../common/testing.md).

## Framework and organization
Keep existing xUnit, NUnit, MSTest or compatible host tests. Assertion/mocking packages are optional; check compatibility/licensing. Follow project layout, separate unit/integration/host tests and name behavior with useful arrange/act/assert structure.

## Integration
Use WebApplicationFactory only for ASP.NET Core, exercising middleware/auth/validation/serialization through HTTP. Testcontainers is optional and needs its runtime. Revit, native UI and COM integrations need the actual environment or an explicit limitation.

## Coverage
Default to test-first for new testable logic and bug fixes with practical exceptions. Target 80% for new or substantially changed testable code, with meaningful domain, validation, authorization and failure-path checks. Explain impractical coverage; this is not a repository gate. Run relevant dotnet test or legacy tooling for the actual target.

Use [dotnet development](../../skills/languages/dotnet-development/SKILL.md).
