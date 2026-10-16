# Consolidation working agreement

The approved plan maps 209 source skills to 103 canonical skills. The manifest records the complete source-to-destination mapping; historical source paths are provenance, not runtime dependencies.

## Ownership and integration

Each category has a subagent owner. Owners write only `skills/<category>/`, `support/<category>/`, and their category handoff in this directory. The integrator owns shared manifests, root documentation, validation, cross-category links, and removal of old collection directories. All agents share one workspace; do not modify another owner's files.

Acceptance: all assigned skills exist, unique useful behavior is preserved, relevant upstream dependencies are imported and adapted, local references resolve, frontmatter names match canonical folders, and evidence and remaining external requirements are recorded. Keep old collections until the integrator validates their replacements.

## Authoring defaults

- Read the actual source bodies and relevant resources before consolidation. Select a strong base and integrate useful differences; do not generate generic summaries or preserve contradictory upstream instructions as active references.
- Keep concise, discriminating entrypoints with progressive disclosure. Preserve scripts/assets with their runtime dependencies and attribution. Inspect upstream licenses, including file-specific licenses, before copying.
- Apply the subsequent approved [shared rules](../rules/README.md): test-first defaults for new testable logic and bug fixes with practical exceptions, an 80% changed-testable-code coverage target, and independent review for substantive changes when available and authorized. No universal repository coverage gate, repeated routine approval gates or test-stage checkpoint commits. These decisions supersede the original consolidation's optional-only test-first/review policy.
- Implementation makes local commits at meaningful verified milestones when supported by the host and task scope. Do not make remote mutation implicit. Never include unrelated user changes in commits.
- Shared defaults use `docs/specs/`, `docs/plans/`, `docs/decisions/`, and `docs/knowledge/`. Plans use one authoritative task ledger. Preserve existing user/project instructions; project-specific variants are a later phase.
- Requirements, planning, implementation, and verification are distinct entrypoints. Interview rounds ask independent questions together; one-at-a-time mode is explicitly available.
- Autonomous agent systems, persistent memory, learning, and visual style alternatives are explicitly selected; bounded independent review follows the shared review policy. All eleven Taste workflows survive with their distinct behavior. Keep core material portable across Claude and Codex.

## Supporting dependencies

Trace references to agents, commands, hooks, rules, templates, scripts, modules, and assets in the original reference repositories. Import the necessary dependency closure, adapt names, relative paths, shared-default policies, and invocation instructions to the grouped skills. Read sibling reference repositories; never edit them.

Put category-shared dependencies under `support/<category>/` (agents, commands, hooks, rules, scripts, or templates as appropriate). Put skill-specific resources within the canonical skill. Record imported files, original locations, licenses, consumers, activation, external prerequisites, and verification in `support/<category>/dependencies.json`. Link usable resources from the relevant skill. Keep intentional historical upstream identifiers clearly labeled as provenance.

Imported agent/command prompt definitions must point at canonical skills. Imported hooks and scripts must have their internal imports and paths available. Keep optional service integrations conditional and preserve useful local alternatives. Do not silently activate hooks, change global settings, install upstream collections, publish plugins, or pretend missing external packages/services are bundled. Include reusable setup/configuration templates only when the workflow needs them; plugin lifecycle wiring follows later.

Use the available skill-creator guidance when authoring or updating skills. Explicit-only skills can use supported invocation metadata; do not invent host-neutral metadata fields. Preserve source licensing and provenance in `SOURCES.md` and the relevant license files.

## Handoff

Write `<category>-handoff.md` here with completed skills, imported dependencies, meaningful validation, remaining prerequisites, and any integration issues. Do not remove historical source directories. Do not commit, stage, revert, or modify other categories; the integrator handles the final working-tree boundary.
