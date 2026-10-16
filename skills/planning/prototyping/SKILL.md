---
name: prototyping
description: Build a clearly disposable interactive experiment to answer a logic/state or interface-design question before production implementation.
---

# Prototyping

State the question and what observation would settle it. Choose the artifact to fit that question.

- Logic/state: read [logic experiments](references/logic.md). Prefer a single shareable HTML file with an isolated pure model, readable current state, free-play controls and repeatable edge-case walkthroughs.
- Visual interface: read [UI variants](references/ui.md). Compare structurally different layouts in realistic context, usually three variants. Use the existing app surface when practical; desktop interfaces need not become web routes.

Mark prototype code clearly. Keep state in memory unless persistence is the question; use a labeled scratch store when needed. Include only enough handling/checking to make the experiment reliable. Avoid production abstractions and coverage targets.

Capture the tested question, verdict, relevant artifact and remaining uncertainty in the plan/spec. Preserve useful evidence at verified milestones; use an isolated branch or untracked scratch artifact when appropriate rather than automatically committing throwaway scaffolding to production.

Validated behavior still goes through [implementation](../../engineering/implementation/SKILL.md) and appropriate verification. Do not promote prototype code merely because a demo ran.
