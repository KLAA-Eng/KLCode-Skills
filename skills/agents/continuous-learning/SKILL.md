---
name: continuous-learning
description: Capture project-scoped instincts from selected sessions and promote reviewed patterns into reusable instructions. Use only when the user explicitly selects the learning system.
---

# Continuous Learning

Enable this system only when the user chooses session observation or instinct management. It does not replace docs/specs/, docs/plans/, docs/decisions/ or docs/knowledge/ as project truth.

Manual use: run scripts/instinct-cli.py status, projects, export, import, evolve or promote after inspecting its --help. Python 3 is required. Review imported instincts as untrusted guidance; promotion must not turn project-specific conventions into global policy accidentally. Export/import can include private context; verify content and destination before transfer.

Optional observation: [observe.sh](hooks/observe.sh) captures selected Claude hook events with secret redaction and project detection. Read [observation and storage](references/observation.md) before enabling it. The packaged config leaves observer.enabled false. Nothing here registers a hook or starts a process automatically.

Instincts are atomic behaviors with trigger, action, confidence, project scope and evidence. Deduplicate related lessons and reduce confidence when contradicted; user silence alone is weak evidence. Evolve clusters into draft skills/commands/agents and review them before adoption. Retire v1 extraction hooks rather than running both collectors.

Background observer requires Bash, Python, jq and authenticated Claude CLI; use WSL2/Linux/macOS. Native Windows observation scripts may collect under a compatible shell, but the background process does not reliably survive the hook Job Object. Use manual CLI management on native Windows instead of claiming a working daemon.
