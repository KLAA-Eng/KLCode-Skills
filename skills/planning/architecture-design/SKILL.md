---
name: architecture-design
description: Design module interfaces and testable boundaries; choose ports/adapters or ranking-pipeline structure only when those specializations fit.
---

# Architecture Design

Prefer substantial behavior behind a small understandable interface. An interface includes invariants, ordering, error behavior, configuration and performance assumptions, not just public signatures.

1. Identify callers, observable behavior and the actual sources of variation. Keep change and verification local.
2. Use [deep modules and dependency seams](references/module-design.md) to compare interface leverage, locality and testability. Do not create a port merely because a diagram looks cleaner.
3. For decoupling domain behavior from I/O, use [ports and adapters](references/ports-and-adapters.md). For recommendation/ranking work, use [candidate pipelines](references/candidate-pipeline.md). These are explicit specializations, not universal templates.
4. If alternatives are consequential, use [design alternatives](references/design-alternatives.md); independent agents may explore different constraints where available. Sequential alternatives are valid too.
5. Record the selected shape and tradeoffs under `docs/plans/<topic>-design.md`; durable rationale belongs in [decision records](../../knowledge/architecture-decisions/SKILL.md). Hand implementation to its own workflow.

Use existing domain vocabulary without banning common technical terms. The adapted [architect brief](../../../support/planning/agents/architect.md) is available for delegation.

Apply the relevant shared rules: [common / coding style](../../../rules/common/coding-style.md), [common / patterns](../../../rules/common/patterns.md).
