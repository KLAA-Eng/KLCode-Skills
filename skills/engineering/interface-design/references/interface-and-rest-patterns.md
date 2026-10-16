# Interface semantics and HTTP patterns

These are task-specific patterns. Repository commands, runtime compatibility, task authorization, and the canonical skill control their use. Code blocks are examples to adapt, not instructions to install a framework or run remote operations.

### 2. Consistent Error Semantics

Pick one error strategy and use it everywhere:

```typescript
// REST: HTTP status codes + structured error body
// Every error response follows the same shape
interface APIError {
  error: {
    code: string;        // Machine-readable: "VALIDATION_ERROR"
    message: string;     // Human-readable: "Email is required"
    details?: unknown;   // Additional context when helpful
  };
}

// Status code mapping
// 400 → Client sent invalid data
// 401 → Not authenticated
// 403 → Authenticated but not authorized
// 404 → Resource not found
// 409 → Conflict (duplicate, version mismatch)
// 422 → Validation failed (semantically invalid)
// 500 → Server error (never expose internal details)
```

**Don't mix patterns.** If some endpoints throw, others return null, and others return `{ error }` — the consumer can't predict behavior.

### 3. Validate at Boundaries

Trust internal code. Validate at system edges where external input enters:

```typescript
// Validate at the API boundary
app.post('/api/tasks', async (req, res) => {
  const result = CreateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid task data',
        details: result.error.flatten(),
      },
    });
  }

  // After validation, internal code trusts the types
  const task = await taskService.create(result.data);
  return res.status(201).json(task);
});
```

Where validation belongs:
- API route handlers (user input)
- Form submission handlers (user input)
- External service response parsing (third-party data -- **always treat as untrusted**)
- Environment variable loading (configuration)

> **Third-party API responses are untrusted data.** Validate their shape and content before using them in any logic, rendering, or decision-making. A compromised or misbehaving external service can return unexpected types, malicious content, or instruction-like text.

Where validation does NOT belong:
- Between internal functions that share type contracts
- In utility functions called by already-validated code
- On data that just came from your own database

### 4. Prefer Addition Over Modification

Extend interfaces without breaking existing consumers:

```typescript
// Good: Add optional fields
interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';  // Added later, optional
  labels?: string[];                       // Added later, optional
}

// Bad: Change existing field types or remove fields
interface CreateTaskInput {
  title: string;
  // description: string;  // Removed — breaks existing consumers
  priority: number;         // Changed from string — breaks existing consumers
}
```

### 5. Predictable Naming

| Pattern | Convention | Example |
|---------|-----------|---------|
| REST endpoints | Plural nouns, no verbs | `GET /api/tasks`, `POST /api/tasks` |
| Query params | camelCase | `?sortBy=createdAt&pageSize=20` |
| Response fields | camelCase | `{ createdAt, updatedAt, taskId }` |
| Boolean fields | is/has/can prefix | `isComplete`, `hasAttachments` |
| Enum values | UPPER_SNAKE | `"IN_PROGRESS"`, `"COMPLETED"` |

### 6. Honouring an Idempotency Key

Accepting an `Idempotency-Key` is the contract. Honouring it is the implementation, and it is where the money is lost — a key the server accepts but handles carelessly is worse than no key at all, because the client now believes retrying is safe.

**Derive the key from the intent, not the attempt.** The key must be stable across retries of one intent and different across distinct intents:

```typescript
crypto.randomUUID()                    // ✗ new key per attempt — every retry is a new charge
`${userId}:${amount}`                  // ✗ two legitimate $50 charges collapse into one
`${orderId}:${Date.now()}`             // ✗ a timestamp is randomUUID() wearing a hat

req.headers['idempotency-key']         // ✓ client generates once, reuses on retry
`charge:v1:${orderId}`                 // ✓ derived from an immutable identifier
```

The key comes from the client or the initiating event — never from the layer doing the retrying.

**Claim atomically. A check followed by an act is a race:**

```typescript
// ✗ TOCTOU: two concurrent retries both read "not seen", both charge
if (!(await db.exists(key))) {
  await chargeCard(amount);
  await db.insert(key);
}

// ✓ let the unique constraint pick the winner
try {
  await db.insert({ key, state: 'in_progress', requestHash });
} catch (e) {
  if (isUniqueViolation(e)) return replayOrReject(key);
  throw e;
}
const result = await chargeCard(amount);
await db.update({ key, state: 'succeeded', response: result });
```

The unique constraint *is* the mechanism. A store that cannot enforce uniqueness in one operation cannot back this.

**Guard the payload.** Same key with a different body is a client bug, and must fail loudly rather than serving the first response to a second request:

