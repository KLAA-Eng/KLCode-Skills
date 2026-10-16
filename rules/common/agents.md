# Agent Coordination

Use native delegation only when available and permitted by active host and task instructions. A rule file does not install an agent or grant delegation permission.

## Roles

Choose planning, architecture, test-first, build, documentation, language, or end-to-end specialists when their expertise matches the work. Use the [orchestration workflow](../../skills/agents/agent-orchestration/SKILL.md) and its role mapping rather than assuming ECC plugin agent names exist.

Use a separate reviewer for substantive code changes when delegation is available and permitted. Small, low-risk edits may use self-review. If independent review is unavailable, report that limit and perform explicit self-review; do not call it independent. Authentication, secrets, permissions, and untrusted input changes require focused security review. See [code review](code-review.md) and [security](security.md).

## Delegation contract

- Define bounded objectives, relevant context, file ownership, acceptance evidence, and return format.
- Parallelize independent work when useful. Use disjoint write scopes or isolated checkouts; sequence dependencies.
- The delegator owns result collection, inspection, integration, and verification. A spawned task is not a completed deliverable.
- Avoid re-delegating tasks that fit one context without concrete benefit. Additional perspectives should address actual uncertainty.
- Preserve one task ledger and report unresolved findings and environmental limits.

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json). Plugin registration remains a separate phase.
