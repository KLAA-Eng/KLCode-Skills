---
description: verify using the canonical verification workflow.
---

# verify

Adapted from `ref.ECC/skills/verification-loop/SKILL.md`. Manual prompt template; no command registration or hook installation occurs here.

Read [verification](../../../skills/engineering/verification/SKILL.md).

Determine task acceptance and actual project commands, then run the smallest sufficient build/static/test/host/diff checks. Report PASS, FAIL, UNAVAILABLE or NOT APPLICABLE per selected check, preserving exit codes and revision. Validation-only mode never makes product changes.
