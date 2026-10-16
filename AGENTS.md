# KLCode Skills

## Purpose

This repository contains skills being curated for the development team. The goal is a focused, maintainable collection that can eventually be distributed as plugins for Claude and Codex.

## Current phase

- The owner's initial cleanup and the agreed relevance-based removal pass are complete.
- Consolidation and required supporting-resource imports are complete: 209 source skills became 103 canonical workflows. See `consolidation/manifest.json` and the category handoffs.
- Preserve and adapt imported agents, commands, hooks, scripts, rules, templates, assets, and their licensing when changing a workflow. Missing external prerequisites must be reported honestly.
- Project-specific variants and Claude/Codex plugin lifecycle wiring/publication are separate later phases.
- Keep changes scoped to the current request. Do not proactively reorganize, consolidate, delete skills, or add plugin configuration.

## Repository layout

- `skills/<category>/<skill>/` contains the canonical workflows, grouped by job rather than upstream source.
- `support/<category>/` contains imported category-shared dependencies and their provenance/dependency manifest.
- Each skill's `SKILL.md` describes its purpose and usage. Supporting scripts, references, and assets belong with that skill.
- `README.md` is the entry point for repository documentation.

## Reference repositories

The skills are based on these local repositories, located beside this repository under `C:\Users\ai_lmadden\Dev\KLCode Plugin`:

- `ref.agent-skills`
- `ref.caveman`
- `ref.ECC`
- `ref.matt-skills`
- `ref.scientific-skills`
- `ref.taste-skill`

Use these repositories to check original behavior, context, and attribution when needed. Treat them as reference material; make requested changes in this repository unless explicitly directed otherwise. A reference repository may not have a corresponding imported collection here yet.

## Working guidelines

- Read the relevant skill and its supporting files before editing it.
- Favor concise, actionable instructions and remove repetition when cleanup is requested.
- Preserve useful behavior, required metadata, supporting resources, licenses, and attribution.
- Keep shared skill instructions portable between Claude and Codex where practical. Add platform-specific integration only when that work is requested.
- Do not execute a skill's workflow merely because you are reviewing or editing its instructions.
- Respect ongoing manual edits. Do not overwrite or revert unrelated changes.
- When moving, renaming, or removing files, check and update affected references.

## Validation and handoff

- For documentation edits, check Markdown, metadata, and referenced paths as applicable.
- Run `node scripts/validate-repo.cjs --syntax` for canonical inventory, metadata schema, local links, dependency files, relative imports, and JavaScript syntax.
- Run `python -X utf8 -B scripts/validate-python.py` for Python syntax; optionally pass `--skill-validator` with Skill Creator's `quick_validate.py` (requires PyYAML) for official metadata validation.
- For script changes, run the relevant available checks and report anything that could not be verified.
- Summarize what changed, how it was checked, and any remaining decisions.
