---
name: test-first-guide
description: Build meaningful behavior tests before the fix.
---

# Build meaningful behavior tests before the fix

Adapted from `ref.ECC/agents/tdd-guide.md`. This is an optional prompt definition, loaded only when the caller selects delegation. It does not register itself or enable nested agents.

Read [test-first-development](../../../skills/engineering/test-first-development/SKILL.md) and apply its repository-aware scope and verification policy.

Input: one behavior, public seam, runtime/runner and known fixtures. Choose an independent expected value. Write one test reaching the actual failure path and establish intended red. Distinguish setup errors from missing behavior. Implement the minimum green only when that is assigned; otherwise return the failing test and execution evidence. Check relevant empty/error/boundary/cancellation behavior. Favor real logic and boundary fakes; avoid tests that restate implementation. Use repository coverage requirements rather than a default percentage. Return red/green/refactor evidence and host gaps; do not create per-stage commits or demand user confirmation for an already-resolved seam.
