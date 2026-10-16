---
name: terminal-opener
description: Plan or explicitly open a command's executable and argument array in a supported visible terminal without shell interpolation.
---

# terminal opener

Use the included [shell-free launcher](scripts/open-terminal.js). Default is a dry-run JSON/human plan. Pass launcher options before --, then one executable and individual argv entries; preserve spaces and metacharacters literally. The current adapter is WezTerm. Unsupported terminal requests return an actionable plan rather than being executed through a guessed shell.

Read [launch and recovery](references/launch-and-recovery.md). --detect --json probes capability; --recover or --standalone deliberately skips user terminal configuration. Normal mode tries a new mux window then detached fallback and reports mux failure. All spawns remain shell:false.

Use --launch only when the user requested a visible interactive terminal and host permissions allow it. Review cwd, argv and inherited environment: the launcher does not filter secret-bearing variables. Do not open a visible helper/service window for a background task. Capture the actual result; a printed plan is not a launched session.
