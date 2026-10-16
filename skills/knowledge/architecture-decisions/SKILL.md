---
name: architecture-decisions
description: Record or inspect a significant architecture tradeoff in one durable decision record, preserving existing history and separating proposals from accepted choices.
---

# Architecture Decisions

Create a record when the choice has meaningful reversal cost, would surprise a future reader without context, and involved genuine alternatives. Routine implementation detail and short-lived experiments need no ADR.

Default to `docs/decisions/NNNN-<topic>.md`; follow existing user/project instructions. Continue the sequence and maintain a concise index when it helps navigation. Use [the decision template](references/decision-template.md).

Record context, constraints, actual alternatives, decision/rationale, consequences, risks, status and date. Distinguish a proposal from a confirmed decision; do not claim stakeholder acceptance from code or silence. An already-authorized documentation task does not require another routine approval round.

Never delete an old record because the decision changed. Write the successor, link both ways and mark the old one superseded/deprecated. Reconstructed decisions state today's reconstruction date, evidence and uncertainty. Link the record from relevant plans/domain docs rather than copying the rationale everywhere.
