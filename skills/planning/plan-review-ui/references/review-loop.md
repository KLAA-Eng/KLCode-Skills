# Local review session contract

Resolve the bundled CLI by its actual filesystem path. open returns quickly and starts a detached loopback server; await returns JSON feedback. Use --timeout-ms 30000 when foreground calls must remain bounded; status waiting is not approval. A host-supported background listener can use plain await.

Feedback kinds: chat, annotation (selector/snippet/text range), verdict approve/request-changes. Reply in the canvas using await --reply so the human sees the response in the interface they are using; continue listening while the review is active. pending lists queued undelivered feedback.

Revise the source artifact; it live-reloads, so opening repeatedly is unnecessary. Refresh typing/thinking indicators only while active. On approve, conclude this review and end the session; the parent workflow determines what happens next. Request-changes requires actual revision and another response.

status ended, endedBy user, or sessionEnded means stop listening and do not reopen unless asked. No message or elapsed time settles a decision. End active review explicitly when complete.

HTML renders as supplied; Markdown receives the annotation UI. Keep sibling assets relative and inspect the selected artifact: a local HTML file can still contain active scripts or remote resource requests. Do not open an untrusted artifact blindly.

Default port is 4517 and state is in the OS temporary directory. ECC_PLAN_CANVAS_PORT/STATE_DIR/IDLE_MS remain compatibility environment names; no global configuration is changed. Optional ECC_PLAN_CANVAS_MERMAID_URL supplies an offline/local diagram module. No Stop/SessionStart hooks are required or enabled; use pending to recover missed feedback.
