# FastAPI Rules

Apply only when FastAPI is actually present; app/ and *_api.py names do not establish applicability. Extends [Python patterns](patterns.md), [security](security.md) and [testing](testing.md).

## Structure
Prefer a testable app factory when it fits. Keep routers thin, separate request/update/response schemas, and inject database/auth dependencies. Do not restructure another framework or desktop app to match.

## Async
Use async endpoints for awaitable I/O with compatible async clients. Avoid blocking requests, synchronous database access or blocking filesystem/network calls on the event loop. Synchronous endpoints or bounded thread offloading are valid for blocking workloads.

## Dependencies
Use scoped dependencies for sessions/authentication and appropriately managed long-lived clients. Close resources at the correct lifecycle boundary; avoid unmanaged clients/sessions inside handlers.

## Schemas
Constrain application-data serialization with explicit response models. Exclude passwords, hashes, tokens and internal auth state. Prefer supported Pydantic constraints for expressible validation, respecting the installed version.

## Security
Use environment-specific CORS origins; never combine wildcard origins and credentialed requests. For JWT auth validate signature, algorithm allowlist, expiry, issuer and audience. Apply abuse controls to exposed auth/write endpoints and redact credentials, cookies and tokens.

## Tests
Override the exact Depends dependency and clear overrides after each test. Use compatible async clients for async behavior and test auth, validation and serialization through the application boundary. Follow [shared testing](../common/testing.md).

Use [Python development](../../skills/languages/python-development/SKILL.md) and [application security](../../skills/engineering/application-security/SKILL.md); the retired fastapi-patterns skill is not required.