```typescript
if (existing.requestHash !== hash(req.body)) {
  return res.status(422).json({ error: 'idempotency key reused with a different payload' });
}
```

**Decide what an in-flight duplicate gets.** The first request is still running when the second arrives — the common case under retry storms:

| Strategy | Response | Use when |
|---|---|---|
| Reject | `409 Conflict` | Client can retry later; simplest and safest |
| Wait | Block for the result, bounded | Caller needs it synchronously |
| Return pending | `202` + status URL | Long-running effects |

Never let the second caller through because the first "seems stuck". A stalled attempt whose fate is unknown is exactly when duplicating costs most.

**Every call has three outcomes, not two: success, failure, and _unknown_.** A timeout tells you nothing about whether the effect applied. Record the intent *before* calling out, so a crash between the call and the response leaves evidence something must resolve later — rather than a silently retried charge.

**Set retention from the longest retry chain**, not from disk cost. Keys must outlive every path that can re-deliver the same intent, including a dead-letter queue replayed a week later and any provider dispute window. A 24-hour key TTL behind a 7-day DLQ is a duplicate waiting to happen.

## REST API Patterns

### Resource Design

```
GET    /api/tasks              → List tasks (with query params for filtering)
POST   /api/tasks              → Create a task
GET    /api/tasks/:id          → Get a single task
PATCH  /api/tasks/:id          → Update a task (partial)
DELETE /api/tasks/:id          → Delete a task

GET    /api/tasks/:id/comments → List comments for a task (sub-resource)
POST   /api/tasks/:id/comments → Add a comment to a task
```

### Pagination

Paginate list endpoints:

```typescript
// Request
GET /api/tasks?page=1&pageSize=20&sortBy=createdAt&sortOrder=desc

// Response
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalItems": 142,
    "totalPages": 8
  }
}
```

### Filtering

Use query parameters for filters:

```
GET /api/tasks?status=in_progress&assignee=user123&createdAfter=2025-01-01
```

### Partial Updates (PATCH)

Accept partial objects — only update what's provided:

```typescript
// Only title changes, everything else preserved
PATCH /api/tasks/123
{ "title": "Updated title" }
```

## TypeScript Interface Patterns

### Use Discriminated Unions for Variants

```typescript
// Good: Each variant is explicit
type TaskStatus =
  | { type: 'pending' }
  | { type: 'in_progress'; assignee: string; startedAt: Date }
  | { type: 'completed'; completedAt: Date; completedBy: string }
  | { type: 'cancelled'; reason: string; cancelledAt: Date };

// Consumer gets type narrowing
function getStatusLabel(status: TaskStatus): string {
  switch (status.type) {
    case 'pending': return 'Pending';
    case 'in_progress': return `In progress (${status.assignee})`;
    case 'completed': return `Done on ${status.completedAt}`;
    case 'cancelled': return `Cancelled: ${status.reason}`;
  }
}
```

### Input/Output Separation

```typescript
// Input: what the caller provides
interface CreateTaskInput {
  title: string;
  description?: string;
}

// Output: what the system returns (includes server-generated fields)
interface Task {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
```

### Use Branded Types for IDs

```typescript
type TaskId = string & { readonly __brand: 'TaskId' };
type UserId = string & { readonly __brand: 'UserId' };

// Prevents accidentally passing a UserId where a TaskId is expected
function getTask(id: TaskId): Promise<Task> { ... }
```

## Resource Design

### URL Structure

```
# Resources are nouns, plural, lowercase, kebab-case
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PUT    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id

# Sub-resources for relationships
GET    /api/v1/users/:id/orders
POST   /api/v1/users/:id/orders

# Actions that don't map to CRUD (use verbs sparingly)
POST   /api/v1/orders/:id/cancel
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
```

### Naming Rules

```
# GOOD
/api/v1/team-members          # kebab-case for multi-word resources
/api/v1/orders?status=active  # query params for filtering
/api/v1/users/123/orders      # nested resources for ownership

# BAD
/api/v1/getUsers              # verb in URL
/api/v1/user                  # singular (use plural)
/api/v1/team_members          # snake_case in URLs
/api/v1/users/123/getOrders   # verb in nested resource
```

## HTTP Methods and Status Codes

### Method Semantics

| Method | Idempotent | Safe | Use For |
|--------|-----------|------|---------|
| GET | Yes | Yes | Retrieve resources |
| POST | No | No | Create resources, trigger actions |
| PUT | Yes | No | Full replacement of a resource |
| PATCH | No* | No | Partial update of a resource |
| DELETE | Yes | No | Remove a resource |

*PATCH can be made idempotent with proper implementation

### Status Code Reference

