# KLCode Skills

## Purpose

This repository maintains the development team's curated skills and the KLCode plugin package for native Windows Claude Code and Codex desktop/CLI. Keep the collection focused, maintainable and traceable to its sources.

The canonical repository is [KLAA-Eng/KLCode-Skills](https://github.com/KLAA-Eng/KLCode-Skills). `plugin/catalog.json` owns distribution identity; keep host manifests, GitHub-backed source marketplaces and the [installation guide](plugin/README.md#install-from-github-later) aligned. Generated release marketplaces remain local for offline validation. Updating distribution metadata does not authorize pushing, installation or activation.

## Current phase

- The owner's initial cleanup and the agreed relevance-based removal pass are complete.
- Consolidation produced 103 canonical workflows from 209 source skills; two later source-preserving planning imports bring the current catalog to 105. See `consolidation/manifest.json` and the category handoffs. The subsequent rule audit and updated defaults are recorded under `rules/`.
- Preserve and adapt imported agents, commands, hooks, scripts, rules, templates, assets, and their licensing when changing a workflow. Missing external prerequisites must be reported honestly.
- Claude/Codex plugin wiring is implemented and validated within the scope recorded in `consolidation/plugin-validation.json`; see `plugin/README.md`. Installation, enabling, hook trust and activation remain deferred until explicitly requested. Project-specific variants and publication remain separate phases.
- Keep changes scoped to the current request. Do not proactively reorganize, consolidate, delete skills, or add plugin configuration.

## Repository layout

- `skills/<category>/<skill>/` contains the canonical workflows, grouped by job rather than upstream source.
- `support/<category>/` contains imported category-shared dependencies and their provenance/dependency manifest.
- `rules/` is the canonical home for shared rules. Read its README for selected defaults, conditional language rules, precedence and audit coverage; other retained language directories are reference-only.
- `plugin/` contains host adapters, shortcut/role catalog, runtime, disabled templates and build/diagnostic tools. The 105 canonical skill entrypoints remain under `skills/`; shortcut aliases are packaging resources.
- The plugin exposes 16 convenient command names using 15 aliases and the existing `requirements` skill. Nine Claude role adapters are declared in its manifest; nine Codex TOML adapters are unregistered templates. Marketplace metadata describes available packages and does not install or activate them.
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

Use these repositories to check original behavior, context, and attribution when needed. Treat them as reference material; make requested changes in this repository unless explicitly directed otherwise. Source-to-canonical mappings and fingerprints live in `consolidation/` and `rules/coverage.json`; historical source paths are provenance rather than runtime dependencies.

## Working guidelines

- Read the relevant skill and its supporting files before editing it.
- Favor concise, actionable instructions and remove repetition when cleanup is requested.
- Preserve useful behavior, required metadata, supporting resources, licenses, and attribution.
- Keep shared skill instructions portable between Claude and Codex where practical. Add platform-specific integration only when that work is requested.
- Apply the selected [development](rules/common/development-workflow.md), [testing](rules/common/testing.md) and [review](rules/common/code-review.md) rules for development work. Use the relevant language rules only against the actual runtime. Host instructions and explicit project requirements take precedence; do not activate hooks or install rule packs merely by reading them.
- Do not execute a skill's workflow merely because you are reviewing or editing its instructions.
- Respect ongoing manual edits. Do not overwrite or revert unrelated changes.
- When moving, renaming, or removing files, check and update affected references.

## Validation and handoff

- For documentation edits, check Markdown, metadata, and referenced paths as applicable.
- Run `node scripts/validate-repo.cjs --syntax` for canonical inventory, metadata schema, local links, dependency files, relative imports, and JavaScript syntax.
- For plugin/runtime changes, run `node plugin/cli.cjs validate` and `node --test plugin/*.test.cjs plugin/runtime/*.test.cjs` for exports, packaging, inert setup and runtime behavior. Native parser probes use isolated temporary host state. Report static, fixture, native-discovery and installed-lifecycle evidence separately; do not install or activate components to broaden validation without task authorization.
- Run `node scripts/validate-rules.cjs` for audited rule coverage, destinations and explicit skill consumers. Use `--upstream` when the sibling reference checkouts are available to verify source fingerprints and candidate inventory.
- Use Node.js 22 or later for repository/plugin tooling. Run `python -X utf8 -B scripts/validate-python.py` with maintenance Python 3.11 or later for Python syntax and Codex role-template checks; optionally pass `--skill-validator` with Skill Creator's `quick_validate.py` (requires PyYAML) for canonical and alias skill metadata validation. These maintenance prerequisites do not change the runtimes supported by individual development skills.
- For script changes, run the relevant available checks and report anything that could not be verified.
- Summarize what changed, how it was checked, and any remaining decisions.
