---
name: video-style-editing
description: "Grade, cut and assemble local or explicitly generated video against a measured style pack, preserving editable media, timing and delivery evidence."
---

# Video Style Editing

Select pack, source takes, output geometry/fps and the actual deliverables. Local takes are supported without provider calls:

    python <skill>/scripts/pipeline.py --genre example --root stylepacks --takes take-a.mp4 take-b.mp4 --duration 12 --fps 30 --out out/review-v1.mp4

Use [local editing contract](references/local-editing.md) for cadence cuts, anchored grade, UI/crop normalization, overlay geometry and editable handoff. Local processing requires scripts/requirements.txt and FFmpeg/ffprobe. --duration is a cadence target, not an exact runtime: inspect requested versus actual duration in the manifest. Refuse output collisions and preserve graded shot files referenced by FCPXML/EDL.

The bundled tasteforge package supplies local pack/schema/interview/workflow/receipt/Resolve/media adapters. From scripts/ use python -m tasteforge --help. Its default provider registry is empty/fail-closed; CLI metadata/plan operations do not authorize provider work. The [metadata-only fixture](scripts/tasteforge/fixtures/flashethereal/) omits source media and look.cube deliberately.

Platform boundary: the protected multimodal asset/receipt/output workflows require POSIX O_NOFOLLOW/O_DIRECTORY/O_NONBLOCK protections and are unavailable on native Windows. Use a supported WSL/Linux/POSIX environment for those paths; do not disable the protections to make them run. Portable pack/schema/timeline/Resolve planning helpers are separate from that secure filesystem path. Numeric media processing also needs its scientific packages and FFmpeg before a real render can be verified.

For a separately selected generated-take branch, read [provider adapter](references/provider-adapter.md) and [workflow graphs](workflows/README.md). Credentials and TASTE_FORGE_ALLOW_LIVE=1 are additional gates, not substitutes for task authorization. Use explicit brief versus style-steer, recheck current endpoint/schema/rates and never repeat an ambiguously accepted paid job blindly. --dry-run creates labeled plans/placeholders rather than claiming real generated media.

For 3D/Resolve operations read [editor handoff](references/editor-handoff.md). Blender, Resolve or CapCut are external runtimes, not installed by this skill. Preserve textured originals, versioned project checkpoints and explicit target selection. In-memory placement, saved project, rendered video and artistic acceptance are distinct evidence.

Inspect the exact render, check timing/audio/visual result and validate editable asset references before declaring delivery. Source performance anecdotes and recovered platform behaviors are historical observations, not current service guarantees. A useful handoff template is [HANDOFF-TEMPLATE.md](scripts/HANDOFF-TEMPLATE.md).
