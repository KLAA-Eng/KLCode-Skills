# TypeScript and JavaScript Security

Extends [shared security](../common/security.md).

## Secrets and boundaries
Keep secrets on the server or approved native credential boundary. process.env is a Node example, not a browser secret store: bundlers may inline environment values into public assets. Fail safely for missing server config and never log secrets.

Validate external values at runtime, avoid unsafe dynamic execution and use safe DOM APIs. In webviews restrict bridge methods, origins and file access to required operations.

Use [application security](../../skills/engineering/application-security/SKILL.md) for review and [web security](../web/security.md) for browser surfaces; the upstream security-reviewer skill is not a prerequisite.
