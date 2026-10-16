---
name: skill-compliance-testing
description: Measure whether an agent follows a skill, rule or agent definition using generated scenarios and tool-call traces. Use only when explicitly evaluating agent compliance.
---

# Skill Compliance Testing

Measure observed behavior rather than assuming an instruction was followed. Select the target file, expected behavior, test workspace and cost/run budget before invoking model-backed tooling.

The bundled Python package contains spec/scenario generation, trace parsing, temporal grading, reports and fixture tests. From this skill directory, with Python 3.11+, PyYAML and an authenticated Claude CLI available:

    uv run python -m scripts.run <absolute-target-file> --dry-run

Important: --dry-run still invokes Claude to generate the spec and scenarios and may incur cost. It skips scenario execution, not model calls. Offline parser/grader tests are independent of that model-backed path.

Inspect generated setup commands and prompts before a real run. Execute in a disposable workspace with no secrets; a working directory plus --allowedTools is not a security isolation boundary. The runner's temporary sandbox is an OS-temp directory, not the active project. Use an OS/container boundary for untrusted scenarios.

For a selected live run omit --dry-run and optionally supply --model, --gen-model and --output. Report strictness levels, observed sequence, missing/order violations and uncertainty. A model classifier can be wrong; retain evidence for review rather than treating the percentage as proof of safety. Read [measurement details](references/measurement.md) for output interpretation.
