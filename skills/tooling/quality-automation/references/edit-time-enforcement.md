# Optional edit-time quality enforcement

Adapted from ECC's Plankton integration and delivery-gate.

Plankton's useful pattern is three phases: format, collect structured linter findings, remediate then verify. Config protection prevents an agent from weakening the rule to silence a finding. This collection includes a local portable configured-argv hook, not an external Plankton checkout.

## Local hook configuration
The included quality_hook.py reads an explicit JSON configuration path from KLCODE_QUALITY_CONFIG. The configuration contains project_root and checks; each check selects extensions and an argv list, with an optional fixer argv. The literal token {file} is substituted as one argument, never shell text. All executable/tool choices come from reviewed configuration. A default file event does not install a formatter or start another model.

Check mode is default. KLCODE_QUALITY_ALLOW_FIX=1 enables only the explicitly listed fixer. Rerun the checker after a fixer and preserve nonzero results. Existing formatters/linters are external requirements; no npx auto-download is performed.

Protect configuration by reviewing diffs or explicit native permission rules. Config edits may be legitimate task work; do not forbid all configuration changes unconditionally. For complex fixes, selected delegation to an implementation/review prompt is preferable to unbounded invisible model subprocesses. If a separately selected remediation adapter is used, cap time/cost and inspect its diff.

## Learning/disk branch
The delivery gate reads only explicit project-local knowledge paths. Stale timestamps and phrases such as 'pre-existing bug' are review hints, not proof of incomplete work. By default it reports warnings. Blocking stale-learning capture is a separately selected policy, not an obligation on every three-edit task. Disk thresholds are configurable and measured on the chosen workspace, not a universal 15GB rule.

Hooks are examples until explicitly configured in a supported host. The supplied profiles remain disabled; they are not plugin lifecycle wiring.
