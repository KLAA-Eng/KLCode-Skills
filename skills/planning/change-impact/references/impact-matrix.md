# Impact evidence matrix

For each applicable row, record affected surface, inspected evidence, proposed change, verification and unresolved consumer. Omit irrelevant rows.

| Surface | Trace |
| --- | --- |
| Code | Entry points, direct callers, downstream consumers, generated artifacts, compatibility layers |
| Data | Stored schemas, historical records, serializers, caches, repeated writes and idempotency |
| Interface | API/message/file/CLI contracts; providers and every known consumer |
| Evidence | Acceptance IDs, contract tests, regression checks, manual/operational checks |
| Documentation | Specs, architecture decisions, domain definitions, navigation and user-facing instructions |
| Release | Integration order, compatibility period, migration recovery, rollback conditions, irreversible effects |

Inspect imports, concrete calls, schemas and executable configuration rather than inferring dependencies from folder names. Unknowns stay unverified. Post-change, reconcile the diff, authorized scope changes, actual evidence and temporary compatibility code. A successful command exit is not proof of a requirement it never exercised.
