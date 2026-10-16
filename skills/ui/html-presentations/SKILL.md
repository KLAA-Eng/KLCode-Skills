---
name: html-presentations
description: "Create, enhance or convert a presentation into responsive HTML slides with viewport-fit checks, keyboard navigation and reduced motion."
---

# Html Presentations

Create, enhance or convert an HTML presentation. Default to a self-contained local HTML file unless existing project architecture or the user requests otherwise.

Read [presentation workflow](references/presentation-workflow.md) and [STYLE_PRESETS.md](STYLE_PRESETS.md) before substantial deck work. Preserve the message and content before styling; use a small visual sample to establish direction when the user has no preset. Reuse [html-template.md](html-template.md), [viewport-base.css](viewport-base.css) and [animation-patterns.md](animation-patterns.md) only as needed.

Each slide fits the viewport with readable content. Split dense material rather than hiding it in scrollbars or shrinking text. Implement keyboard/touch navigation and a current-slide indicator, semantic headings, focus behavior and reduced motion. Validate portrait, landscape and the likely presentation screen sizes.

For .pptx conversion, [extract-pptx.py](scripts/extract-pptx.py) preserves order, text, notes and extracted media; it requires python-pptx. It does not parse legacy binary .ppt: convert that format using an available presentation application first. Explain missing prerequisites before claiming extraction succeeded.

The optional [PDF exporter](scripts/export-pdf.sh) requires Bash, Node/npm, Playwright and Chromium. It can download dependencies only when the user explicitly selects downloads and KLCODE_ALLOW_DEPENDENCY_DOWNLOAD=1 is set. Do not execute it to inspect the skill. No presentation is published or browser window opened as a side effect of creating the file.

Deliver the actual file, slide count, chosen style and observed viewport/navigation checks, with unavailable checks identified.
