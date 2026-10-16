# Reproducible evaluations

Define tasks with stable id, description, input fixture/repository snapshot, permitted files/tools, success checks, regression checks, run limit and cost/time budget. Use disposable workspaces and reset between trials so prior output is not silently reused. A task that mutates shared services needs explicit isolated fixtures and cleanup ownership.

Code-based graders check behavior mechanically; rule graders check explicit structured properties; model graders need a rubric and retained reasons; human review owns uncertain domain tradeoffs. Don't use a style score as evidence of correct business logic. Preserve baseline failure signatures and compare post-change deltas.

pass@k asks whether at least one of k attempts succeeds; pass^k emphasizes every one of k attempts succeeding. State how your actual metric is calculated, sample size and correlations. Independent seeds/contexts help but do not make repeated model samples statistically independent automatically.

For agent comparisons keep tasks, tool permissions, timeout and fixture state matched. Capture pass rate, elapsed time, retries, usage/cost if measured and failure categories. Summaries should include all runs rather than cherry-picking. An absent cost record is unknown, not zero.

The imported Node harness exposes envelope/capsule/receipt verification, retrospective grouping and fixture replay. The gate execution surface intentionally refuses candidate execution without supported isolation. Its CLI help is the authoritative operation surface; it does not run arbitrary external benchmark suites by its mere presence.
