# Security

## Applicable checks

Review changed trust boundaries before completion or commit. Never introduce secrets in source or logs. Validate untrusted input, parameterize queries, confine filesystem access, encode output for its context, preserve authentication/authorization, and prevent sensitive error disclosure where those surfaces exist.

Apply web controls to web risks: contextual XSS output handling, CSRF defenses for relevant browser credential flows, and rate/resource limits for exposed or expensive operations. These are not universal requirements for every desktop command or endpoint. Local files, shared folders, serialized data, process arguments, and model/tool output can be trust boundaries.

Authentication, secrets, permissions, and untrusted input changes require focused security review. Use a separate qualified reviewer when delegation is available and permitted; otherwise conduct the review explicitly and report the missing independent check. See [code review](code-review.md).

## Secrets

Use appropriate environment injection, OS credential storage, or an approved secret manager. Avoid source-controlled credentials and unnecessary cloud dependencies. Validate required configuration at the appropriate boundary without exposing values. Treat suspected exposure as compromise and coordinate revocation/rotation through the authorized owner.

## Response

Stop the affected unsafe action when a credible critical vulnerability or data-loss hazard is found. Preserve evidence safely, assess exploitability and scope, fix before affected completion/merge, and inspect related call sites for the same pattern. Continue unrelated safe work. Do not perform unauthorized credential administration. Record unresolved risks and review limits.

Read [application security](../../skills/engineering/application-security/SKILL.md) for concrete threat modeling and hardening.

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
