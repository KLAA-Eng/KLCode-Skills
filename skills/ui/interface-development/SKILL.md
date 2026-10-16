---
name: interface-development
description: "Build or improve usable interfaces with coherent hierarchy, interaction states and rendered verification. Use for general UI implementation; visual style alternatives are selected separately."
---

# Interface Development

Start with the interface's job, primary action, audience and actual platform. Use the existing components, tokens and interaction conventions before proposing a new system. Web CSS/React examples are conditional references; for WPF/Avalonia or other native UI use native layout, focus and accessibility APIs.

1. Inspect the current implementation and a relevant local example. Choose a short design contract: screen purpose, information hierarchy, required actions, density and target viewport/window constraints.
2. Define applicable loading, empty, error, partial, success and permission states with their trigger, feedback and recovery. Do not invent states or record unavailable checks as passed.
3. Implement the behavior and layout together. Separate data/state coordination from presentation when useful. Prefer composition over an unbounded configuration component; select the smallest state mechanism that fits actual sharing needs.
4. Use semantic roles, connected labels, keyboard operation, visible focus and suitable contrast. Read [interface-accessibility](../interface-accessibility/SKILL.md) for accessibility work. Preserve reflow and zoom; avoid hiding overflow to conceal inaccessible content.
5. Inspect actual renders at the relevant sizes, exercise primary actions, and check long labels and content/state variants. Correct observed hierarchy, alignment, wrapping and interaction problems before completion. Report unavailable visual checks explicitly.

Read [engineering patterns](references/engineering-patterns.md) for component/state/web layouts, [design direction](references/design-direction.md) for reference-led choices and evidence records, and [detail polish](references/detail-polish.md) for optics, radius, spacing and motion. Read only the branch needed by the task.

For a substantial UI change the optional [evidence checker](scripts/check-evidence.js) validates the completeness and local artifact paths of a selected report, not the truth or quality of its screenshots. This is not a mandatory ceremony for a small style edit. Existing project checks and real rendered evidence remain authoritative.

Style alternatives such as minimalist-ui, premium-web-design and industrial-brutalist-ui are explicitly selected. Their font, palette and surface preferences are not foundation rules. Do not impose marketing layouts or decorative animation on a data-heavy tool.

For web interfaces, apply [web / coding style](../../../rules/web/coding-style.md), [web / design quality](../../../rules/web/design-quality.md), [web / hooks](../../../rules/web/hooks.md), [web / patterns](../../../rules/web/patterns.md), [web / performance](../../../rules/web/performance.md), [web / security](../../../rules/web/security.md), [web / testing](../../../rules/web/testing.md).

For JavaScript/TypeScript work, apply [typescript / coding style](../../../rules/typescript/coding-style.md), [typescript / hooks](../../../rules/typescript/hooks.md), [typescript / patterns](../../../rules/typescript/patterns.md), [typescript / security](../../../rules/typescript/security.md), [typescript / testing](../../../rules/typescript/testing.md).

When the actual interface uses React, apply [react / coding style](../../../rules/react/coding-style.md), [react / hooks](../../../rules/react/hooks.md), [react / patterns](../../../rules/react/patterns.md), [react / security](../../../rules/react/security.md), [react / testing](../../../rules/react/testing.md).
