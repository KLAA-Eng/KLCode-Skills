# Testing

## Default and exceptions

Use test-first development for new testable logic and bug fixes: write a behavioral test, establish the intended failure, implement enough to pass, then refactor with checks green. Prefer independent expected values and useful regression evidence.

Documentation, visual exploration, host-bound behavior without an automated seam, and changes where automated tests add little value may use practical alternatives. Explain the exception and verify with suitable inspection, rendered evidence, reproducible manual checks, or real-host checks when available. Mocked host tests do not prove live integration.

## Coverage target

Target 80% coverage for new or substantially changed testable code. This is a changed-code quality target, not a universal repository gate. Use compatible project coverage tooling and identify scope and metric. Explain when the target is impractical or cannot be measured. Behavioral, boundary, and failure assertions matter more than a percentage; avoid implementation-mirroring tests for the number.

## Test quality and selection

Choose unit, integration, and end-to-end checks for changed contracts and risk; all three are not required for every edit. Cover relevant errors, empty values, boundaries, cancellation, and malformed input. Use actual repository runtimes and runners.

Prefer Arrange-Act-Assert and names describing observable behavior. Keep tests isolated and deterministic without unnecessary external services. Diagnose implementation defects, wrong expectations, bad fakes, and environment failures separately. Do not weaken valid assertions to pass.

Run relevant checks after refactoring and before completion. Report what ran and what remains unverified. Do not leave deliberately failing tests on a shared integration branch. Commit at verified milestones, not each test stage.

Use [test-first development](../../skills/engineering/test-first-development/SKILL.md), [verification](../../skills/engineering/verification/SKILL.md), and [test governance](../../skills/engineering/test-governance/SKILL.md).

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
