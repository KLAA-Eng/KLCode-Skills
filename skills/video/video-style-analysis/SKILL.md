---
name: video-style-analysis
description: "Measure reference footage into a reusable color, cadence, still and overlay style pack, with optional separately selected semantic description."
---

# Video Style Analysis

Use the actual reference videos to build a named pack; keep unrelated genres separate. A measured zero differs from absent data. Preserve original media and record provenance/rights before deriving imagery or overlay plates.

Local numeric analysis uses scripts/mint.py with Python, the packages in [requirements.txt](scripts/requirements.txt), and FFmpeg/ffprobe as required. From the target project, with an absolute skill path:

    python <skill>/scripts/mint.py --genre <name> --refs a.mov b.mov --root stylepacks

Read [measurement](references/measurement.md) for luminance-zone chroma, robust statistics, UI masking, cadence and LUT limitations. The output includes grade/cadence JSON, look.cube, stills/plates and pack manifest. Verify actual files and measurements; a metadata-only fixture is not a complete usable LUT/media pack.

Optional scripts/distill.py creates a semantic description grounded in that pack. --dry-run remains local/credential-free; live VLM calls additionally need requirements-live.txt, credentials and explicitly selected TASTE_FORGE_ALLOW_LIVE=1. A grounded description is not an independent validation of the measurements. Do not infer saved provider workflow state from a local graph/template.

Hand the pack to [video-style-editing](../video-style-editing/SKILL.md) or a colorist. Report measured targets, masks/crops, source limitations and what was actually generated. Historical source measurements illustrate techniques rather than guaranteeing numeric performance on new footage.
