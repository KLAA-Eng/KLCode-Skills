# Conditional Python review checks

- Trace attacker-controlled SQL/process arguments, eval/exec, deserialization and loader settings to a reachable unsafe effect. Use [filesystem boundaries](path-boundaries.md) when confinement is required; matching an API name alone is insufficient.
- Inspect cleanup and rollback on success/error for files, locks, transactions and host resources. Broad exception handling at a recovery boundary can be legitimate; swallowed failures that hide requested work need a concrete consequence. Use runtime-supported context management or the host's explicit cleanup contract.
- Check mutable defaults, class/instance state, shallow copies and iterator/generator lifetime for unintended sharing or exhaustion.
- Trace actual shared-state invariants, event-loop blocking, lost task exceptions, cancellation and shutdown ownership. Choose locks/process isolation for the host/workload; a GIL does not make multi-step invariants atomic.
- Respect actual syntax and library support. Unsupported annotations/dataclasses/async syntax are compatibility defects on constrained hosts; omitted annotations are not universally a defect on supported hosts either. Follow project typing contracts.
- Establish workload evidence for N+1 access, repeated expensive work or materialization; a loop/comprehension/concatenation preference alone is not a performance regression.
- Apply Django/Flask/ASGI transaction/validation/response checks only when that framework exists. Keep the existing formatter, tests and interpreter; missing tooling does not authorize a replacement stack.
