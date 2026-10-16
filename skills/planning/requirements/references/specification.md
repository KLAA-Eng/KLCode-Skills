# Acceptance and capability contract

Use only the sections needed for the change.

## Identity and scope
Title, source, revision/status, actor, observable goal, success signal, included behavior, non-goals and explicit assumptions.

## Evidence and policy
Distinguish inspected technical facts from user/product-supplied rules. Do not infer retention, compliance, pricing, business priorities or SLAs from code.

## Capability boundaries
For independently testable capabilities: stable IDs, responsibility, consumers, dependency direction and build order. Avoid cycles; shared behavior needs one clear owner. Each capability gets its own scoped specification when useful.

## Acceptance criteria
| ID | Condition/action | Observable result | Prohibited effect | Evidence method | Priority |
| --- | --- | --- | --- | --- | --- |
| AC-001 | Concrete starting state and trigger | Measurable behavior | Only when meaningful | Relevant automated/manual/operational check | Required/important/optional |

Criteria need not map one-to-one to tests. Include applicable malformed inputs, denied actions, failure recovery, repeated/concurrent operations, compatibility and usability. Define performance conditions and thresholds only when real requirements exist.

## Full capability detail
- Actors and UI/API/operator surfaces.
- States and allowed transitions, including failure states.
- Inputs, outputs, required side effects, recovery and idempotency.
- Persistent-data ownership, migration/read compatibility, retention requirements supplied by the owner.
- Trust boundaries, permissions and policy.
- Rollout/rollback requirements and irreversible effects.
- Implementation decisions already settled; unresolved options remain explicit.
- Testing seams: prefer existing externally meaningful interfaces. Proposed new seams need actual variation, not test scaffolding alone.
- Blocking questions and handoff: ready to implement, needs architecture, or needs product clarification.

For conversation synthesis, preserve decisions rather than generating a new interview or padding a long story list. Useful stories express actor, capability and benefit; quantity is not quality. Keep transient file/line references in evidence notes, while stable behavior and interfaces remain durable in the spec. Decision-rich prototype snippets may be retained with provenance.
