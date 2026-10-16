# Verifier quality and bounded recovery

Define success and boundary conditions together: a green build that deleted tests or emptied the feature is failure. Use external outcome checks that cannot be trivially optimized away. Distinguish inner feedback (syntax/test score) from outer task validity (the requested behavior still exists and is useful).

Five failure modes to review: spinning without progress; gaming a weak metric; oscillation between alternatives; running a wrong premise to completion; unbounded cost/external effects. Set retry cap, no-progress threshold, backoff and a human fallback before automation. Retry only when fresh evidence or a changed intervention makes another attempt useful.

Keep judge independence proportional to risk. Deterministic checks are preferable for deterministic properties; use bounded independent reviewers for subjective/high-consequence claims. A score is evidence, not a permission token. Preserve disagreement and test coverage gaps.

At failure: stop dispatch, capture current diff/state and last check, classify input/tool/logic/integration failure, reduce scope, and replay the failing unit after correction. Do not resubmit an ambiguously accepted paid job or remote mutation until status is known. Preserve idempotency keys and provider request ids.

For dynamic harnesses expose Plan, Queue, Run, Gate and Handoff fields in the existing ledger/control view. Record actual owner, phase, eval result and next action. Avoid scattering extra state documents that can disagree.
