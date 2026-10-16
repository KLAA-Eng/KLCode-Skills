## The Measurements That Matter

### Chroma by luminance zone, not globally

Colour identity usually lives in **one luminance band**. A global a\*/b\* offset
mathematically cannot represent split-toning. Measure chroma inside zones
(`L* edges [0,15,35,55,75,100]`).

A real signature: violet at L\*25 (a\* +24.9, b\* −17.5), near-neutral at both
ends. Reporting only the darkest and lightest zones calls that "uniform cast" —
**always print the whole curve.**

### Median + MAD, never mean + std

Chroma in real reference sets is strongly right-skewed. On one measured reel the
mean midtone chroma was 36.9 against a median of 17.5, so a mean-based LUT pushed
colour ~3x harder than the material warranted.

### Contrast is std(L\*), not white minus black

The white−black range is ~100 on almost any real footage and discriminates
nothing.

### Background share is a first-class statistic

Record the share of pixels below L\*10. No moment of the distribution can see it:
a clip can hold the right mean, std and chroma while its blacks have been lifted
into grey. This is exactly how a grade once scored MAE 1.88 / contrast 33.7 while
the actual frame was a muddy purple mess.

### Mask the interface before measuring

Screen-recorded references carry static furniture — letterbox bars, a status bar,
a like icon, caption text. All of it lands in the statistics as if it were the
look: black bars inflate shadow weight, a red heart skews a\* toward magenta.
**Use the bundled content-mask/crop algorithm and inspect its result** — the footage moves, the interface
does not — so no hand-tuned crop is needed. On real material this keeps ~65% of
pixels.

### Cadence needs an adaptive threshold

The right content-detector threshold is material-dependent: a high-contrast
action reference cuts hard enough for 30, a moody one hides its cuts under it.
Sweep descending thresholds and take the **highest** one that still recovers ≥90%
of the shots the most sensitive setting finds — that biases toward real cuts over
noise. Reject thresholds implying an absurd cut rate (>100/min); continuous
camera moves trip the detector every frame.

Run the whole sweep in **one decode pass** with a shared `StatsManager`. The
naive version re-decodes per threshold, which on 60fps source is the difference
between seconds and minutes.

## Overlay Plates: Assets, Not Screenshots

A still is a whole frame — compositing one just puts a second picture on top.
A **plate** is the reference's graphic vocabulary (flares, streaks, glitch
fragments) lifted onto black so it screen-blends with no keying.

Two traps, both hit on real material:

1. **Absolute thresholds fail.** On a bright reference an `L>55 AND chroma>12`
   selection takes ~90% of frame, and the "plate" is the picture — including a
   recognisable face. Select by **percentile** (~top 3%) and **reject any plate
   covering more than ~22% of frame.**
2. **Rank by separation, not by brightness.** "Share of bright saturated pixels"
   ranks a washed-out frame top and a black frame with one intense flare — the
   actual signature — near the bottom. Score `p99.5(energy) / median(energy)`.

Also mask before scoring: burnt-in typography is bright, saturated and
high-contrast, so an unmasked run yields a perfect plate of someone else's title
card.

## Grounding the VLM

Feed the measurements into the system prompt before asking for a description.
Ungrounded, a VLM will report "no apparent colour grading, neutral" on footage
with a +24.9 a\* cast. Grounded, it describes the cast correctly and infers the
secondary accent independently.

Ban hedging words (`varied`, `mixed`, `dynamic`, `some`, `often`, `neutral`,
`or`) — a model cannot render "varied lighting". **Enforce the ban in code, not
just in the prompt:** it was violated in roughly one run in three. Re-ask
per-field, keep the least-hedged answer after N attempts rather than failing.

Caveat worth stating to the user: once the spec is grounded in the measurements
it is no longer an independent check on them.

## LUT Baking Gotchas

- A LUT can only encode a **per-pixel RGB function**. Anything
  distribution-dependent (histogram matching, percentile anchors) must be reduced
  to a constant *before* baking, or it silently measures the uniform LUT grid
  instead of the footage.
- `cv2.cvtColor(LAB2RGB)` **clamps internally**, so an out-of-gamut test using it
  reports 0%. Convert Lab→linear sRGB by hand; a real measurement was 83.3% OOG.
- Offset chroma transfer, not affine. Affine divides by the source σ and
  overshoots — on real footage it flipped b\* to +11.6 against a −17.5 target.
  Offset took MAE from 6.23 to 2.13.
- Gamut compression cost 3.8x runtime for identical MAE. Make it opt-in.

## Anti-Patterns

| Don't | Why |
|---|---|
| Tune against synthetic test footage | Cost four separate wrong conclusions on one project; real footage overturned every one |
| Trust MAE alone | 1.88 MAE looked like success on a visibly broken frame |
| Use mean/std for chroma | Right-skewed; pushes ~3x too hard |
| Compare only endpoint zones | Both ends are near-neutral by construction |
| Describe the look and stop | The spec is for content and structure; the pack is for colour |
