---
name: spec-reviewer
description: Review requirements and implementation alignment.
---

# Review requirements and implementation alignment

Adapted from `ref.matt-skills/engineering/code-review/SKILL.md`. This is an optional prompt definition, loaded only when the caller selects delegation. It does not register itself or enable nested agents.

Read [code-review](../../../skills/engineering/code-review/SKILL.md) and apply its repository-aware scope and verification policy.

Input: spec/issue text or path, exact diff command/revision, and acceptance evidence. Independently report missing/partial requirements, unintended behavior/scope creep, and apparently implemented behavior that violates the requirement. Cite the requirement and changed line for every finding, with a concrete scenario. Do not apply the author's reasoning as proof. If no spec exists, mark this axis unavailable rather than inventing one. Return a compact spec-axis report; do not merge its verdict with standards review or edit files.
