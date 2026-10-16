# Compliance evidence

The package extracts expected steps from the selected definition, generates supportive/neutral/competing prompts, records Claude stream-json tool calls, classifies events against the steps, and deterministically checks order. Targets include skills, rules and agent invocation definitions; internal agent workflows are not fully verified by invocation alone.

Use scripts/parser.py and scripts/grader.py fixture tests for offline trace/order checks. scripts/spec_generator.py, scenario_generator.py and classifier.py invoke the Claude CLI, including when generating a dry-run plan. Do not label these cost-free. Review setup_commands, expected files and tool scope before execution. Generated reports retain spec, prompts and timelines; redact sensitive values before sharing.

Temporal compliance is distinct from task correctness. Compare observed tool events with executable acceptance evidence. Record skipped/failed scenarios and model/CLI versions so repeated runs can be compared.
