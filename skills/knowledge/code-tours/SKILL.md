---
name: code-tours
description: Create verified CodeTour JSON walkthroughs for onboarding, architecture, PRs or debugging, anchored to real repository files.
---

# Code Tours

Choose the reader and focus before writing. A tour is a narrative path: orientation, structure, real execution flow, relevant edge/gotcha and next step. Each description explains situation, mechanism, implication and the non-obvious trap.

Use [the CodeTour format contract](references/tour-format.md). Write `.tours/<reader>-<focus>.tour` with the CodeTour schema. Verify every path, line, selection and pattern; do not guess anchors. The first step must anchor to a real file or directory.

A PR tour's ref must include its new files, usually the PR branch rather than base. Omit ref for current working-tree content when uncertain. Validate a supplied ref against Git before claiming it works.

The bundled [tour validator](../../../support/knowledge/scripts/validate-tour.py) checks local JSON and anchors; it deliberately refuses to certify an unresolved ref. No CodeTour extension is required to author/validate JSON, but viewing it interactively needs a compatible editor extension. Do not modify source code as part of the tour.
