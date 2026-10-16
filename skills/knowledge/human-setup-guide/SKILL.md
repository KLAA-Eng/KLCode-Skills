---
name: human-setup-guide
description: Generate a human-run wizard for manual infrastructure, credentials or dashboard steps the agent cannot complete directly.
---

# Human Setup Guide

Inspect existing config and workflow references to identify actual manual steps and needed values. Do not ask the user to perform steps the agent can already do within authorized scope.

Trace each stage: exact source/UI journey, captured value, secrecy and destination. Verify current instructions before inventing clicks. Read [wizard authoring](references/wizard-authoring.md) and copy [the Bash template](assets/template.sh); author stages below its marker while retaining the reusable library.

Keep secret input hidden, write values only to intended local/config destinations and target only CI secret names actually used. Confirm consequential manual actions at the relevant stage; do not add approval for every harmless operation. A generated wizard is a reviewable artifact, not authorization to run it.

Check Bash syntax and ShellCheck when available. Do not run the interactive wizard end-to-end as an automated test. Default to an ephemeral local file; retain reusable setup scripts only when requested. Bash is an external prerequisite (Git Bash/WSL on Windows); explain the chosen run command.
