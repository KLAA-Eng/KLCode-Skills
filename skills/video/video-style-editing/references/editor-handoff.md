## Downstream Handoff (Resolve / Blender)

**Always ship an editable timeline beside the mp4.** The flattened video is a
viewing copy and the one thing a colourist cannot work with — every cut is baked
in and the shots are no longer separable. `forge.py` writes FCPXML 1.9 and a
CMX3600 EDL referencing the individual graded shot files, so the piece lands as a
timeline that can be re-cut and re-graded.

Validate the export, do not assume it: check that asset-clip offsets equal the
running sum of prior durations (no gaps), that every `ref` resolves to a declared
asset, that every `media-rep src` exists on disk, and that the total matches the
mp4. A timeline that imports but drifts is worse than one that fails loudly.

Two things that silently destroy the work:

- **Project frame rate must be set before import.** Resolve locks timeline fps on
  first timeline creation and conforms the cadence silently. At a sub-second mean
  shot length that conform is visible.
- **The delivered shots are already graded.** `look.cube` is a *normalising* LUT
  for new material and for matching — applying it to the supplied shots
  double-grades them. Node 1, nothing before it, corrections after.

Ship a handoff doc with the measured targets in it (`scripts/HANDOFF-TEMPLATE.md`
is a filled example): the zone chroma table, the cadence distribution including
**rhythm variance** — an editor who matches the mean but not the variance
produces something that reads completely differently — and an explicit "do not"
list.

For Blender, `scripts/blender_prop.py` derives its lighting from the pack:
black world with transparent film (so renders composite with no keying), key plus
rim (a key alone lets the silhouette die against black), rim colour converted
from the pack's peak-chroma zone via Lab→linear sRGB so the prop picks up the
same cast the footage is graded to. **View transform Standard, not AgX/Filmic,
and no grading in Blender** — AgX applies its own tone curve before the LUT ever
sees the pixels, and grading twice compounds.
