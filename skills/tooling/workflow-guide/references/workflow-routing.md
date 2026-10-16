# Select workflows by deliverable

Adapted from agent-skills using-agent-skills, ECC guide/recipes/plan-orchestrate and Matt ask-KLCode.

| Need | Canonical workflow |
|---|---|
| Resolve an unclear outcome | planning/grilling, then requirements when a durable spec is needed |
| Break accepted work into tasks | planning/implementation-planning; one authoritative ledger |
| Work spanning sessions | planning/multi-session-planning, kept independently callable |
| Implement accepted behavior | engineering/implementation |
| Fix an unknown failure | engineering/debugging; diagnose-only is a valid scope |
| Explicit test-first work | engineering/test-first-development |
| Review existing changes | engineering/code-review; separate standards/spec axes |
| Verify completion | engineering/verification; do not silently implement fixes in audit mode |
| Performance experiment | engineering/performance-optimization with baseline and correctness gate |
| Decide readiness | engineering/release-readiness; publication is distinct |
| Manage remote repo state | tooling/github-operations within task authorization |

For a plan-to-command request, emit one self-contained scoped instruction per selected step: plan/step identity, task outcome, acceptance and declared non-goals. Use only actual available command/prompt forms. A command accepting only a PR number cannot safely carry an arbitrary plan step. Mark an unsupported mapping instead of emitting an unscoped placeholder. Generating a command list does not execute the plan.

Simple tasks can enter implementation directly. A material unresolved choice may require a short interview; discovery should read what the repository already answers. Do not force every request through plan/TDD/review teams or recommend a hardcoded model. Persistent memory, agent loops, style alternatives and external integrations are explicit selections.
