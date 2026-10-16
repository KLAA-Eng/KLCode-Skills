---
name: writing-for-agents
description: Write or refactor agent instructions, skill prompts and context pointers for precise triggering and reliable execution.
---

# writing for agents

Identify intended reader/loader, task branches, inputs, output and completion criterion. Keep always-loaded content discriminating; place conditional detail behind a pointer that names when to read it. Preserve useful gotchas and authority, rather than restating what the environment can cheaply reveal.

Read [instruction design](references/instruction-design.md) and [skill invocation mechanics](references/skill-mechanics.md). Distinguish steps from consulted reference, context load from human cognitive load, and primary context from a lossy handoff. Keep one authoritative statement for each policy.

Use strong observable completion criteria and positive instructions; reserve prohibitions for meaningful constraints. Co-locate concept, rules and caveats. Leading words help only if they activate a defined behavior; invented jargon can cost more than explicit prose.

Prune repetition, weak pointers, stale facts and no-op instructions, then test realistic requests and misrouting cases. Split a workflow only when invocation/branch/context separation earns the maintenance cost. Source layout, portable metadata and required resource closure matter as much as prompt prose.
