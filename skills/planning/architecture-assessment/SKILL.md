---
name: architecture-assessment
description: Find evidence-backed architectural friction and present concrete redesign candidates before selecting an implementation change.
---

# Architecture Assessment

Scope to the named pain point or recent change hot spots before surveying the whole repository. Read related domain definitions and decisions.

Look for shallow pass-through layers, scattered knowledge, caller complexity, behavior tested at the wrong seam, and coupling that makes relevant changes hard. Use [architecture design](../architecture-design/SKILL.md), not fixed file-count heuristics. Cite the affected files and demonstrate the friction; do not invent a refactor solely to increase abstraction.

Present a small set of candidates with problem, proposed direction, relevant dependencies, likely verification improvements, risks and recommendation strength. Use [the visual report contract](references/visual-report.md) for requested visual reports; plain Markdown is sufficient when comparison is clear.

Ask the user to select a candidate when several material directions remain. Use [grilling](../grilling/SKILL.md) for unresolved choices and [prototyping](../prototyping/SKILL.md) when evidence requires interaction. Record useful domain or decision outcomes without implementing the redesign as an unrequested side effect.

For broader retrospective gap analysis, use [brownfield retrospective](../brownfield-retrospective/SKILL.md).
