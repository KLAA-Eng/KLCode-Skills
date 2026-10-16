---
name: work-triage
description: Classify incoming issues or PRs, resolve missing information and produce durable agent-ready briefs in one work authority.
---

# Work Triage

Read the request, prior scope decisions, existing discussions and relevant behavior before classifying. Distinguish incoming raw requests from already-specified implementation tasks.

Use category bug/enhancement and states needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix. These are logical roles, not mandatory remote labels. A maintainer's selected tracker stays authoritative; shared local work uses `docs/plans/<queue>.md` with stable IDs.

Investigate technical facts directly. If product intent is missing, ask the relevant person through the authorized channel or prepare a questionnaire; do not invent their answer. For ready-for-agent work, use [the durable brief](references/agent-brief.md).

For a PR, triage the existing diff and its remaining gaps rather than treating it as a fresh implementation. Distinguish ready to fix from ready for a human merge. Link CI/review blockers and active ownership.

Use [scope memory and coordination](references/coordination.md) for duplicate/rejected concepts and optional external tracker integration. Creating/posting comments, labels, issue changes or remote actions follows explicit task authorization; local classification alone does not grant it. Do not auto-close parents or merge code.
