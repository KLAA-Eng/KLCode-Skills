# Extract and update coding conventions

Use this mode when asked to onboard agents to a hand-written codebase, prevent style drift, or document its unwritten conventions. For an ordinary implementation task, inspect maintained neighbors and existing configuration without creating a new convention document.

## Establish the evidence boundary

Read existing repository instructions, format/lint rules, documented decisions and any previous convention record. Inspect tracked-file scale and recent changes where Git is available; otherwise use an explicitly bounded file set and note the weaker change history. For a small codebase, close-read the relevant source. For a large codebase, sample maintained entrypoints and representative owning modules, then expand only where the evidence conflicts. Record exclusions and generated/vendor code rather than treating them as team conventions.

Extract evidence in four dimensions:

- **File anatomy:** import/declaration order, type placement, public entrypoints, helpers and exports.
- **State and control flow:** state/flag naming, cancellation, async sequencing, pagination and mutation ownership.
- **Infrastructure:** boundaries for shared utilities, configuration, registration, adapters and cross-cutting behavior.
- **Errors:** exception/Result conventions, boundary translation, null handling, logging, retries and user-facing failures.

Choose real maintained exemplar paths and explain what each demonstrates. Do not copy defects, deprecated patterns or incompatible runtime syntax from an exemplar.

## Resolve ambiguous conventions

Distinguish deliberate subsystem differences and an ongoing migration from accidental inconsistency. A majority is evidence, not automatic permission to prohibit minority patterns. Small samples cannot establish a universal rule. Present the actual paths and consequences when an unresolved choice matters. Use the canonical interview cadence: independent questions together, with one-at-a-time mode available on request. A user can adopt one pattern, preserve scoped alternatives, record an evolution, or supply another rule.

## Record the selected contract

Default to `docs/knowledge/coding-conventions.md` unless an existing authoritative convention document already serves this purpose. Include:

1. Scope, sampled paths, exclusions, review date and available revision fingerprint.
2. Exemplar paths and the specific behavior or structure they demonstrate.
3. Concrete naming, state/control-flow, ownership and error-handling rules, with their evidence and scope.
4. Practices intentionally avoided, supported by project decisions or demonstrated defects rather than stylistic preference.
5. Unresolved questions and a short record of deliberate changes to prior conventions.

Do not install hooks or change host instruction files implicitly. If persistent enforcement is requested, use the selected operation-guardrail/configuration workflow and adapt the actual checks to the chosen conventions. A convention document alone does not prove that enforcement is active.

## Incremental updates

Read the previous record and its revision boundary, then inspect the relevant diff and affected exemplars. On an oversized diff, start with a summary and sample the changed ownership areas. Reconcile new evidence with the selected rules, clarify meaningful conflicts, update superseded rules so the current contract is unambiguous, and retain a short evolution note. Do not repeatedly append contradictory active rules. Verify recorded paths and links, then commit a useful requested documentation milestone under the shared commit policy.
