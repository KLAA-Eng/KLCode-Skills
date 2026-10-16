# Python Security

Extends [shared security](../common/security.md).

## Secrets
Read required secrets from the existing environment, credential store or approved provider; report missing configuration safely. dotenv is optional for compatible development setups. Never commit real .env credentials or log secret values.

## Scanning
Use existing compatible security tooling. Bandit is an option; modern CPython scanning does not prove IronPython or host safety. Review unsafe deserialization, shell invocation, parameterized SQL and path confinement at untrusted-input boundaries.

## Framework-specific guidance
Apply Django or other framework advice only when present. Use [application security](../../skills/engineering/application-security/SKILL.md) for applicable review.
