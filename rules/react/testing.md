# React Testing

Extends [TypeScript testing](../typescript/testing.md) and [shared testing](../common/testing.md).

## Tools
Use existing compatible runners. React Testing Library suits DOM behavior; Vitest/Jest are options according to configuration. Browser component or E2E testing serves real layout/animation/native interactions. Multiple complementary layers are valid; do not prohibit RTL plus browser tests or adopt a new runner automatically.

## Behavior and queries
Assert what users can observe. Prefer accessible roles/names and labels, then relevant text/alt/display values and test IDs where necessary. getBy is synchronous, queryBy suits absence and findBy awaits appearance. Fix missing labels rather than using placeholders as a substitute.

## Interaction and async
Use userEvent where installed and appropriate; await its async APIs. FireEvent remains useful for lower-level cases. Wait for observable outcomes with findBy/waitFor, avoiding arbitrary sleeps. Exercise errors and cleanup rather than ignoring act warnings.

## Boundaries and setup
Use existing network interception, MSW or focused doubles according to the test boundary; MSW is not mandatory. Isolate/reset handlers and data. Reuse provider setup without leaking caches/state. Test custom hooks through their public API with compatible renderHook/act only when direct hook tests add value.

## Visuals and accessibility
Prefer meaningful assertions to large brittle DOM snapshots; focused stable snapshots remain valid. Use real-browser checks for layout, scrolling, animation, frames and clipboard behavior when needed. Automated axe checks are partial; jsdom cannot prove rendered contrast or keyboard usability.

## Coverage
Default to test-first for new testable logic and bug fixes, with shared practical exceptions. Target 80% for new or substantially changed testable code; upstream 90/85/80/70 per-layer quotas are not separate gates. Cover important journeys and failures rather than render counts or mocked React internals.

Use [browser testing](../../skills/engineering/browser-testing/SKILL.md) and [accessibility](../../skills/ui/interface-accessibility/SKILL.md).
