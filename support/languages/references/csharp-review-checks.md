# Conditional C#/.NET review checks

- Trace SQL/process argument construction across actual trust boundaries. Prefer supported argument-array APIs with shell execution disabled where appropriate; generic “sanitize input” does not define a safe boundary.
- `TypeNameHandling` belongs to **Newtonsoft.Json/Json.NET**. For untrusted input, inspect metadata handling and type binder/allowlist before assessing type-instantiation risk. **System.Text.Json has no `TypeNameHandling` setting**; inspect its explicit polymorphic contracts and converters separately. Determine the actual namespace/settings first. Unsafe BinaryFormatter use likewise needs its real input trust path assessed.
- Use [component, physical and race boundaries](path-boundaries.md), including Windows junction/reparse behavior. A full-path string prefix does not confine access.
- Trace synchronization context, UI/host thread affinity, transactions, cancellation, failure observation and shutdown. Async event handlers may legitimately return void; missing ConfigureAwait(false) alone is not a bug. Explain the actual deadlock/lost failure.
- Check ownership/disposal of streams, handles, subscriptions and scoped services. Respect target support for using/await using and caller-owned objects.
- Inspect nullability, cast invariants and public contracts. Records, sealed classes, immutable DTOs and avoiding dynamic are choices constrained by serializers/binding/interop, not universal correctness rules.
- Demonstrate hot-path allocation, repeated enumeration, query N+1 or tracking consequences before recommending a fix. ToList can be unnecessary allocation for an already safe collection.
- Apply ASP.NET auth/validation/middleware, EF or Blazor lifecycle checks only to present surfaces. Existing framework/test/assertion-library choices and licensing remain authoritative.
