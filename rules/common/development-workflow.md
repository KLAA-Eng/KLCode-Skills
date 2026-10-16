# Development Workflow

## Research and reuse

Search repository implementations and conventions first. Check primary documentation when API behavior, versions, or compatibility are uncertain. External code searches, registries, and new dependencies are conditional on need; assess licensing, maintenance, compatibility, and integration cost. No cloud search service is mandatory.

Distinguish hard prerequisites from optional context. If missing configuration or tooling prevents correct output, identify the missing prerequisite and its available setup guidance; do not guess it or run an unrelated installer. Missing optional vocabulary or reference documents should degrade gracefully rather than trigger a mandatory setup ceremony.

## Plan and implement

Scale planning to uncertainty and risk. Small changes may need a short task plan; complex work benefits from explicit requirements, interfaces, risks, and phased acceptance evidence. Use existing task authority and docs/specs/, docs/plans/, docs/decisions/, and docs/knowledge/ rather than a mandatory document bundle.

Use test-first development by default for new testable logic and bug fixes. Follow [testing](testing.md) for exceptions, red/green evidence, and the 80% changed-code target. Respect actual runtimes and toolchains rather than introducing unsupported modern features.

## Review and finish

Run relevant checks and inspect the complete task diff. Use separate review for substantive changes when available and permitted, plus focused security review for sensitive changes. Fix material defects, record limits, and create meaningful verified local milestones. Remote actions follow task authorization.

Use [code review](code-review.md), [Git workflow](git-workflow.md), [implementation planning](../../skills/planning/implementation-planning/SKILL.md), and [implementation](../../skills/engineering/implementation/SKILL.md). Hooks are not activated by this workflow.

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
