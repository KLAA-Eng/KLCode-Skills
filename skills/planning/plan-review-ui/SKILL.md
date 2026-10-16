---
name: plan-review-ui
description: Review a local Markdown or HTML artifact in an optional browser canvas with annotations, chat and explicit verdicts.
---

# Plan Review Ui

This is a review interface, not a required approval gate or an implementation workflow. It serves local artifacts only; do not use it for arbitrary remote URLs or application testing.

The imported [CLI](../../../support/planning/scripts/plan-canvas.js) and its complete local modules are bundled. Requires Node.js 18+ and a browser; there are no npm dependencies. Resolve that CLI to an absolute path and run from the project being reviewed:
```text
node <absolute-cli> open docs/plans/<topic>.md
node <absolute-cli> await docs/plans/<topic>.md --timeout-ms 30000
node <absolute-cli> await docs/plans/<topic>.md --reply "Updated the dependency order." --timeout-ms 30000
node <absolute-cli> end docs/plans/<topic>.md
```
Use a background listener when supported, or bounded waits that let you communicate and resume. Read [the feedback/session contract](references/review-loop.md) before starting a review.

The server is loopback-only. State defaults to the OS temporary directory under `klcode-plan-review`; set `ECC_PLAN_CANVAS_STATE_DIR` for an explicit private persistent location. No hooks are enabled. Markdown diagrams optionally load a pinned Mermaid CDN; unavailable diagrams remain visible as source, and a local mirror can be configured.

Approval settles this artifact's review only; it does not grant unrelated remote actions. After a verdict hand back to the workflow/task already authorized. Never infer approval from silence or a closed window.
