# Configuration and live automation evidence

Adapted reference. Apply only the branch relevant to the requested task. Repository conventions, chosen scope, authorization and canonical skill policies govern all examples; command blocks are not automatic execution or installation.

### 1. Inventory the real surface

Read the current live surface before theorizing:

- repo hooks and local hook scripts
- GitHub Actions and scheduled workflows
- MCP configs and enabled servers
- connector- or app-backed integrations
- wrapper scripts and repo-specific automation entrypoints

Group them by surface:

- local runtime
- repo CI / automation
- connected external systems
- messaging / notifications
- billing / customer operations
- research / monitoring

### 2. Classify each item by live state

For every surfaced automation, mark:

- configured
- authenticated
- recently verified
- stale or broken
- missing

Then classify the problem type:

- active breakage
- auth outage
- stale status
- overlap or redundancy
- missing capability

### 3. Trace the proof path

Back every important claim with a concrete source:

- file path
- workflow run
- hook log
- config entry
- recent command output
- exact failure signature

If the current state is ambiguous, say so directly instead of pretending the audit is complete.

### 4. End with keep / merge / cut / fix-next

For each overlapping or suspect surface, return one call:

- keep
- merge
- cut
- fix next

The value is in collapsing noisy automation into one canonical ECC lane, not in preserving every historical path.

## Output Format

```text
CURRENT SURFACE
- automation
- source
- live state
- proof

FINDINGS
- active breakage
- overlap
- stale status
- missing capability

RECOMMENDATION
- keep
- merge
- cut
- fix next

NEXT ECC MOVE
- exact skill / hook / workflow / app lane to strengthen
```

For requested cleanup, preserve a scoped backup/disable path and a concise decision log. An approved concrete batch is enough; do not re-ask per file. A stale timestamp is a review signal, not proof that a configuration or memory record is unused. Home/global inventory is an explicit scope choice.
