---
name: documentation
description: Write and maintain useful repository documentation, assign each fact one owner and run an explicit read-only integrity audit when requested.
---

# Documentation

Choose the smallest job: direct documentation edit, API/user guide update, maintenance of existing knowledge roles, or deterministic integrity audit. Do not create a new documentation hierarchy for every edit.

Use [documentation ownership and maintenance](references/document-roles.md). Shared defaults use docs/specs, docs/plans, docs/decisions and docs/knowledge. Keep instructions short and link to detail; update the relevant docs with behavior changes. Comments explain non-obvious why, contracts and constraints rather than paraphrasing code.

For an explicit audit, run [audit-docs.py](../../../support/knowledge/scripts/docs-audit/audit-docs.py) with Python3.10+:
```text
python <absolute-audit-script> --root <project> --scope full
```
Scopes: spine, context, adr, artifacts, full. Read [the artifact-role contract](references/artifact-role-contract.md) before using an optional `.governance/docs-map.json`. The audit is read-only; failures are deterministic issues, warnings need semantic review. It cannot prove prose true, requirements satisfied or work completed.

Architecture rationale belongs to [architecture decisions](../architecture-decisions/SKILL.md), stable vocabulary to domain modeling, and task status to one plan/tracker. Do not mutate indexes/archive/history as a side effect of an audit.
