# Deep modules and seams

Depth is caller leverage: substantial useful behavior behind a small understandable surface. It is not implementation-lines divided by interface-lines. A small public signature can still leak ordering/configuration complexity.

The deletion test: if removing a wrapper eliminates complexity, it may be pass-through overhead; if complexity reappears across many callers, the module was earning its keep. Seek locality: behavior, bugs, changes and verification concentrate together.

Dependency strategy:
- In-process computation/state: test behavior directly through the useful interface.
- Local substitutable dependency: use a realistic local stand-in when it exercises the relevant contract.
- Remote owned service: a port can isolate transport; verify both behavior with a stand-in and the actual transport contract.
- True third party: inject the boundary and simulate realistic failure/response cases, with separately scoped live verification when necessary.

A seam needs a demonstrated variation, integration boundary or ownership constraint. Production + test can justify two adapters, but their existence is not proof the abstraction helps. Avoid ports for every class by habit.

Private seams may improve internal tests without expanding the public interface. Replace obsolete shallow-unit assertions only after equivalent meaningful behavior is covered; never delete failing tests merely to make a refactor green.
