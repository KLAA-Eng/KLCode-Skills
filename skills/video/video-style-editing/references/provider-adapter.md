## Recovered fal Platform Behavior

These observations and endpoint examples came from the recovered workflow.
Recheck current endpoint metadata; they are not guarantees about every future
provider version. The bundled graph templates record the separately verified
workflow inputs, including explicit generated-audio control.

These cost real time to discover. Check them before designing a graph.

| Limit | Detail |
|---|---|
| **No 3D renderer at all** | fal has `image-to-3d`, `text-to-3d`, `3d-to-3d` and nothing else. Every `3d-to-3d` endpoint emits another mesh. There is no `3d-to-image`/`3d-to-video` category, so a minted GLB **cannot** re-enter a fal video graph. Render locally, then use `fal-ai/ffmpeg-api/images-to-video`. |
| **compose cannot overlay** | `fal-ai/ffmpeg-api/compose` rejects a second track with *"Multiple video tracks are not supported"* — and it counts an `image` track as a video track. It sequences one video track only. **Composite locally with ffmpeg.** |
| **compose keyframes are milliseconds** | Nothing in the response says so. A run submitted in seconds is accepted and returns a video that is 1000x too short. |
| **extract-frame offers first/middle/last only** | No arbitrary timestamp. Use the three as three distinct conditioning images. |
| **No loops, no string concat in the DAG** | Per-shot fan-out has to be authored node by node, or kept local. |
| **Kling 3.0 has no reference-to-video** | The v3 line is text/image/motion-control only; reference-to-video lives on the `o3` line: `fal-ai/kling-video/o3/pro/reference-to-video`. |
| **Prefixes are not uniform** | `bytedance/*`, `tripo3d/*`, `meshy/*`, `minimax/*`, `openai/*` carry **no** `fal-ai/` prefix. `kling-video`, `veo3.1`, `flux-*`, `hunyuan-3d`, `ffmpeg-api` do. |

### Endpoint picks

| Slot | Best | Value alternative |
|---|---|---|
| reference→video | `bytedance/seedance-2.5/reference-to-video` (~$0.473/s @720p) | `fal-ai/kling-video/o3/pro/reference-to-video` (~$0.112/s) |
| image→3D | `fal-ai/hunyuan-3d/v3.1/pro/image-to-3d` ($0.375, up to 8 views) | `tripo3d/h3.1/image-to-3d` ($0.20) |
| text→3D | `fal-ai/hunyuan-3d/v3.1/pro/text-to-3d` | `tripo3d/h3.1/text-to-3d` |
| retopology | `fal-ai/hunyuan-3d/v3.1/smart-topology` ($0.75) | `tripo3d/tripo/remesh` (~75x cheaper) |
| part split | `fal-ai/hunyuan-3d/v3.1/part` (FBX only) | `tripo3d/tripo/segment` |
| text→image | `fal-ai/nano-banana-pro` ($0.15 flat) | `fal-ai/flux-2-pro` ($0.03/MP) |

Seedance is ~4x Kling o3's price for the same 5 seconds. It earns that on
multi-reference fidelity (up to 50 mixed image/video/audio refs) and does **not**
earn it when conditioning on a single still.

Model IDs and prices drift. Verify against fal.ai/models before promising any of
them.


## The 3D Branch

```bash
python mint3d.py --genre <name> --from-stills 4 --retopo --render
python mint3d.py --genre <name> --prompt "a cracked chrome visor" --render
```

- **Generate a clean plate first; do not lift from reference stills.** The
  endpoint's stated input requirement is simple background, single object,
  object >50% of frame. Reference reels are the opposite of that — collages,
  wide shots, several subjects, burnt-in graphics — and they produce sculpted
  noise. Text → single-object plate → mesh costs ~$0.15 extra and is the
  difference between a usable mesh and a discarded one.
- **Multi-view is named per-angle fields, not a list.** `input_image_url` (front,
  required), then `back_image_url`, `left_image_url`, `right_image_url`,
  `left_front_image_url`, `right_front_image_url`, `top_image_url`,
  `bottom_image_url`. There is no `input_image_urls` and no `multi_view` flag —
  inventing them degrades every mint to single-view while appearing to work. A
  wrong angle label is worse than omitting the view, because the model trusts it.
- **Address the GLB by key, not by position.** The response carries a `thumbnail`
  PNG and a `model_urls` block alongside `model_glb`; taking the first URL works
  only until the keys reorder, and a preview PNG downloads fine — nothing fails
  until Blender refuses to open it.
- **Request PBR maps.** Without them the mesh lights like painted cardboard.
- **Retopologise** if anyone will edit or rig it. Generated meshes are dense and
  chaotic.
- **Render locally to close the loop.** Once a turntable is frames, it is
  footage, and every downstream stage already handles footage — grade it, cut it,
  screen it as an element, or upload it as a conditioning reference. Use Blender
  when a binary is on PATH; keep a dependency-light software rasteriser as the
  default, because a headless GL context is the single most common thing missing
  from a container and a renderer that only works on a workstation is not part of
  a pipeline.