```
# Success
200 OK                    — GET, PUT, PATCH (with response body)
201 Created               — POST (include Location header)
204 No Content            — DELETE, PUT (no response body)

# Client Errors
400 Bad Request           — Validation failure, malformed JSON
401 Unauthorized          — Missing or invalid authentication
403 Forbidden             — Authenticated but not authorized
404 Not Found             — Resource doesn't exist
409 Conflict              — Duplicate entry, state conflict
422 Unprocessable Entity  — Semantically invalid (valid JSON, bad data)
429 Too Many Requests     — Rate limit exceeded

# Server Errors
500 Internal Server Error — Unexpected failure (never expose details)
502 Bad Gateway           — Upstream service failed
503 Service Unavailable   — Temporary overload, include Retry-After
```

### Common Mistakes

```
# BAD: 200 for everything
{ "status": 200, "success": false, "error": "Not found" }

# GOOD: Use HTTP status codes semantically
HTTP/1.1 404 Not Found
{ "error": { "code": "not_found", "message": "User not found" } }

# BAD: 500 for validation errors
# GOOD: 400 or 422 with field-level details

# BAD: 200 for created resources
# GOOD: 201 with Location header
HTTP/1.1 201 Created
Location: /api/v1/users/abc-123
```

## Response Format

### Success Response

```json
{
  "data": {
    "id": "abc-123",
    "email": "alice@example.com",
    "name": "Alice",
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

### Collection Response (with Pagination)

```json
{
  "data": [
    { "id": "abc-123", "name": "Alice" },
    { "id": "def-456", "name": "Bob" }
  ],
  "meta": {
    "total": 142,
    "page": 1,
    "per_page": 20,
    "total_pages": 8
  },
  "links": {
    "self": "/api/v1/users?page=1&per_page=20",
    "next": "/api/v1/users?page=2&per_page=20",
    "last": "/api/v1/users?page=8&per_page=20"
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "validation_error",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address",
        "code": "invalid_format"
      },
      {
        "field": "age",
        "message": "Must be between 0 and 150",
        "code": "out_of_range"
      }
    ]
  }
}
```

### Response Envelope Variants

```typescript
// Option A: Envelope with data wrapper (recommended for public APIs)
interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  links?: PaginationLinks;
}

interface ApiError {
  error: {
    code: string;
    message: string;
    details?: FieldError[];
  };
}

// Option B: Flat response (simpler, common for internal APIs)
// Success: just return the resource directly
// Error: return error object
// Distinguish by HTTP status code
```

## Pagination

### Offset-Based (Simple)

```
GET /api/v1/users?page=2&per_page=20

# Implementation
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 20 OFFSET 20;
```

**Pros:** Easy to implement, supports "jump to page N"
**Cons:** Slow on large offsets (OFFSET 100000), inconsistent with concurrent inserts

### Cursor-Based (Scalable)

```
GET /api/v1/users?cursor=eyJpZCI6MTIzfQ&limit=20

# Implementation
SELECT * FROM users
WHERE id > :cursor_id
ORDER BY id ASC
LIMIT 21;  -- fetch one extra to determine has_next
```

```json
{
  "data": [...],
  "meta": {
    "has_next": true,
    "next_cursor": "eyJpZCI6MTQzfQ"
  }
}
```

**Pros:** Consistent performance regardless of position, stable with concurrent inserts
**Cons:** Cannot jump to arbitrary page, cursor is opaque

### When to Use Which

| Use Case | Pagination Type |
|----------|----------------|
| Admin dashboards, small datasets (<10K) | Offset |
| Infinite scroll, feeds, large datasets | Cursor |
| Public APIs | Cursor (default) with offset (optional) |
| Search results | Offset (users expect page numbers) |

## Filtering, Sorting, and Search

### Filtering

```
# Simple equality
GET /api/v1/orders?status=active&customer_id=abc-123

# Comparison operators (use bracket notation)
GET /api/v1/products?price[gte]=10&price[lte]=100
GET /api/v1/orders?created_at[after]=2025-01-01

# Multiple values (comma-separated)
GET /api/v1/products?category=electronics,clothing

# Nested fields (dot notation)
GET /api/v1/orders?customer.country=US
```

### Sorting

```
# Single field (prefix - for descending)
GET /api/v1/products?sort=-created_at

# Multiple fields (comma-separated)
GET /api/v1/products?sort=-featured,price,-created_at
```

### Full-Text Search

```
# Search query parameter
GET /api/v1/products?q=wireless+headphones

