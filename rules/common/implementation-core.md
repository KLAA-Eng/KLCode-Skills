# Implementation Core

Build the simplest complete system. Trace behavior and invariants before editing. Active system, user, and repository instructions outrank these defaults.

Consider in order; accept the first option with correctness and architectural fit:

1. Reuse existing required behavior, or change nothing.
2. Extend the responsible layer, type, helper, or established pattern.
3. Use the standard library, native platform, runtime, database, or installed dependency when it owns the behavior.
4. Build a small implementation where the invariant belongs.
5. Refactor coherently when existing structure obstructs clear ownership.

Optimize total system complexity, clarity, and ownership rather than lines or files changed. A coherent wider change may be safer than a cramped patch, duplicated guard, or misplaced logic. Reuse fitting abstractions without contorting code. Fix root causes and consolidate only within the authorized task.

Avoid speculative features, extension points, single-implementation interfaces without purpose, configurable fixed values, premature services, and imagined scaffolding. New dependencies or public surfaces can be justified by design or lifecycle cost; explain material tradeoffs.

Simplicity never removes boundary validation, authorization, security, data-loss prevention, error handling, accessibility, migration/rollback safety, concurrency protection, compatibility, necessary tests, or requested behavior. Clarify unresolved material public, security, data, billing, or hard-to-reverse choices; do not add routine approval gates to already authorized work.

Run the smallest sufficient proof and apply [testing](testing.md) and [code review](code-review.md). Report changes, evidence, unresolved risks, and material omissions. Stop when the task is satisfied. See the [implementation workflow](../../skills/engineering/implementation/SKILL.md).

Adapted from Caveman native-core; see [source coverage](../../consolidation/rules-common-audit.json).
