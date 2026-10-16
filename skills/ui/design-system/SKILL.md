---
name: design-system
description: "Extract or audit visual tokens and component consistency from an existing interface; produce a maintainable design specification, token data and preview."
---

# Design System

Choose extraction, consistency audit or token-system creation according to the request. Existing brand and project conventions take priority over a new aesthetic.

Inspect actual styling/resources: colors, type roles, spacing, radii, shadows, density and breakpoints/window constraints. Cluster repeated values before proposing replacements; distinguish intentional exceptions from drift. For WPF/Avalonia inspect resources/styles/templates rather than assuming CSS.

For a new system, produce the requested maintained artifacts: semantic token data, a DESIGN.md rationale and an interactive preview where useful. Map functional roles (canvas, surface, text, muted text, accent, focus, error) rather than collecting unexplained swatches. Reuse existing file formats and locations; do not overwrite a project DESIGN.md that serves another purpose.

For an audit, provide observed examples and file locations, severity/user impact, recommended fixes and the validation path. Read [audit dimensions](references/audit-dimensions.md) for color/type/spacing/component/state consistency. Numerical scores are optional comparison aids, not proof of usability.

Validate representative components and their interaction states against the tokens. Accessibility remains a separate observable requirement. An external competitor/site service is optional; local project evidence can support the entire workflow.
