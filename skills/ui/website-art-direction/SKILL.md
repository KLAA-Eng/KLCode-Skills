---
name: website-art-direction
description: "Explicitly selected research-led website art direction using a local direction library, source lint and browser screenshot critique. For public-facing pages rather than app dashboards."
---

# Website Art Direction

This is the explicitly selected visual direction for this surface. Apply its aesthetic rules within that scope; do not combine contradictory alternative styles. Existing brand requirements, truthful content, accessibility and reduced-motion behavior take precedence. Verify fonts, icons, dependencies and assets actually exist; source examples do not authorize installing packages or inventing evidence.

This mode uses a local researched direction library for public-facing websites, not dashboards/app screens. It chooses composition from the subject's evidence and validates the rendered result against its own house style.

Read the [art-direction protocol](references/art-direction-protocol.md). Inventory subject-specific facts and available imagery; write each section's claim and proof; deal candidate directions with scripts/draw.mjs; select a fitting direction and record redraw reasons; then implement real content and one useful interaction derived from the subject.

From the target project's root use an absolute path to this skill:

    node <skill>/scripts/draw.mjs --sector dev-tool --brief "<real brief>" --options 3
    node <skill>/scripts/draw.mjs --list sectors

The full draw writes .taste-skill/direction.json under the project and recent-draw history under TASTE_SKILL_HISTORY or the user's .taste-skill directory. Set TASTE_SKILL_HISTORY to an explicitly selected local path when global history is inappropriate. The compatibility directory name is intentional, not an upstream plugin installation.

Use [lint.mjs](scripts/lint.mjs) for source checks and [inspect.mjs](scripts/inspect.mjs) for local-browser measurements/screenshots at relevant widths. Draw/lint/assets use Node 18+; inspector needs Node 22+ and installed Chrome/Edge/Chromium. No packages are installed. Assets search needs network; image generation needs an available authorized tool. Do not invent imagery when neither is available.

Reference material is loaded by branch: [copy](references/copy.md), [type](references/type.md), [colour](references/colour.md), [layout](references/layout.md), [imagery](references/imagery.md), [motion](references/motion.md), [critique](references/critique.md), [tells](references/tells.md) and [research](references/research.md). Use the scripts to query library/ rather than reading every dataset.

Preserve existing brand through --keep palette,type and narrow --allow exceptions with recorded reasons. Found media requires source/licence/credit inspection; archive metadata is evidence, not blanket legal clearance. State browser/network/tool limitations in the final report.
