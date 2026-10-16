---
name: ui-demo-recording
description: "Record a real web-application walkthrough with Playwright using discovered controls, rehearsal, visible cursor and deliberate pacing."
---

# Ui Demo Recording

Discover the actual UI, rehearse the selected flow, then record. Do not script unobserved fields or claim a successful walkthrough after a swallowed selector failure. Use a safe test/demo account and authorized environment; rehearsal can submit forms and is not read-only.

Read [discovery and rehearsal](references/discovery-rehearsal.md) for mapping controls/options, dynamic fields and selector checks. Read [recording detail](references/recording-detail.md) for pacing, cursor/subtitle overlays, panning and popup limitations.

The working [recorder](scripts/record-demo.cjs) and [helpers](scripts/demo-helpers.cjs) are adapted from the source's inline template. They require project-available Playwright and its Chromium/FFmpeg browser recording dependencies; nothing is installed automatically. Read [flow format](references/flow-format.md) before execution:

    node <skill>/scripts/record-demo.cjs <flow.json> --discover
    node <skill>/scripts/record-demo.cjs <flow.json> --rehearse
    node <skill>/scripts/record-demo.cjs <flow.json> --record

The recorder defaults to help unless a mode is explicit; it uses headless Chromium, re-injects overlays after navigation, fails required actions and refuses output collision. Discovery lists visible control metadata without submitting the flow; don't include secrets in the recorded plan or visible demo.

Inspect the final WebM for complete story order, readable content, cursor continuity, captions and actual success state. Each popup can have its own video; the single-page recorder does not silently merge them. Report actual file/duration and any missing segments rather than treating browser closure as proof of a finished demo.
