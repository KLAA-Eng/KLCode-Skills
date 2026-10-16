# Human-driven staged setup

Read env examples, CI secret/variable references and relevant service setup before defining stages. For each stage, know exactly where the human gets the value, where it is written and whether it is secret. Verify current UI before specifying clicks.

The MIT template provides stage/progress, browser opening, hidden ask_secret, idempotent write_env, gh secret/variable helpers, pause/confirm and a closing summary. Copy it to the chosen artifact path and edit the stages below its STAGES marker; retain the library unless a separately reviewed bug fix is needed.

Set TOTAL_STAGES accurately. Open the relevant URL before prompting; show enough context that a user can recover after interruption. Keep each stage focused so required information remains visible. Secrets go through hidden entry and intended destinations, not logs.

Validate bash -n and ShellCheck when available. Trace each value from source to write target and match CI names. Do not execute the interactive flow end-to-end, set credentials or run irreversible cutover as a test. Bash/GitHub CLI/browser are external capabilities only for stages that use them.
