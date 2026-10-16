# Recorder flow contract

Pass a JSON file containing baseUrl (http/https), optional viewport {width,height} (default1280×720), output (a new .webm file) and steps. Each step has action and optional label/subtitle/pauseMs; actions are goto (url), click (selector), type (selector,text), select (selector,value), assertVisible (selector) and pan (selector,count). Navigation remains on the selected base origin. Output paths resolve from the flow file directory. For discovery, routes is an optional list of same-origin page paths; default is the base page.

Use --discover to list visible field metadata, --rehearse to execute without recording, --record only after a successful selected rehearsal. Rehearsal executes clicks/type/select and may create data; use the authorized disposable environment. Keep credentials out of source-controlled flow files and screen recordings. Login/session setup requires a deliberate project-specific extension rather than a hard-coded secret template.

The runtime loads Playwright only after help/plan validation. Install dependencies only as part of an authorized setup task, and use the actual project's package resolution (KLCODE_PLAYWRIGHT_ROOT may point to its absolute package root). The recorder does not install or guess provider packages.

After context close flushes video, saveAs writes the stable output path. Required-action failure yields a failed process and no successful-delivery message; random partial recordings are not completed deliverables. Popups need their own explicitly handled flow/capture.
