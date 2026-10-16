# Optional specialist prompts

Imported prompts in [support/agents/agents](../../../../support/agents/agents/) include planner, architect, code-explorer, code-reviewer, tdd-guide, refactor-cleaner, security-reviewer, loop-operator, agent-evaluator and harness-optimizer. Select only roles justified by the task. They are files for host-native delegation, not registered global agents.

The bounded prompt should identify its canonical workflow, write boundary, accepted scope and done evidence. Review-only workers remain read-only. Integration and commit responsibility belong to the assigned owner. Cross-provider execution is distinct from a same-provider subagent and requires an explicitly selected adapter.
