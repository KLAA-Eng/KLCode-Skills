# Code Review

## Scope and preparation

Pin the requested review surface: working changes, staged changes, an exact commit, or the complete merge-base diff. Include relevant untracked files. Read requirements, conventions, callers, and tests. Resolve conflicts and run relevant available checks before routine completion review. Early design or debugging review may inspect incomplete work when its status is clear. Do not silently update branches or discard edits to obtain a clean review.

Use separate review for substantive changes when delegation is available and permitted; self-review suffices for small, low-risk edits. State independent-review limitations. Follow [agent coordination](agents.md).

## Checklist

Review observable correctness, runtime compatibility, readable names, cohesive responsibilities, error handling, boundary validation, secrets, appropriate tests, and accidental debug output. Examine workload-supported performance risks: repeated queries, unbounded reads, missing pagination, and repeated expensive work. Add caching only when evidence warrants its complexity.

Functions over 50 lines, source files over 800 lines, and nesting beyond four levels prompt maintainability assessment. They are not automatic failures or instructions to split code. Generated, vendored, test, and declarative files may justify size. Findings need a concrete behavior or maintenance concern.

Apply the changed-code coverage target and test-first exceptions in [testing](testing.md). Focused security review is required for authentication, secrets, permissions, and untrusted input changes. Examine relevant database, filesystem, API, cryptographic, and financial boundaries using [security](security.md).

## Findings and completion

Each finding identifies location, trigger, harmful outcome, evidence, and practical correction. Separate defects from optional preferences; do not invent confidence percentages. Block affected completion or merge for confirmed critical vulnerabilities or data-loss hazards. Fix high-severity correctness/security defects before merging. Assess medium issues against scope and risk; low suggestions are optional. Record residual risks and blockers; review does not itself authorize merge.

Use the [review workflow](../../skills/engineering/code-review/SKILL.md), [coding style](coding-style.md), and [Git workflow](git-workflow.md).

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
