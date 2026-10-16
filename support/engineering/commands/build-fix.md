---
description: build fix using the canonical debugging workflow.
---

# build-fix

Adapted from `ref.ECC/commands/build-fix.md`. Manual prompt template; no command registration or hook installation occurs here.

Read [debugging](../../../skills/engineering/debugging/SKILL.md).

Discover the installed build/runtime, collect and group failures, trace the responsible dependency/type/config mechanism, and implement an authorized narrow correction. Re-run the actual failing command. Missing host/SDK/API dependencies are explicit gaps; do not replace them with stub code or disable checks.
