---
name: interface-accessibility
description: "Audit or implement keyboard, focus, labeling, semantic structure, contrast and reduced-motion support in interfaces. Use for accessibility-specific reviews and fixes."
---

# Interface Accessibility

Audit the real interaction path, not just markup or a lint score. Preserve the project's target accessibility standard and existing component primitives.

Check semantic controls and landmarks; programmatic names and visible labels; associated errors/help; logical keyboard order; focus visibility and restoration; contrast and non-color cues; meaningful image alternatives; zoom/reflow; dynamic status announcements; and reduced-motion behavior. Decorative media may have empty alternatives; meaningful media needs descriptive text.

Read [web patterns](references/web-patterns.md) for connected forms, modal/focus, keyboard, live regions and motion examples. Prefer native controls to custom role simulation. Adding aria-hidden does not remove an element from keyboard navigation; remove inactive content from interaction or manage its focus explicitly.

For native desktop interfaces use the toolkit's automation names/roles, focus traversal, high-contrast support and platform accessibility inspector. Do not paste HTML/ARIA attributes into XAML and claim coverage.

Verify the requested path using keyboard-only operation and appropriate assistive tooling when available. Record what was actually exercised, which states remain untested and any platform limits. Automated checks complement inspection; they cannot prove the full experience is accessible. Use the [checklist](../../../support/ui/references/accessibility-checklist.md) as a conditional reference.
