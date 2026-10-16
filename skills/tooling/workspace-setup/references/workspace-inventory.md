# Workspace inventory and capability selection

Adapted from ECC workspace-surface-audit/agent-sort/configure-ecc and Matt setup-KLCode-skills.

## Read the actual surface

Record repository, current host/harness and scope. Inspect runtime manifests, contributor/agent guidance, task/spec/plan/decision/knowledge locations, issue-tracker conventions, selected tools and integration configuration. Read key names and metadata without printing secret values.

For each capability distinguish definition exists, configured, enabled, authenticated, recently verified, unavailable and unknown. A prompt file is not a registered command; an MCP config entry is not a connected server; installed tools do not prove a usable end-to-end workflow.

Map source/version/license and local dependencies: agents, commands, rules, hooks, scripts, assets, modules, external packages and services. Compare with current official host capabilities when necessary; do not presume parity from an upstream name.

## Classify useful scope

- Daily: a compact broadly applicable entrypoint fitting this repository's actual work; discovery or loading still follows the host and user configuration.
- On-demand: a complete callable workflow for occasional work.
- Reference: valuable examples or patterns loaded by another entrypoint.
- Unsupported/external: needs an unavailable integration or installation before runtime use.

Daily does not mean copy all instructions into every turn. Preserve distinctive outputs; repeated words alone do not prove duplication. Keep optional services/models/hooks explicit and avoid installing the full upstream collection.

## Produce a setup plan

Use an evidence table: surface, owner/origin, trigger, current state, useful job, dependencies, proposed action, verification and recovery. Separate broken existing configuration from a missing capability or missing wrapper around a usable primitive.

Choose project/user/global scope only where required. Existing project guidance and task authority win. Confirm unresolved material alternatives together, show exact changes, then apply existing authorization without another permission loop. Default new shared docs to docs/specs/, docs/plans/, docs/decisions/ and docs/knowledge/ only when no equivalent exists.

Tracker templates define how to read/create/update/close work and the canonical triage label roles. Domain guidance points to actual glossary/decision sources; do not manufacture a parallel issue board or rewrite repository history to fit a template.

## Verify

Check the host actually discovers the selected skill/prompt, local paths/imports resolve, optional integration prerequisites are truthful, the configured command does the intended narrow action and rollback is available. Importing prompts does not register hooks or publish a plugin. Report source/configuration changes and runtime proof separately.
