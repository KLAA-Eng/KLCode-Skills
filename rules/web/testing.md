# Web Testing

Extends [shared testing](../common/testing.md).

## Scope
Select tests from changed behavior/risk. For UI edits inspect actual renders, primary journeys, relevant states, long content and supported themes. Visual regression needs a trustworthy baseline; screenshots alone do not prove behavior.

## Accessibility
Check keyboard operation, labels, focus, contrast and reduced motion. Automated scans supplement manual interaction; report untested assistive technology honestly.

## Matrix
Use the actual supported browsers/webviews/devices. Widths 320/375/768/1024/1440/1920 are examples: choose relevant breakpoints and boundary cases. Chrome/Firefox/Safari are not mandatory for every embedded/internal app. Check overflow, zoom and touch as relevant.

## Performance
Use profiling/Lighthouse where available and relevant with selected [budgets](performance.md). Report measurement conditions and limits.

## Automation
Use existing Playwright/equivalent for critical journeys with stable locators and observable waits instead of sleeps. Test utilities, transforms and state behavior with the project runner. Shared test-first defaults and 80% target concern changed testable code; visual checks supplement behavior tests.

Use [browser testing](../../skills/engineering/browser-testing/SKILL.md) and [accessibility](../../skills/ui/interface-accessibility/SKILL.md).
