# KLCode plugin wiring

Implement the approved KLCode 0.1.0 package for native Windows Claude Code and Codex desktop/CLI. Keep all 103 canonical skills, expose 16 shortcuts and nine roles, use project-scoped Node hooks, and retain private team marketplace support. The user's latest instruction is **implement and validate; do not activate**.

## Decisions

- Default hooks: concise session guidance, configured read-only edit checks, advisory operation warnings and completion feedback. Blocking modes are explicitly selected and bounded.
- Shared `.klcode/config.json`, ignored `.klcode/config.local.json` overrides and ignored project runtime state. Ship disabled configuration.
- Advisory failures report unavailable/failed evidence and continue; an executing explicit blocker denies its affected operation on failure. Record native host failure limits honestly.
- No installation, hook trust, enabled-plugin settings, background observers, transcript analytics, services, remote mutation or target-project activation.
- Packaging retains supporting resources and licensing. Source instructions remain canonical; shortcuts and role adapters route to them.

## Task ledger

- [x] Inspect source adapters and primary host documentation.
- [x] Confirm Codex native parser accepts direct-folder skill arrays using an isolated uninstalled plugin probe.
- [x] Add sixteen command routes and nine role adapters per host.
- [x] Implement disabled configuration, bounded hooks and behavioral tests.
- [x] Replace ECC example manifests; add private marketplace metadata and host-specific hook declarations.
- [x] Implement read-only diagnostics, disabled setup preview/write and isolated package build/validation.
- [x] Independently review runtime, packaging and permission/privacy boundaries; fix findings.
- [x] Validate canonical inventory, metadata, links, syntax, source coverage and isolated native discovery without activation.
- [x] Document verified behavior, prerequisites and remaining host limitations; prepare the verified local milestone.

## Evidence and remaining boundaries

See the [validation record](../../consolidation/plugin-validation.json): 27 tests pass, 118 skill metadata checks and nine native role templates pass, and source plus release native Codex discovery returns 118 unique exports with four hook events, uninstalled and disabled. The release under `.scratch/dist/klcode-0.1.0-m8AF6R` has 1,053 indexed files. Source and built-package syntax/import/link/resource checks pass.

Nothing was installed, enabled, trusted or activated. At that check, `node.exe` was absent from the validation shell's PATH; inspect the actual host environment before activation. A Claude executable was unavailable, so Claude-native validation and installed lifecycle checks remain for a later authorized phase. Project-specific application variants are not part of this implementation.

## GitHub ownership and final accuracy audit — 2026-10-16

- [x] Verify the transferred origin, `https://github.com/KLAA-Eng/KLCode-Skills.git`, and its default `main` branch through a read-only remote query.
- [x] Centralize repository identity and align both host manifests and GitHub-backed source marketplace catalogs; keep generated release catalogs local for offline validation.
- [x] Replace inherited ECC installation/schema/sponsor documentation with KLCode guidance and official host references. Preserve upstream licensing and historical provenance paths.
- [x] Add ownership/repository/catalog drift regression checks and include hidden host documentation in local-link checks. A temporary broken-link probe confirms hidden docs are checked.
- [x] Include the referenced task ledger in release packages, fixing a missing-document link found by artifact validation.
- [x] Independently review metadata and documentation; run all 31 plugin tests, canonical metadata/TOML/Python checks, upstream rule fingerprints, source/release syntax and link checks, and isolated Codex release discovery.

The install commands in the [plugin guide](../../plugin/README.md#install-from-github-later) are documented for later use; none were executed. GitHub reachability was verified with the existing Git authentication, which does not establish access for every team member. The audit checks local links/resources and current distribution references; it does not certify every external URL embedded in imported examples or references. Claude-native validation, desktop UI verification and installed lifecycle behavior remain unverified. Nothing was pushed or activated.

## Ownership

The runtime owner writes `plugin/runtime/`, `plugin/config.schema.json` and the disabled template. The entrypoint owner writes commands, shortcut skills, role adapters and their catalog. The host validation owner performs read-only native probes and independent review. The integrator owns manifests, packaging/diagnostics, repository integration, this ledger and final validation.