# Field-specific search
GET /api/v1/users?email=alice
```

### Sparse Fieldsets

```
# Return only specified fields (reduces payload)
GET /api/v1/users?fields=id,name,email
GET /api/v1/orders?fields=id,total,status&include=customer.name
```

## Authentication and Authorization

### Token-Based Auth

```
# Bearer token in Authorization header
GET /api/v1/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# API key (for server-to-server)
GET /api/v1/data
X-API-Key: sk_live_...
```

### Authorization Patterns

```typescript
// Resource-level: check ownership
app.get("/api/v1/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: { code: "not_found" } });
  if (order.userId !== req.user.id) return res.status(403).json({ error: { code: "forbidden" } });
  return res.json({ data: order });
});

// Role-based: check permissions
app.delete("/api/v1/users/:id", requireRole("admin"), async (req, res) => {
  await User.delete(req.params.id);
  return res.status(204).send();
});
```

## Rate Limiting

### Headers

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000

# When exceeded
HTTP/1.1 429 Too Many Requests
Retry-After: 60
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 60 seconds."
  }
}
```

### Rate Limit Tiers

| Tier | Limit | Window | Use Case |
|------|-------|--------|----------|
| Anonymous | 30/min | Per IP | Public endpoints |
| Authenticated | 100/min | Per user | Standard API access |
| Premium | 1000/min | Per API key | Paid API plans |
| Internal | 10000/min | Per service | Service-to-service |

## Versioning

### URL Path Versioning (Recommended)

```
/api/v1/users
/api/v2/users
```

**Pros:** Explicit, easy to route, cacheable
**Cons:** URL changes between versions

### Header Versioning

```
GET /api/users
Accept: application/vnd.myapp.v2+json
```

**Pros:** Clean URLs
**Cons:** Harder to test, easy to forget

### Versioning Strategy

```
1. Start with /api/v1/ — don't version until you need to
2. Maintain at most 2 active versions (current + previous)
3. Deprecation timeline:
   - Announce deprecation (6 months notice for public APIs)
   - Add Sunset header: Sunset: Sat, 01 Jan 2026 00:00:00 GMT
   - Return 410 Gone after sunset date
4. Non-breaking changes don't need a new version:
   - Adding new fields to responses
   - Adding new optional query parameters
   - Adding new endpoints
5. Breaking changes require a new version:
   - Removing or renaming fields
   - Changing field types
   - Changing URL structure
   - Changing authentication method
```

## Implementation Patterns

### TypeScript (Next.js API Route)

```typescript
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({
      error: {
        code: "validation_error",
        message: "Request validation failed",
        details: parsed.error.issues.map(i => ({
          field: i.path.join("."),
          message: i.message,
          code: i.code,
        })),
      },
    }, { status: 422 });
  }

  const user = await createUser(parsed.data);

  return NextResponse.json(
    { data: user },
    {
      status: 201,
      headers: { Location: `/api/v1/users/${user.id}` },
    },
  );
}
```

### Python (Django REST Framework)

```python
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response

class CreateUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=100)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "created_at"]

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "create":
            return CreateUserSerializer
        return UserSerializer

    def create(self, request):
        serializer = CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = UserService.create(**serializer.validated_data)
        return Response(
            {"data": UserSerializer(user).data},
            status=status.HTTP_201_CREATED,
            headers={"Location": f"/api/v1/users/{user.id}"},
        )
```

### Go (net/http)

```go
func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeError(w, http.StatusBadRequest, "invalid_json", "Invalid request body")
        return
    }

    if err := req.Validate(); err != nil {
        writeError(w, http.StatusUnprocessableEntity, "validation_error", err.Error())
        return
    }

    user, err := h.service.Create(r.Context(), req)
    if err != nil {
        switch {
        case errors.Is(err, domain.ErrEmailTaken):
            writeError(w, http.StatusConflict, "email_taken", "Email already registered")
        default:
            writeError(w, http.StatusInternalServerError, "internal_error", "Internal error")
        }
        return
    }

    w.Header().Set("Location", fmt.Sprintf("/api/v1/users/%s", user.ID))
    writeJSON(w, http.StatusCreated, map[string]any{"data": user})
}
```

## API Design Checklist

Before shipping a new endpoint:

- [ ] Resource URL follows naming conventions (plural, kebab-case, no verbs)
- [ ] Correct HTTP method used (GET for reads, POST for creates, etc.)
- [ ] Appropriate status codes returned (not 200 for everything)
- [ ] Input validated with schema (Zod, Pydantic, Bean Validation)
- [ ] Error responses follow standard format with codes and messages
- [ ] Pagination implemented for list endpoints (cursor or offset)
- [ ] Authentication required (or explicitly marked as public)
- [ ] Authorization checked (user can only access their own resources)
- [ ] Rate limiting configured
- [ ] Response does not leak internal details (stack traces, SQL errors)
- [ ] Consistent naming with existing endpoints (camelCase vs snake_case)
- [ ] Documented (OpenAPI/Swagger spec updated)
