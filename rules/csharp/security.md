# C# Security

Extends [shared security](../common/security.md).

## Secrets
Do not hardcode credentials or place them in appsettings files. Use existing environment/configuration or approved credential stores. User-secrets is conditional on development-stack support; Windows credentials can suit desktop apps without a cloud manager.

## SQL
Parameterize values in the actual data layer. Allowlist dynamic identifiers, sort fields and operators that cannot be parameterized; never concatenate untrusted values.

## Validation
Validate file, interop, UI-command, API and persistence inputs at relevant boundaries. Use existing annotations/libraries or explicit guards; adding FluentValidation is not required.

## Authorization
Where authentication exists use framework handlers and enforce operation-level authorization. Client UI gates do not grant authority. Respect native file/host permissions and avoid logging tokens, passwords or unnecessary personal data.

## Errors
Give safe user-facing errors and keep protected diagnostic context. Do not expose secrets or unnecessary stacks, SQL and filesystem paths to untrusted clients.

Use [application security](../../skills/engineering/application-security/SKILL.md).
