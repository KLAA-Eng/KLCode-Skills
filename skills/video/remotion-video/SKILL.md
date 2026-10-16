---
name: remotion-video
description: "Build and render React-based video compositions using Remotion frame timing, media, captions, audio and transitions."
---

# Remotion Video

Inspect the existing Remotion/React project, versions, composition duration/fps and asset paths before changing a timeline. Keep dependency versions compatible with the actual project; the bundled rules are examples, not an installation request.

Read only relevant rule files from [the rule index](references/rule-index.md). Core timeline work uses [compositions](rules/compositions.md), [metadata](rules/calculate-metadata.md), [sequencing](rules/sequencing.md), [animations](rules/animations.md) and [timing](rules/timing.md). Remotion output is frame-driven: use current frame and configured fps rather than wall-clock CSS animations that can drift in rendering.

Use the dedicated rules for media/audio, captions/transcription, type, charts, transitions or 3D as required. Three.js/React Three Fiber/Lottie/Whisper-related tools are conditional external dependencies, not bundled services. Example TSX assets are in rules/assets/; inspect imports before reuse.

Verify the actual composition duration, dimensions, frame boundaries, audio sync, media decode and final rendered file when tooling is available. Studio playback alone is not a completed render. If dependencies/browser/renderers are unavailable, report that boundary without claiming a video was produced.
