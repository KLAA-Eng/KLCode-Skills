---
name: review-team
description: Run an explicitly requested multi-perspective review, adversarial decision council or independent verification team.
---

# Review Team

Select a mode explicitly; don't launch a team for routine deterministic checks. Workers receive the bounded question, relevant evidence, role and output rubric, without the full conversation when independent judgment matters. Read-only review does not authorize worker edits.

- **Development perspectives:** fixed PM, architect, developer and QA views on a feature/proposal. Read [perspectives](references/perspectives.md).
- **Custom team:** choose available specialists for the task. Discover native agents or use [imported prompts](../../../support/agents/agents/); don't assume upstream slash names are registered.
- **Decision council:** skeptical/pragmatic/risk perspectives on an ambiguous choice. Read [decision council](references/decision-council.md); preserve raw disagreement before recommendation.
- **Independent verification:** two reviewers apply the same explicit rubric independently. Read [verification](references/verification.md). Prefer executable tests for deterministic correctness.

Optional external critique uses [review-with-codex.js](scripts/review-with-codex.js) only after the user approves the compact review packet's transfer to OpenAI. Read [external adapter](references/external-adapter.md). A same-provider invocation is not cross-provider diversity. Missing/unsupported adapter yields external review absent, not invented critique.

Synthesize consensus, strongest dissent, unresolved evidence and what changed your position. Persist only decisions that change project truth, using docs/decisions/ or the existing plan/spec; review chatter is not a second task ledger.
