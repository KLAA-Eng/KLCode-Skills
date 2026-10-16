# Optional Context Keeper adapter

Imported complete Node.js command closure under [commands](../../../../support/knowledge/ck/commands/shared.mjs) plus an inactive [session hook](../../../../support/knowledge/ck/hooks/session-start.mjs). Node18+; no npm dependencies. Source: sreedhargs89/context-keeper through ECC (MIT).

Default CK storage is <working-project>/docs/knowledge/.ck/; explicit KLCODE_CK_HOME selects another root. Run from the same project directory. context.json is structured v2 authority; CONTEXT.md is its generated view. Local session notes are stored inside CK_HOME, never automatically in native Claude memory. Protect private content with an appropriate local ignore rule before storing it; ordinary handoff Markdown remains the default.

Commands: init.mjs detects a registration draft only; save.mjs --init consumes confirmed {name,path,description,stack,goal,constraints,repo?} JSON on stdin. A regular save consumes {summary,leftOff,nextSteps,decisions:[{what,why}],blockers,goal?}. Feed structured input via stdin/file rather than shell interpolation. info/list/resume read context; migrate --dry-run previews legacy conversion. forget deletes the resolved context and requires an explicit deletion request and reviewed target.

Do not register or enable the hook globally. If deliberately selected later, the hook writes session bookkeeping and emits a compact prompt. It is a host adapter, not a prerequisite for resuming. Recalled claims need current evidence. Do not let this state become another task ledger.
