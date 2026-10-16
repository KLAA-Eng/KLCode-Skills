# Optional ports and adapters

Use when domain behavior is entangled with I/O, several entry surfaces share a use case, or infrastructure must be replaceable. Do not impose a service architecture on a small local script.

The core expresses domain rules and application use cases. Inbound ports describe supported operations; outbound ports describe needed dependencies. Adapters implement transport/persistence/vendor details. Dependency direction points toward the stable domain/use-case contract, not from domain entities into a framework.

Workflow: describe one use case and invariants; identify genuinely variable I/O; define minimal dependency contracts; implement behavior against those contracts; place adapters at the edge; wire concrete instances in a composition root. Keep DTO conversion and vendor error mapping at the boundary.

Verify domain behavior with realistic stand-ins; verify adapter contracts separately; add a thin end-to-end slice for integration risks. Avoid generic repository abstractions that hide useful domain operations or pass vendor types into the core.
