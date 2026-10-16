# React Security

Extends [TypeScript security](../typescript/security.md), [shared security](../common/security.md) and [web security](../web/security.md).

## HTML and URLs
Review every dangerouslySetInnerHTML source and sanitization boundary. Prefer escaped text; raw user HTML needs vetted allowlist sanitization with configuration appropriate to the environment. Markdown rendering is not automatically sanitized: verify enabled raw HTML/plugins.
Allowlist URL schemes/origins for the actual attribute/context. javascript and other executable schemes are dangerous; data/blob use depends on context and trusted origin, not a universal claim that all data URLs execute. Explicit noopener is useful for new tabs; noreferrer depends on referrer/privacy needs.

## Authority and secrets
Client UI gates do not enforce access. Server actions, APIs and native bridges must validate, authenticate and authorize each sensitive operation and apply relevant abuse controls. Publicly bundled environment values are public regardless of prefix; verify actual bundler configuration rather than treating unprefixed values as automatically secret.
Prefer secure HttpOnly cookie sessions where suitable for hosted apps; account for CSRF and deployment needs. Client-readable bearer tokens require an explicit threat model; do not put long-lived secrets in localStorage.

## CSP and rendering
Use the selected restrictive CSP, with supported nonces/hashes and documented tradeoffs. Escape manually constructed SSR wrappers as well as JSX values. Do not embed untrusted JSON directly in script contexts without safe serialization.

## Object updates
Validate/allowlist external update fields before merging state. Object spread does not itself invoke a __proto__ setter like every unsafe assignment pattern; the broader risks include unintended field overrides and downstream prototype-polluting merges. Reject dangerous keys where relevant rather than relying on an inaccurate blanket claim.

## Dependencies and artifacts
Review new UI packages, HTML-string behavior, license/version risks and existing audit results. Source maps expose source and may be public intentionally; select publication/error-reporting policy without adding a cloud service or claiming hidden maps secure the app.

Use [application security](../../skills/engineering/application-security/SKILL.md) for focused review rather than unregistered upstream agents.
