# CI and commit-time gates

Adapted from agent-skills CI/CD and Matt setup-pre-commit.

## Select the actual stack
Read the established SDK/interpreter/tool versions, package/lock manifests, CI and contribution rules. Node commands might be npm/pnpm/yarn/Bun, Python unittest/pytest, .NET MSBuild/xUnit, or CMake/CTest. Reuse scripts and pin the selected toolchain. Cross-platform pure logic and actual Revit/COM/GUI/vendor acceptance are different jobs.

Run cheap static/lint checks early, then relevant unit/integration/build/packaging gates. A required failed gate is a failure; an unavailable host is an evidence gap. Parallelize only independent jobs with isolated fixtures. Preserve caches keyed by platform/toolchain/lock state; never cache secrets or mutable test output as source truth.

## Pre-commit branch
For an existing Node repo with requested Husky integration, inspect its package-manager and current hook first. The source pattern installs husky, lint-staged and Prettier as local development dependencies, initializes the hook, runs staged formatting, then existing typecheck/test scripts. This is a selected Node integration, not a default for .NET/Python. Preserve the runner's exit code and only invoke scripts that actually exist.

A staged formatter can modify a partially staged file beyond the intended task. Inspect staged/unstaged ownership; use the repository's established partial-staging policy rather than silently staging an entire file. A hook should fail with actionable output when checks fail, not suppress failure through a trailing successful command.

## CI branch
A project-specific workflow should specify trigger/base branches, minimal job permissions, pinned/reviewed action/runtime versions, lockfile install policy, exact checks, timeouts and failure artifact retention. Fork PRs must not gain production credentials. Model/GUI acceptance often needs a dedicated appropriately licensed interactive workstation and disposable fixtures, not a guessed hosted environment.

Test one intentional failure and one pass. Distinguish configuration installation, successful command execution, and behavioral coverage. Do not add universal bundle, coverage, accessibility or performance thresholds; use the quality contract.
