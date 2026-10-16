# Web Security

Extends [shared security](../common/security.md).

## Policy and injection
Define restrictive CSP for hosted production sites or supported equivalent policies/bridge restrictions in webviews. Use per-response cryptographic nonces for necessary dynamic inline scripts or suitable hashes for static content. Do not copy wildcard origins, unsafe-inline or third-party allowlists blindly.
Never insert untrusted HTML without vetted appropriate sanitization; prefer textContent and escaped templates. Framework escaping does not protect arbitrary HTML injection.

## Scripts
Minimize third-party scripts, load async/defer where suitable and self-host when practical. Use SRI for stable compatible CDN resources. Review dependencies on changes and at the project's cadence; quarterly is an option, not an enforced schedule.

## Transport and headers
Use HTTPS for hosted services. Select frame-ancestors, nosniff, referrer and permissions policies for real embedding/resource needs. HSTS includeSubDomains/preload needs explicit domain-wide readiness, not copy/paste adoption. Model local webview transport separately.

## Forms
Validate at the trusted server/native bridge plus client feedback. Protect cookie-authenticated state changes against CSRF. Apply appropriate authorization, rate limits and anti-abuse controls to exposed operations; avoid needless CAPTCHA. Client validation is never an authority boundary.

Use [application security](../../skills/engineering/application-security/SKILL.md).
