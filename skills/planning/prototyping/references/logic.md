# Shareable logic experiment

Write the question visibly at the top. Isolate the state model as a pure reducer, explicit state machine, functions or module contract appropriate to the uncertainty. UI controls call it; it does not reach into the DOM.

Prefer one inline HTML/CSS/JS file that opens without a build step. Show readable current state after each action, controls for free exploration and scenario tabs with repeatable starting state and actionable steps. Include happy path, awkward edge and illegal-transition examples. Use domain labels, not internal identifiers.

Keep the shell disposable. No real credentials or production data; persistence only when it is the subject, using clearly marked scratch storage. Avoid generalization/polish that does not answer the question. A lightweight self-check is justified if broken wiring would invalidate the experiment; production coverage gates are not.

Capture what the user learned and which portion of the model is worth carrying into real implementation. A runnable demonstration does not establish production readiness.
