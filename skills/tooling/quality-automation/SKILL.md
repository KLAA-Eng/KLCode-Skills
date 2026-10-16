---
name: quality-automation
description: Configure repository CI, pre-commit, or optional edit-time checks using its actual language and tools.
---

# quality automation

Inventory existing commands, runtimes, CI, formatters, linters, test gates and hook configuration. Choose the requested boundary: CI, pre-commit, edit-time formatting/linting, or opt-in delivery/learning checks. Reuse project conventions; a Python/.NET repository does not need Husky, Bun, uv or npm merely to gain quality checks.

Translate acceptance and risk into executable gates. Preserve exit codes, failure artifacts, cancellation and host requirements. Fast local checks and heavier CI/host gates can differ. Keep linter configuration changes visible rather than weakening checks to obtain green. Local milestone commits remain compatible with the selected gates.

Read [CI and pre-commit patterns](references/ci-and-precommit.md) and [edit-time enforcement](references/edit-time-enforcement.md). The bundled [quality hook](../../../support/tooling/hooks/quality_hook.py) runs explicitly configured argv checks without a shell; formatting requires explicit opt-in. [Delivery check](../../../support/tooling/hooks/delivery_gate.py) keeps disk/learning heuristics advisory unless a separately chosen policy enables blocking. Neither is enabled automatically.

Preview exact project configuration and rollback, then make only authorized scoped changes. Run a deliberate failing case and a passing case for the chosen hook/gate; installation is not validation. See [hook configuration examples](../../../support/tooling/templates/hook-profiles.json) for disabled-by-default templates.

Apply the relevant shared rules: [common / hooks](../../../rules/common/hooks.md).
