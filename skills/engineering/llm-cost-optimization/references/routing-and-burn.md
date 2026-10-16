# Routing, budgets and duplicate-job burn

These are task-specific patterns. Repository commands, runtime compatibility, task authorization, and the canonical skill control their use. Code blocks are examples to adapt, not instructions to install a framework or run remote operations.

### 2. Trace ingress before theorizing

- inspect `src/index.*` or the main entrypoint first
- map every enqueue path before suggesting a fix
- confirm which GitHub events share a queue type
- confirm whether push, pull_request, synchronize, comment, or manual re-run events can converge on the same expensive path

### 3. Trace the worker and side effects

- inspect the queue consumer or scheduled worker that handles analysis
- confirm whether a queued analysis always ends in:
  - PR creation
  - branch creation
  - file updates
  - premium model calls
  - usage increments
- if analysis can spend tokens and then fail before output is persisted, classify it as burn-with-broken-output

### 4. Audit the high-signal burn paths

#### PR multiplication

- inspect PR helpers and branch naming
- check dedupe, synchronize-event handling, and existing-PR reuse
- if app-generated branches can re-enter analysis, treat that as a priority-0 recursion risk

#### Quota bypass

- inspect where quota is checked versus where usage is reserved or incremented
- if quota is checked before enqueue but usage is charged only inside the worker, treat concurrent front-door passes as a real race

#### Premium-model leakage

- inspect model selection, tier branching, and provider routing
- verify whether free or capped users can still hit premium analyzers when premium keys are present

#### Retry burn

- inspect retry loops, duplicate queue jobs, and deterministic failure reruns
- if the same non-transient error can spend analysis repeatedly, fix that before quality improvements

### 5. Fix in burn order

If the user asked for code changes, prioritize fixes in this order:

1. stop automatic PR multiplication
2. stop quota bypass
3. stop premium leakage
4. stop duplicate-job fanout and pointless retries
5. close rerun/update safety gaps

Keep the pass bounded to one to three direct fixes unless the same root cause clearly spans multiple files.

### 6. Verify with the smallest proving steps

- rerun only the targeted tests or integration slices that cover the changed path
- verify whether the burn path is now:
  - blocked
  - deduped
  - downgraded to cheaper analysis
  - or rejected early
- state the final status exactly:
  - changed locally
  - verified locally
  - pushed
  - deployed
  - still blocked

## High-Signal Failure Patterns

### 1. One queue type for all triggers

If pushes, PR syncs, and manual audits all enqueue the same job and the worker always creates a PR, analysis equals PR spam.

### 2. Post-enqueue usage reservation

If usage is checked at the front door but only incremented in the worker, concurrent requests can all pass the gate and exceed quota.

### 3. Free tier on premium path

If free queued jobs can still route into Anthropic or another premium provider when keys exist, that is real spend leakage even if the user never sees the premium result.

### 4. App-generated branches re-enter the webhook

If `pull_request.synchronize`, branch pushes, or comment-triggered runs fire on app-owned branches, the app can recursively analyze its own output.

### 5. Expensive work before persistence safety

If the system can spend tokens and then fail on PR creation, file update, or branch collision, it is burning cost without shipping value.

This generalizes an ECC Tools case study to the authorized target repository; do not switch to a sibling repository automatically. Model routing needs task-quality evaluation and current model configuration. Reserve budget atomically before dispatch and reconcile actual usage; checking only previously accumulated cost is not concurrency-safe.
