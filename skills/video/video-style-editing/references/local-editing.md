## Execution and Delivery Contract

The original implementation ships here in `scripts/`; no separate `ito-video`
checkout is required. Install `scripts/requirements.txt` for local processing.
Install `scripts/requirements-live.txt` only for provider execution. Live
uploads, submissions and downloads require explicit `TASTE_FORGE_ALLOW_LIVE=1`
in addition to credentials; set it only for the user's authorized run.
`--dry-run` remains credential-free and produces labelled placeholders.
An ambiguous provider timeout is not retried as a new paid job. Inspect the
provider request before deciding whether another submission is warranted.

Use existing completed takes without any provider calls:

```bash
python scripts/pipeline.py --genre example --root stylepacks \
  --takes media/take-a.mp4 media/take-b.mp4 --duration 12 --fps 30 \
  --out out/review-v1.mp4
```

`--duration` is a **best-effort cadence target**, not an exact runtime. Complete
shots may produce a shorter or longer edit; the assembler does not duplicate
clips or add padding to meet the target. The output manifest retains actual
`duration` and adds `duration_contract` with requested and actual seconds,
shortfall, overrun, and the `cadence_target` policy. Differences of at least
one output frame are warned explicitly. No exact-duration mode is provided;
when an exact runtime is required, inspect the receipt and revise or reject
the cut before delivery.

The pipeline keeps each run's graded shot files because the editable FCPXML
and EDL reference them. It refuses output collisions and reports timeline
export failures. A completed render is not a saved editor project or creative
approval. Preserve source assets and versioned project checkpoints before
and after live edits; record the saved path and digest separately from the
in-memory timeline receipt.

Clone-ready Fal graphs and their offline input compiler are documented in
`workflows/README.md`. Compile brief and style direction before submission;
do not assume a disconnected schema field affects a model prompt. Validate
current endpoint fields against the actual provider before a paid run.

For Blender, use the full textured source GLB; retopology is a separately
named derivative and never replaces that source. `blender_prop.py` supports
explicit `--width 1920 --height 1080 --fps 30 --receipt receipt.json` and
preserves pack-derived rim lighting and material textures. Saving a scene is
distinct from rendering it; inspect the receipt's state and packed images.

For Resolve overlays, use `taste.resolve.apply_placements` with injected
objects from an explicitly selected, versioned target. Set `source_end_mode`
to the convention verified on that host. Do not assume an inclusive source
end across Resolve versions. The adapter allocates overlapping effects above
preserved tracks and checks every placement immediately and again after all
appends. Composite integers must match the installed API; for the verified
Studio 21 host, Screen is 5, not the historical builder's incorrect 22.
The receipt proves in-memory placement only. Save the project, verify its
checkpoint, then inspect the exact rendered output before reporting delivery.


## Division of Labour

**The model supplies content, motion, framing and lighting structure. The pack
supplies colour and rhythm.** This is measured, not stylistic preference — see
taste-distillation for the numbers. Practical consequences:

- The generation prompt contains **zero colour language**. Add
  *"Colour: none. Render neutral. Grading is applied afterwards."*
- Keep **two separate flags**: `--brief` (what HAPPENS: subject, action, place)
  and `--style-steer` (how it LOOKS). Merging them leaks style words into the
  scene ("teal" becomes a teal object) and subject words into the grade.
- The model responds to **local, checkable rules** far better than global ones.
  "Backgrounds pure black and unlit; subjects blowing toward white" works;
  "extreme contrast" does not.


## Generate TAKES, Not Shots

The obvious reading of "match the cadence" is one generation per shot. It is
economically absurd. A reference averaging 0.78s/shot against an endpoint with a
4-second floor turns a 10s piece into **12 calls, 48 generated seconds for 10
used (21% efficiency)**, and twelve unrelated clips stitched into what should
read as continuous.

Editors roll a longer take and cut inside it. Grouping shots into ~5s takes:
**3 calls, 13 generated seconds, 77% efficiency**, and consecutive shots that
actually belong to each other because they came from the same generation.

Tell the model what shape you want, or it renders a slow locked-off push and six
cuts inside it read as a stutter:

> "Filmed as ONE continuous take with no hard cuts inside it. It will be cut into
> 6 pieces of roughly 0.8s in the edit, so the framing, subject and light must
> keep changing throughout — any 0.8s window has to stand alone as its own shot."


## Cutting Rules

- **Re-encode, never stream-copy.** Stream copy only cuts on keyframes, which at
  0.78s mean shot length rounds every boundary to the nearest GOP — destroying
  the exact thing the pipeline exists to preserve.
- **When supplementing existing footage, use its own shot boundaries.** Slicing a
  base video into contiguous pieces and playing them in order just reassembles
  the original: every "cut" lands mid-shot and is invisible. Measured, a 20-shot
  assembly registered only 12 detected cuts. Detect real boundaries and take
  every Nth so consecutive picks are guaranteed discontinuous. That moved a cut
  measurement from 1.29s to 0.83s against a 0.78s target.
- **Sample shot lengths from the reference's distribution**, not from its mean,
  so the cut inherits rhythm variance instead of flattening to even clips.


## Grading Rules

- **Direct measurement beats a baked LUT** when you have the clip: measure it,
  match its L\* CDF, apply zone chroma. `grade_clip_direct` reached MAE 1.58 and
  contrast 34.0 against 34.7.
- **Anchor, do not CDF-match, when the clip's histogram is unlike the
  reference's.** Forcing a 68%-black generated clip onto a busy reference
  histogram lifted the entire background out of black: background preservation
  fell to 26.0% (CDF) versus 69.0% (anchor), while MAE and contrast both still
  looked excellent. Default to anchored tone.
- **Batch size matters.** Grading 48 frames at once OOM-killed the process;
  6 is safe.


## Overlay Plates Are Elements, Not Washes

A glow plate is ~4% covered by construction. Composite it at frame size and you
get a small bright dot parked mid-shot - it reads as a sticker, and it was
visible in a delivered cut as an unexplained coloured blob.

- **Tighten each plate to its alpha bounding box first.** That raises coverage
  from ~4% to 15-35% and hands size control to the caller instead of inheriting
  whatever fraction of the source frame the element happened to occupy.
- **Choose wash vs element by coverage.** Diffuse plates (<10% after tightening)
  work stretched full-frame at low opacity; concentrated ones want to be scaled
  to 35-70% of frame width and placed.
- **Vary placement, scale and rotation per shot** from a seeded RNG, so the cut
  stays reproducible but no two stamped shots share a mark. One plate in one
  spot every Nth shot reads as a watermark.
- Resolve element geometry in Python, not in ffmpeg expressions: `pad()` rejects
  a negative offset and cannot pad below its input size, so an oversized or
  off-frame element kills the whole filtergraph.
