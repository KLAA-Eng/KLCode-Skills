# KLCode Skills

## Purpose

This repository contains skills being curated for the development team. The goal is a focused, maintainable collection that can eventually be distributed as plugins for Claude and Codex.

## Current phase

- The owner's initial cleanup and the agreed relevance-based removal pass are complete.
- Consolidation and removal of overlapping skills are next.
- Import required agents, commands, and hooks after the final skill list is settled. Missing infrastructure alone is not a reason to remove a skill.
- Claude and Codex plugin packaging will be addressed after consolidation.
- Keep changes scoped to the current request. Do not proactively reorganize, consolidate, delete skills, or add plugin configuration.

## Repository layout

- `skills/` contains the imported skill collections, currently grouped by source.
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
- For script changes, run the relevant available checks and report anything that could not be verified.
- Summarize what changed, how it was checked, and any remaining decisions.
