# TypeScript and JavaScript Testing

Extends [shared testing](../common/testing.md).

## Behavior
Keep the existing Node runner, Vitest, Jest or equivalent. Default to test-first for new testable logic and bug fixes with practical exceptions; target 80% for new or substantially changed testable code, not a repository gate.

## Browser flows
Use installed Playwright or suitable browser tools for critical browser journeys. Pure utilities and native host behavior need their respective layers; Playwright is not a universal JavaScript test framework. Use stable role/label locators, observable waits and isolated fixtures.

Use [browser testing](../../skills/engineering/browser-testing/SKILL.md), replacing the unregistered upstream e2e-runner reference.
