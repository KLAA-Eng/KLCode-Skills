# Skill invocation mechanics

Adapted from Matt writing-for-agents/SKILL-MECHANICS.md for Claude and Codex.

Keep required name and description in the canonical skill. A discriminating description helps the model select a workflow and helps the user understand what it does. Discovery adds context/attention cost, so describe a real independent trigger rather than a catchall.

Explicit-only invocation is useful when the user selects a persistent response mode or other deliberate alternative. For Codex, agents/openai.yaml can set policy.allow_implicit_invocation to false. Claude's disable-model-invocation metadata is host-specific; do not treat it as a universal field or remove the canonical description. A host adapter may need its own projection.

Shared reference can be a plain local file used by multiple skills. Referencing a file is different from invoking a skill through a host tool; the target must exist and the host must support the chosen invocation. No instruction can override system/user authority merely by being placed in a skill.

Split by invocation when a distinct user/model trigger or separate deliverable earns an independently discoverable workflow. Split by branch when conditional material would otherwise hide the main steps. A router should identify when and why to choose a skill, not attempt to bypass explicit-only settings or force every task through a chain.

Validate metadata, links and local dependency closure, then exercise realistic requests. A passing YAML check does not prove discoverability or reliable execution. Keep one authoritative policy statement and narrowly scoped references rather than duplicated host-specific copies drifting independently.
