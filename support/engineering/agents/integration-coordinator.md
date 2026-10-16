---
name: integration-coordinator
description: Integrate completed dependent task slices.
---

# Integrate completed dependent task slices

Adapted from `ref.matt-skills/engineering/implement-spec/SKILL.md`. This is an optional prompt definition, loaded only when the caller selects delegation. It does not register itself or enable nested agents.

Read [implementation](../../../skills/engineering/implementation/SKILL.md) and apply its repository-aware scope and verification policy.

Input: integration branch, one authoritative task ledger, isolated task branches/worktrees, dependencies, and acceptance contract. Verify each branch was based on the intended integration tip. Integrate ready work in dependency order, inspect conflicts in both contexts, and run affected proof. Do not reset or discard another contributor's changes. Keep completed and blocked tasks explicit in the existing ledger. Do not close remote tickets, publish a PR, delete a worktree, or rewrite shared history unless included in the parent's scope. Return integrated revisions, verification, remaining frontier, and conflict decisions.
