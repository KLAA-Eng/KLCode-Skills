---
name: change-impact
description: Analyze the affected callers, contracts, data, tests and recovery paths before a cross-module change, then reconcile the actual diff with that scope.
---

# Change Impact

Read-only analysis; implementation and verification are separate jobs. Small obvious edits do not need a report.

1. State the intended behavior and changed boundary. Trace real imports/calls, schemas, serialization, generators, configuration and consumers; cite inspected paths and symbols. Mark unresolved consumers as unverified.
2. Use [the impact matrix](references/impact-matrix.md) for applicable code, data, interface, evidence, documentation and release effects. Separate observed dependencies from hypotheses.
3. Identify required verification, compatibility windows, rollback conditions and irreversible effects. A missing recovery path blocks the risky operation, not unrelated investigation.
4. Return a concise impact summary. For a durable analysis, save under `docs/plans/<change>-impact.md`; link it from the single authoritative plan rather than maintaining task status here.
5. After implementation, compare scope against the actual diff and evidence: authorized additions, missing consumers, residual compatibility code, remaining risk and recovery coverage.

For a contract change use [contract collaboration](../../engineering/contract-collaboration/SKILL.md); use [decision records](../../knowledge/architecture-decisions/SKILL.md) for durable tradeoffs and [verification](../../engineering/verification/SKILL.md) to establish results. Do not run a migration or rollback simply because it appears in the analysis.
