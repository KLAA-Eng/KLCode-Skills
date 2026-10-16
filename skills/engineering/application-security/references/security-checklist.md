# Security Checklist

Quick reference for web application security. Use alongside the `application-security` skill.

## Table of Contents

- [Threat Modeling (Start Here)](#threat-modeling-start-here)
- [Pre-Commit Checks](#pre-commit-checks)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Input Validation](#input-validation)
- [Security Headers](#security-headers)
- [CORS Configuration](#cors-configuration)
- [Data Protection](#data-protection)
- [Dependency Security](#dependency-security)
- [AI / LLM Security](#ai--llm-security)
- [Error Handling](#error-handling)
- [OWASP Top 10 Quick Reference](#owasp-top-10-quick-reference)
- [OWASP Top 10 for LLMs Quick Reference](#owasp-top-10-for-llms-quick-reference)

## Threat Modeling (Start Here)

Before reaching for controls, spend five minutes thinking like an attacker:

- [ ] Trust boundaries mapped (requests, uploads, webhooks, third-party APIs, LLM output, and local values written by processes you don't control)
- [ ] Assets named (credentials, PII, payment data, admin actions, money movement)
- [ ] STRIDE run per boundary (Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation)
- [ ] Abuse cases written next to use cases ("how would I misuse this?")

## Pre-Commit Checks

- [ ] No secrets in code (`git diff --cached | grep -i "password\|secret\|api_key\|token"`)
- [ ] `.gitignore` covers: `.env`, `.env.local`, `*.pem`, `*.key`
- [ ] `.env.example` uses placeholder values (not real secrets)

## Authentication

- [ ] Passwords hashed with bcrypt (≥12 rounds), scrypt, or argon2
- [ ] Session cookies: `httpOnly`, `secure`, `sameSite: 'lax'`
- [ ] Session expiration configured (reasonable max-age)
- [ ] Rate limiting on login endpoint (≤10 attempts per 15 minutes)
- [ ] Password reset tokens: time-limited (≤1 hour), single-use
- [ ] Account lockout after repeated failures (optional, with notification)
- [ ] MFA supported for sensitive operations (optional but recommended)

## Authorization

- [ ] Every protected endpoint checks authentication
- [ ] Every resource access checks ownership/role (prevents IDOR)
- [ ] Admin endpoints require admin role verification
- [ ] API keys scoped to minimum necessary permissions
- [ ] JWT tokens validated (signature, expiration, issuer)

## Input Validation

- [ ] All user input validated at system boundaries (API routes, form handlers)
- [ ] Validation uses allowlists (not denylists)
- [ ] String lengths constrained (min/max)
- [ ] Numeric ranges validated
- [ ] Email, URL, and date formats validated with proper libraries
- [ ] File uploads: type restricted, size limited, content verified
- [ ] SQL queries parameterized (no string concatenation)
- [ ] HTML output encoded (use framework auto-escaping)
- [ ] URLs validated before redirect (prevent open redirect)
- [ ] Server-side URL fetches allowlisted; private/reserved IPs blocked (prevent SSRF)
- [ ] Destructive path operations (delete/move/overwrite): symlinks resolved, allowlisted root, minimum depth, ownership evidence read before the call

### Destructive Path Operations

Containment for a target named by data. Resolve first, then decide — and treat the
result as a candidate, not as authorization:

```typescript
import { realpath, readFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute, join, sep } from 'node:path';

const ALLOWED_ROOTS = ['/var/lib/myapp/sessions']; // an allowlist, not a pattern
const MIN_DEPTH = 1;                               // so a root is never the target

async function resolveDeletable(candidate: string, expectedOwner: string) {
  const target = await realpath(resolve(candidate)); // symlinks resolved BEFORE the check
  const inRoot = ALLOWED_ROOTS.some((root) => {
    const rel = relative(root, target);
    // `rel === '..'` / `'../'` only — a plain `startsWith('..')` would also
    // reject a legitimate child named `..cache`.
    if (rel === '' || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return false;
    return rel.split(sep).length >= MIN_DEPTH;
  });
  if (!inRoot) throw new Error(`refusing: outside allowed roots (${target})`);

  const owner = await readFile(join(target, '.owner'), 'utf8').catch(() => null);
  if (owner?.trim() !== expectedOwner) throw new Error(`refusing: unproven owner (${target})`);
  return target;
}
```

What this does not do, and must be said where the snippet is copied from:

- **The marker is self-attestation.** Anything that can write inside the root can write
  `.owner`. `expectedOwner` has to come from authenticated state, and the marker needs
  integrity protection (restrictive ownership, or a MAC) before it is authorization
  rather than a consistency check against a misderived target.
- **Returning a path leaves a check/use race.** Where an untrusted process can swap an
  ancestor between the check and the call, operate on a descriptor with no-follow,
  beneath-the-root semantics, or guarantee the hierarchy is immutable for the duration.

## Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0  (disabled, rely on CSP)
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## CORS Configuration

```typescript
// Restrictive (recommended)
cors({
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

// NEVER use in production:
cors({ origin: '*' })  // Allows any origin
```

## Data Protection

- [ ] Sensitive fields excluded from API responses (`passwordHash`, `resetToken`, etc.)
- [ ] Sensitive data not logged (passwords, tokens, full CC numbers)
- [ ] PII encrypted at rest (if required by regulation)
- [ ] HTTPS for all external communication
- [ ] Database backups encrypted
- [ ] Personal data is classified, collected against a stated purpose, and minimized
- [ ] Personal data has a retention limit and a working deletion path (incl. backups, caches, indexes)
- [ ] Export/delete (data-subject) requests are supported where required; third-party sharing has consent and a data-processing agreement

## Dependency Security

First locate the **installation boundary**. If the package is matched by a parent `workspaces` declaration, use that workspace root; otherwise use the nearest project root that owns both its manifest and dependency graph. At that boundary, corroborate `packageManager` (when present), the lockfile, and CI commands. Stop if they disagree or competing manager lockfiles exist there. A nested project is independent only when it is outside the parent workspace; independent subprojects may legitimately use different managers.

| Manager/version signal | Frozen/immutable CI install | Known-advisory audit |
|---|---|---|
| npm (`package-lock.json` or `npm-shrinkwrap.json`) | `npm ci` | `npm audit` |
| pnpm | `pnpm install --frozen-lockfile` | `pnpm audit` |
| Yarn 2+ | `yarn install --immutable` | `yarn npm audit -A -R` |
| Yarn 1 | `yarn install --frozen-lockfile` | `yarn audit` |

For an unlisted manager or version, consult its official documentation; do not substitute another manager's commands or newer defaults.

### Install-Script Gate

Never discover dependency lifecycle scripts by first executing an ordinary install on a client whose defaults have not been verified.

1. Bootstrap with dependency scripts disabled, or with a documented default-deny policy plus fail-closed enforcement.
2. Inspect the exact script source and package version before approval.
3. Record the narrowest native allow/deny policy at the installation boundary and commit it.
4. Run a clean frozen/immutable install with that policy and verify the required packages still build.

**Point-in-time snapshot:** Package-manager defaults and command names change quickly. Verify this matrix against the pinned client's current official documentation before relying on it.

| Manager version | Native policy |
|---|---|
| npm without verified granular approvals | Bootstrap with `npm ci --ignore-scripts`, or persist `ignore-scripts=true` when project-wide blocking is intended. Keep scripts disabled or deliberately upgrade before allowing any reviewed dependency script. |
| npm 11.18.x (verified on 11.18.0) | Unreviewed dependency scripts run with a warning by default. Enforce `strict-allow-scripts=true` before a normal install, then use the workspace-unaware `npm install-scripts ls` from the installation boundary; keep approvals version-pinned and denials name-wide. |
| npm 12.x (verified on 12.0.1) | Unreviewed dependency scripts are skipped by default; `strict-allow-scripts=true` makes their presence fail the install before execution. Use the same `npm install-scripts` review and approval flow. |
| pnpm 11+ | Use `pnpm approve-builds` and commit `allowBuilds` decisions; `strictDepBuilds` defaults to `true`, so unreviewed builds fail. |
| pnpm 10.26–10.x | Configure `allowBuilds` explicitly, or use `pnpm approve-builds` with the legacy `onlyBuiltDependencies` / `ignoredBuiltDependencies` lists. Set `strictDepBuilds: true`; its v10 default is `false`. |
| pnpm 10.1–10.25 | `pnpm approve-builds` records the legacy lists; enable `strictDepBuilds` where supported (10.3+). |
| Older or unknown pnpm | Bootstrap with `pnpm install --frozen-lockfile --ignore-scripts`. Keep scripts disabled unless the pinned version documents an enforceable policy. |
| Yarn 4.14+ | Dependency postinstalls are disabled by default. Grant only required exceptions with top-level `dependenciesMeta.<package>.built: true`. |
| Yarn 2–4.13 | Set `enableScripts: false` in `.yarnrc.yml`, then grant only required exceptions with top-level `dependenciesMeta.<package>.built: true`; do not enable scripts globally. |
| Yarn 1 | Bootstrap with `yarn install --ignore-scripts`; keep scripts disabled unless each required exception is reviewed under the pinned client's documented workflow. |

Authoritative checks: [npm install-scripts](https://docs.npmjs.com/cli/v11/commands/npm-install-scripts/), [install policy](https://docs.npmjs.com/cli/v11/commands/npm-install/), and [CLI releases](https://github.com/npm/cli/releases); [pnpm approve-builds](https://pnpm.io/cli/approve-builds) and [build settings](https://pnpm.io/settings#allowbuilds); [Yarn security](https://yarnpkg.com/features/security) and [manifest](https://yarnpkg.com/configuration/manifest#dependenciesMeta).

**Supply-chain hygiene** (advisory audits do not catch newly malicious packages):
- [ ] Exactly one authoritative lockfile per project/workspace root is committed and CI never rewrites it
- [ ] Critical/high findings are triaged for reachability; deferrals have a reason and review date
- [ ] Forced audit remediation (`npm audit fix --force` or equivalent) is never automatic; remediation diffs and changelogs are reviewed
- [ ] Registry signatures/provenance are verified where the manager supports it
- [ ] Dependency lifecycle scripts are blocked before first execution and approved only through the pinned manager's native policy
- [ ] New dependencies are reviewed for ownership, maintenance, release age, provenance, transitive graph, and typosquatting

## AI / LLM Security

For any feature that calls an LLM (chatbots, summarizers, agents, RAG):

- [ ] Model output treated as untrusted — never into `eval`/SQL/shell/`innerHTML`/file paths
- [ ] Prompt injection assumed; permissions enforced in code, not in the system prompt
- [ ] Secrets, cross-tenant data, and full system prompts kept out of the context window
- [ ] Tool/agent permissions scoped; destructive or irreversible actions require applicable authorization
- [ ] Token, rate, and recursion/loop limits set (bound consumption)

## Error Handling

```typescript
// Production: generic error, no internals
res.status(500).json({
  error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' }
});

// NEVER in production:
res.status(500).json({
  error: err.message,
  stack: err.stack,         // Exposes internals
  query: err.sql,           // Exposes database details
});
```

## OWASP Top 10 Quick Reference

| # | Vulnerability | Prevention |
|---|---|---|
| 1 | Broken Access Control | Auth checks on every endpoint, ownership verification |
| 2 | Cryptographic Failures | HTTPS, strong hashing, no secrets in code |
| 3 | Injection | Parameterized queries, input validation |
| 4 | Insecure Design | Threat modeling, spec-driven development |
| 5 | Security Misconfiguration | Security headers, minimal permissions, audit deps |
| 6 | Vulnerable Components | The ecosystem's dependency audit (`npm audit`, `pip-audit`, ...), keep deps updated, minimal deps |
| 7 | Auth Failures | Strong passwords, rate limiting, session management |
| 8 | Data Integrity Failures | Verify updates/dependencies, signed artifacts |
| 9 | Logging Failures | Log security events, don't log secrets |
| 10 | SSRF | Validate/allowlist URLs, restrict outbound requests |

## OWASP Top 10 for LLMs Quick Reference

For apps with LLM features. See the [OWASP GenAI Security Project](https://genai.owasp.org/llm-top-10/).

| ID | Risk | Prevention |
|---|---|---|
| LLM01 | Prompt Injection | Don't trust the system prompt as a boundary; enforce permissions in code |
| LLM02 | Sensitive Information Disclosure | Keep secrets/PII out of prompts; filter outputs |
| LLM03 | Supply Chain | Vet models, datasets, and plugins like any dependency |
| LLM04 | Data and Model Poisoning | Use trusted model sources, verify integrity; vet fine-tuning and RAG data |
| LLM05 | Improper Output Handling | Treat model output as untrusted; validate, parameterize, encode |
| LLM06 | Excessive Agency | Scope tool permissions; confirm destructive actions |
| LLM07 | System Prompt Leakage | Assume the system prompt can leak; put no secrets in it |
| LLM08 | Vector and Embedding Weaknesses | Partition RAG embeddings per tenant; validate documents before indexing |
| LLM09 | Misinformation | Ground answers with citations; validate critical claims; keep a human in the loop |
| LLM10 | Unbounded Consumption | Cap tokens, request rate, and loop/recursion depth |


## ECC input and disclosure examples

### 2. Input Validation

#### Always Validate User Input
```typescript
import { z } from 'zod'

// Define validation schema
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150)
})

// Validate before processing
export async function createUser(input: unknown) {
  try {
    const validated = CreateUserSchema.parse(input)
    return await db.users.create(validated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.issues }
    }
    throw error
  }
}
```

#### File Upload Validation
```typescript
function validateFileUpload(file: File) {
  // Size check (5MB max)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error('File too large (max 5MB)')
  }

  // Type check
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type')
  }

  // Extension check
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']
  const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0]
  if (!extension || !allowedExtensions.includes(extension)) {
    throw new Error('Invalid file extension')
  }

  return true
}
```

#### Verification Steps
- [ ] All user inputs validated with schemas
- [ ] File uploads restricted (size, type, extension)
- [ ] No direct use of user input in queries
- [ ] Whitelist validation (not blacklist)
- [ ] Error messages don't leak sensitive info

### 3. SQL Injection Prevention

#### FAIL: NEVER Concatenate SQL
```typescript
// DANGEROUS - SQL Injection vulnerability
const query = `SELECT * FROM users WHERE email = '${userEmail}'`
await db.query(query)
```

#### PASS: ALWAYS Use Parameterized Queries
```typescript
// Safe - parameterized query
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail)

// Or with raw SQL -- the value goes in the params array, never in the
// string. Use your driver's placeholder syntax (Postgres numbers its
// placeholders, MySQL uses "?").
await db.query(
  'SELECT * FROM users WHERE email = ?',
  [userEmail]
)
```

<!-- Do not write a literal dollar-sign-N placeholder anywhere in this file.
     Invoking this skill with arguments substitutes it away, and the example
     above then renders as concatenated SQL -- the exact anti-pattern this
     section warns against. Use "?" and name the Postgres form in prose. -->

#### Verification Steps
- [ ] All database queries use parameterized queries
- [ ] No string concatenation in SQL
- [ ] ORM/query builder used correctly
- [ ] Supabase queries properly sanitized

### 4. Authentication & Authorization

#### JWT Token Handling
```typescript
// FAIL: WRONG: localStorage (vulnerable to XSS)
localStorage.setItem('token', token)

// PASS: CORRECT: httpOnly cookies
res.setHeader('Set-Cookie',
  `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`)
```

#### Authorization Checks
```typescript
export async function deleteUser(userId: string, requesterId: string) {
  // ALWAYS verify authorization first
  const requester = await db.users.findUnique({
    where: { id: requesterId }
  })

  if (requester.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  // Proceed with deletion
  await db.users.delete({ where: { id: userId } })
}
```

#### Row Level Security (Supabase)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only view their own data
CREATE POLICY "Users view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own data
CREATE POLICY "Users update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

#### Verification Steps
- [ ] Tokens stored in httpOnly cookies (not localStorage)
- [ ] Authorization checks before sensitive operations
- [ ] Row Level Security enabled in Supabase
- [ ] Role-based access control implemented
- [ ] Session management secure

### 5. XSS Prevention

#### Sanitize HTML
```typescript
import DOMPurify from 'isomorphic-dompurify'

// ALWAYS sanitize user-provided HTML
function renderUserContent(html: string) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: []
  })
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
```

#### Content Security Policy

Start strict and loosen only with a documented removal plan. Do not default to
`'unsafe-inline'` or `'unsafe-eval'`; they neutralize much of CSP's protection
and should be treated as temporary compatibility debt.

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      base-uri 'self';
      object-src 'none';
      frame-ancestors 'none';
      script-src 'self';
      style-src 'self';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https://api.example.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
]
```

#### Verification Steps
- [ ] User-provided HTML sanitized
- [ ] CSP headers configured
- [ ] No unvalidated dynamic content rendering
- [ ] React's built-in XSS protection used

### 6. CSRF Protection

#### CSRF Tokens
```typescript
import { csrf } from '@/lib/csrf'

export async function POST(request: Request) {
  const token = request.headers.get('X-CSRF-Token')

  if (!csrf.verify(token)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    )
  }

  // Process request
}
```

#### SameSite Cookies
```typescript
res.setHeader('Set-Cookie',
  `session=${sessionId}; HttpOnly; Secure; SameSite=Strict`)
```

#### Verification Steps
- [ ] CSRF tokens on state-changing operations
- [ ] SameSite=Strict on all cookies
- [ ] Double-submit cookie pattern implemented

### 7. Rate Limiting

#### API Rate Limiting
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests'
})

// Apply to routes
app.use('/api/', limiter)
```

#### Expensive Operations
```typescript
// Aggressive rate limiting for searches
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Too many search requests'
})

app.use('/api/search', searchLimiter)
```

#### Verification Steps
- [ ] Rate limiting on all API endpoints
- [ ] Stricter limits on expensive operations
- [ ] IP-based rate limiting
- [ ] User-based rate limiting (authenticated)

### 8. Sensitive Data Exposure

#### Logging
```typescript
// FAIL: WRONG: Logging sensitive data
console.log('User login:', { email, password })
console.log('Payment:', { cardNumber, cvv })

// PASS: CORRECT: Redact sensitive data
console.log('User login:', { email, userId })
console.log('Payment:', { last4: card.last4, userId })
```

#### Error Messages
```typescript
// FAIL: WRONG: Exposing internal details
catch (error) {
  return NextResponse.json(
    { error: error.message, stack: error.stack },
    { status: 500 }
  )
}

// PASS: CORRECT: Generic error messages
catch (error) {
  console.error('Internal error:', error)
  return NextResponse.json(
    { error: 'An error occurred. Please try again.' },
    { status: 500 }
  )
}
```

#### Verification Steps
- [ ] No passwords, tokens, or secrets in logs
- [ ] Error messages generic for users
- [ ] Detailed errors only in server logs
- [ ] No stack traces exposed to users

Select controls for the actual surface. Web examples do not impose HTTP/session infrastructure on native apps. Version-specific manager policies must be checked against the installed tool.
