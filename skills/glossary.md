# Skills and Workflow Glossary

A linked catalog of **105 canonical skills across eight categories**, plus common ways to combine them. Skill descriptions below follow the current `SKILL.md` entrypoints. Open an entrypoint for its operating modes, supporting resources and prerequisites.

## How to use this glossary

Choose the skill matching the deliverable you need. A **skill** is a callable workflow entrypoint; a **workflow** can use one skill or combine several. Start at the relevant step: a small, clear change can enter implementation directly. The routes below are examples, not mandatory stage gates.

Use checks proportional to risk and follow the [shared rules](../rules/README.md) for test-first defaults, changed-code coverage and substantive independent review. Local implementation commits belong at meaningful verified milestones; remote actions follow the task's authorization. Autonomous agent systems, persistent memory, continuous learning and visual style alternatives are explicitly selected. A prompt, hook recipe or supporting script being present does not mean it is registered, installed or running.

## Common workflow routes

| Outcome | Suggested route and boundaries |
|---|---|
| Clarify and build a feature | [grilling](planning/grilling/SKILL.md) → [requirements](planning/requirements/SKILL.md) → [implementation-planning](planning/implementation-planning/SKILL.md) → [implementation](engineering/implementation/SKILL.md) → [verification](engineering/verification/SKILL.md) → [code-review](engineering/code-review/SKILL.md). Skip discovery or planning already settled by existing evidence. |
| Fix a defect | [debugging](engineering/debugging/SKILL.md) → [implementation](engineering/implementation/SKILL.md) → [verification](engineering/verification/SKILL.md) → [code-review](engineering/code-review/SKILL.md). Default to [test-first-development](engineering/test-first-development/SKILL.md) for testable bug fixes, with the shared practical exceptions. Diagnosis-only is a valid deliverable. |
| Improve architecture or refactor | [change-impact](planning/change-impact/SKILL.md) → [architecture-assessment](planning/architecture-assessment/SKILL.md) → [architecture-design](planning/architecture-design/SKILL.md) → [refactoring](engineering/refactoring/SKILL.md) → [verification](engineering/verification/SKILL.md) → [code-review](engineering/code-review/SKILL.md). Select only the applicable steps; preserve behavior unless a behavior change was requested. |
| Plan long-running work | Use [multi-session-planning](planning/multi-session-planning/SKILL.md) for settled work spanning sessions or PRs; use [decision-exploration](planning/decision-exploration/SKILL.md) when the work is still resolving decisions. [prototyping](planning/prototyping/SKILL.md) can supply evidence for those decisions. |
| Research and choose an approach | [solution-discovery](knowledge/solution-discovery/SKILL.md) → [technical-research](knowledge/technical-research/SKILL.md). Use [literature-review](knowledge/literature-review/SKILL.md) for systematic source synthesis and [scholarly-evaluation](knowledge/scholarly-evaluation/SKILL.md) to assess an existing research artifact. |
| Design an integration | [domain-modeling](planning/domain-modeling/SKILL.md) → [interface-design](engineering/interface-design/SKILL.md) → [connector-development](engineering/connector-development/SKILL.md) → [verification](engineering/verification/SKILL.md). Add [contract-collaboration](engineering/contract-collaboration/SKILL.md) for independently evolving consumers/providers and [migration](engineering/migration/SKILL.md) for compatibility or data transitions. |
| Develop or improve an interface | [interface-development](ui/interface-development/SKILL.md) → [interface-accessibility](ui/interface-accessibility/SKILL.md) → [verification](engineering/verification/SKILL.md). Select [design-system](ui/design-system/SKILL.md) or [interface-redesign](ui/interface-redesign/SKILL.md) when appropriate, and choose one applicable visual-style alternative rather than combining contradictory styles. |
| Prepare a release | [verification](engineering/verification/SKILL.md) → [release-readiness](engineering/release-readiness/SKILL.md), followed by authorized [github-operations](tooling/github-operations/SKILL.md) when remote release work is requested. [windows-python-packaging](tooling/windows-python-packaging/SKILL.md) and [public-release-preparation](tooling/public-release-preparation/SKILL.md) are distinct, conditional packaging/publication-preparation jobs. |
| Keep documentation and decisions current | [domain-modeling](planning/domain-modeling/SKILL.md) → [architecture-decisions](knowledge/architecture-decisions/SKILL.md) → [documentation](knowledge/documentation/SKILL.md). Record consequential decisions as ADRs; routine implementation choices can remain in the plan or specification. |
| Transfer or retain context | [context-management](agents/context-management/SKILL.md) and [session-handoff](knowledge/session-handoff/SKILL.md) support phase/session transitions. Use [knowledge-management](knowledge/knowledge-management/SKILL.md) for durable curation and [session-retrospective](knowledge/session-retrospective/SKILL.md) for lessons. Memory adapters and [continuous-learning](agents/continuous-learning/SKILL.md) remain opt-in. |
| Coordinate agents | [agent-orchestration](agents/agent-orchestration/SKILL.md) assigns scoped owners and integration responsibility. Select [review-team](agents/review-team/SKILL.md) or [agent-evaluation](agents/agent-evaluation/SKILL.md) for their distinct outputs. Use [agent-loop-design](agents/agent-loop-design/SKILL.md) and [autonomous-operation](agents/autonomous-operation/SKILL.md) only for explicitly selected iterative or unattended work. |
| Create video | Use [ui-demo-recording](video/ui-demo-recording/SKILL.md) to capture a real interface and [remotion-video](video/remotion-video/SKILL.md) for coded compositions. [video-style-analysis](video/video-style-analysis/SKILL.md) → [video-style-editing](video/video-style-editing/SKILL.md) measures a reference style, then applies it to footage; these are separate paths, not one required chain. |
| Maintain skills and configuration | [writing-for-agents](tooling/writing-for-agents/SKILL.md) → [skill-maintenance](tooling/skill-maintenance/SKILL.md); add [skill-compliance-testing](agents/skill-compliance-testing/SKILL.md) for explicit behavioral evaluation. [workspace-setup](tooling/workspace-setup/SKILL.md), [configuration-audit](tooling/configuration-audit/SKILL.md) and [hook-rules](agents/hook-rules/SKILL.md) cover distinct setup, cleanup and enforcement tasks. |
| Understand usage and cost | [context-budget](agents/context-budget/SKILL.md) handles live context headroom; [agent-cost-report](agents/agent-cost-report/SKILL.md) handles recorded agent usage; [llm-cost-optimization](engineering/llm-cost-optimization/SKILL.md) designs application API cost controls. [response-depth](tooling/response-depth/SKILL.md) chooses response detail; these are different questions. |

## Operating modes and important distinctions

| Skill or family | Modes and boundaries |
|---|---|
| [grilling](planning/grilling/SKILL.md) | Decision-tree rounds ask independent questions together; one-question-at-a-time interviewing is available on request. |
| [spec-driven-development](planning/spec-driven-development/SKILL.md) / [planning-and-task-breakdown](planning/planning-and-task-breakdown/SKILL.md) | Source-preserving gated alternative: human approvals between phases; separate spec, plan and task artifacts. Existing proportional workflows remain independently callable. |
| [requirements](planning/requirements/SKILL.md) | Quick acceptance capture, full specification, synthesis of a settled conversation, and review/amendment of an existing spec. |
| [implementation](engineering/implementation/SKILL.md) | Implement a bounded change or ordered plan; explicitly requested convention extraction captures exemplars and maintains a coding-convention record. |
| [debugging](engineering/debugging/SKILL.md) | Diagnose-only or implement a fix within the requested scope. Unavailable host behavior remains unverified. |
| [code-review](engineering/code-review/SKILL.md) | Keep documented-standards findings separate from requirement/behavior alignment; independent reviewers and fresh-context challenge are selected modes. |
| [browser-testing](engineering/browser-testing/SKILL.md) | Develop persistent browser E2E suites or perform live browser QA. Writing a suite and observing a live application produce different evidence. |
| [performance-optimization](engineering/performance-optimization/SKILL.md) | Measure a baseline or run bounded optimization experiments; latency, throughput and content-hash caching are focused references. |
| [documentation](knowledge/documentation/SKILL.md) | Write or update documentation, maintain artifact roles and run the bundled documentation audit. |
| [session-handoff](knowledge/session-handoff/SKILL.md) | Temporary portable handoff by default; Memory Vault and Context Keeper are optional adapters, not simultaneous default authorities. |
| [agent-cost-report](agents/agent-cost-report/SKILL.md) | Report recorded local usage; an optional usage-card output does not convert it into a live context meter. |
| UI style alternatives | Website art direction, cinematic, premium, minimalist and industrial/brutalist styles are explicit choices. Image-to-website, design-image generation, branding and Stitch have distinct outputs and prerequisites. |
| Video workflows | Local footage processing and explicitly selected generated takes are different branches. Protected multimodal filesystem paths in video-style-editing require WSL/POSIX; portable pack/timeline helpers are separate. |
| Remote and public release work | Readiness auditing, packaging, public-repository preparation and GitHub mutation are separately scoped jobs. Preparation does not imply publication. |

## Skill catalog

[Engineering](#engineering) · [Languages](#languages) · [Planning](#planning) · [Knowledge](#knowledge) · [Agent systems](#agents) · [Tooling](#tooling) · [UI and design](#ui) · [Video](#video)

<a id="engineering"></a>

### Engineering (22)

Build, diagnose, review, test, integrate and prepare software for release.

| Skill | Purpose / when to use |
|---|---|
| [application-security](engineering/application-security/SKILL.md) | Threat-model and review application trust boundaries, input handling, secrets, and dependencies. |
| [browser-testing](engineering/browser-testing/SKILL.md) | Write persistent browser E2E tests or execute live browser QA with responsive, interaction, and accessibility evidence. |
| [code-review](engineering/code-review/SKILL.md) | Review a diff against its requirements and repository standards, with actionable evidence-backed findings. |
| [commit-preparation](engineering/commit-preparation/SKILL.md) | Inspect a diff and draft a repository-appropriate atomic commit message. |
| [connector-development](engineering/connector-development/SKILL.md) | Add a provider, connector, or vendor adapter using the repository's established integration architecture. |
| [contract-collaboration](engineering/contract-collaboration/SKILL.md) | Coordinate independently evolving consumers and providers through one machine-checkable interface contract. |
| [data-collection](engineering/data-collection/SKILL.md) | Build a repeatable public-source collect, optionally enrich, deduplicate, and store pipeline. |
| [debugging](engineering/debugging/SKILL.md) | Diagnose failures, regressions, broken UI actions, or build errors and make an authorized root-cause fix. |
| [desktop-testing](engineering/desktop-testing/SKILL.md) | Develop or run native desktop GUI tests with UI Automation and honest host acceptance evidence. |
| [git-workflow](engineering/git-workflow/SKILL.md) | Manage local branches, atomic commits, conflicts, history, and PR preparation within repository conventions. |
| [implementation](engineering/implementation/SKILL.md) | Implement an approved change or spec in verifiable slices, or extract and document an existing codebase's coding conventions. |
| [interface-design](engineering/interface-design/SKILL.md) | Design or review stable module, CLI, data, vendor, or HTTP interfaces and their compatibility. |
| [llm-cost-optimization](engineering/llm-cost-optimization/SKILL.md) | Reduce application LLM spend through measured routing, budgets, retry discipline, caching, and job deduplication. |
| [mcp-development](engineering/mcp-development/SKILL.md) | Implement, extend, or debug MCP servers, their schemas, resources, prompts, and transports. |
| [migration](engineering/migration/SKILL.md) | Plan and execute reversible compatibility-safe data, schema, interface, or dependency transitions. |
| [observability](engineering/observability/SKILL.md) | Add purposeful logging, metrics, traces, or alerts so real application behavior can be diagnosed. |
| [performance-optimization](engineering/performance-optimization/SKILL.md) | Profile and improve measured latency, throughput, memory, rendering, or build performance with correctness gates. |
| [refactoring](engineering/refactoring/SKILL.md) | Restructure or simplify existing code while preserving its observable behavior. |
| [release-readiness](engineering/release-readiness/SKILL.md) | Audit whether a concrete application change or release is ready for its intended users and rollout. |
| [test-first-development](engineering/test-first-development/SKILL.md) | Develop requested behavior test-first using meaningful red, green, and refactor cycles. |
| [test-governance](engineering/test-governance/SKILL.md) | Inventory test assets and connect important requirements, risks, contracts, and bugs to executable evidence. |
| [verification](engineering/verification/SKILL.md) | Verify existing work against acceptance conditions and report exactly what was proved. |

<a id="languages"></a>

### Languages (3)

Apply implementation and testing guidance compatible with the actual language runtime and toolchain.

| Skill | Purpose / when to use |
|---|---|
| [cpp-development](languages/cpp-development/SKILL.md) | Write, review and test C++ with explicit ownership, RAII, type-safe interfaces and toolchain-compatible concurrency and test practices. |
| [dotnet-development](languages/dotnet-development/SKILL.md) | Write, review and test C# and .NET code compatible with the project target framework, language version and runtime boundaries. |
| [python-development](languages/python-development/SKILL.md) | Write, review and test Python using idiomatic patterns compatible with the actual runtime and host. Use for Python implementation, typing, resource handling, parsing or pytest work. |

<a id="planning"></a>

### Planning (17)

Clarify outcomes, model the domain, define requirements and coordinate delivery.

| Skill | Purpose / when to use |
|---|---|
| [architecture-assessment](planning/architecture-assessment/SKILL.md) | Find evidence-backed architectural friction and present concrete redesign candidates before selecting an implementation change. |
| [architecture-design](planning/architecture-design/SKILL.md) | Design module interfaces and testable boundaries; choose ports/adapters or ranking-pipeline structure only when those specializations fit. |
| [brownfield-retrospective](planning/brownfield-retrospective/SKILL.md) | Audit an existing project slice, reconstruct its behavior and decisions, identify gaps and plan justified improvements. |
| [change-impact](planning/change-impact/SKILL.md) | Analyze the affected callers, contracts, data, tests and recovery paths before a cross-module change, then reconcile the actual diff with that scope. |
| [decision-exploration](planning/decision-exploration/SKILL.md) | Map a large uncertain effort as dependent decision questions, resolve its frontier over sessions and hand settled decisions to requirements. |
| [domain-modeling](planning/domain-modeling/SKILL.md) | Resolve ambiguous domain terminology and relationships into an evidence-backed glossary without mixing task status or architecture rationale into definitions. |
| [grilling](planning/grilling/SKILL.md) | Clarify a plan or decision through dependency-aware interview rounds; use when the user asks to be grilled or unresolved choices would otherwise be silently assumed. |
| [implementation-planning](planning/implementation-planning/SKILL.md) | Break settled requirements into ordered, independently verifiable implementation slices and one authoritative task ledger. |
| [planning-and-task-breakdown](planning/planning-and-task-breakdown/SKILL.md) | Produce a human-approved implementation plan and dependency-ordered tasks in separate plan/task artifacts. Use with spec-driven-development or when settled requirements need vertical slices, checkpoints and mandatory review before implementation. |
| [spec-driven-development](planning/spec-driven-development/SKILL.md) | Create a human-approved specification before planning or coding, with mandatory Specify, Plan, Tasks and Implement gates. Use for new projects, features or significant changes needing a spec, including multi-capability decomposition. |
| [multi-session-planning](planning/multi-session-planning/SKILL.md) | Plan a large initiative across multiple sessions or PRs with cold-start context, dependency order, verified milestones and explicit plan evolution. |
| [plan-review-ui](planning/plan-review-ui/SKILL.md) | Review a local Markdown or HTML artifact in an optional browser canvas with annotations, chat and explicit verdicts. |
| [product-discovery](planning/product-discovery/SKILL.md) | Explore possible product directions, evaluate user value and prioritize ideas before committing to requirements. |
| [prototyping](planning/prototyping/SKILL.md) | Build a clearly disposable interactive experiment to answer a logic/state or interface-design question before production implementation. |
| [questionnaire](planning/questionnaire/SKILL.md) | Create an asynchronous discovery questionnaire for a person who holds facts or decisions the current user cannot supply. |
| [requirements](planning/requirements/SKILL.md) | Turn a request or settled discussion into observable acceptance criteria or a full specification; review existing requirements without restarting discovery. |
| [work-triage](planning/work-triage/SKILL.md) | Classify incoming issues or PRs, resolve missing information and produce durable agent-ready briefs in one work authority. |

<a id="knowledge"></a>

### Knowledge (16)

Research, document, explain, preserve decisions and transfer useful context.

| Skill | Purpose / when to use |
|---|---|
| [architecture-decisions](knowledge/architecture-decisions/SKILL.md) | Record or inspect a significant architecture tradeoff in one durable decision record, preserving existing history and separating proposals from accepted choices. |
| [article-writing](knowledge/article-writing/SKILL.md) | Draft or revise source-grounded long-form guides, essays and articles with a clear argument and voice derived from supplied examples. |
| [code-tours](knowledge/code-tours/SKILL.md) | Create verified CodeTour JSON walkthroughs for onboarding, architecture, PRs or debugging, anchored to real repository files. |
| [codebase-onboarding](knowledge/codebase-onboarding/SKILL.md) | Orient a new developer or agent to a repository with an evidence-backed architecture map, entry points, conventions and practical commands. |
| [documentation](knowledge/documentation/SKILL.md) | Write and maintain useful repository documentation, assign each fact one owner and run an explicit read-only integrity audit when requested. |
| [human-setup-guide](knowledge/human-setup-guide/SKILL.md) | Generate a human-run wizard for manual infrastructure, credentials or dashboard steps the agent cannot complete directly. |
| [knowledge-management](knowledge/knowledge-management/SKILL.md) | Organize, ingest, deduplicate and retrieve durable knowledge while preserving source provenance and a single owner for active task state. |
| [literature-review](knowledge/literature-review/SKILL.md) | Find, screen and synthesize academic or technical literature with an explicit protocol, evidence extraction and verified citations. |
| [osint-investigation](knowledge/osint-investigation/SKILL.md) | Investigate sparse public-source clues through evidence queues, competing hypotheses and decisive tests while preserving provenance and uncertainty. |
| [reexplain](knowledge/reexplain/SKILL.md) | Re-pitch a confusing prior response with enough context, simpler language and the relevant domain vocabulary. |
| [scholarly-evaluation](knowledge/scholarly-evaluation/SKILL.md) | Give evidence-backed developmental feedback on scholarly works or compare their methods using a transparent rubric and optional local validation tools. |
| [session-handoff](knowledge/session-handoff/SKILL.md) | Save enough verified context for a fresh session or another agent to continue, using local documents by default and optional memory adapters only when selected. |
| [session-retrospective](knowledge/session-retrospective/SKILL.md) | Review session evidence for concrete improvements to the agent environment and capture reusable lessons without automatic diary writing. |
| [solution-discovery](knowledge/solution-discovery/SKILL.md) | Find existing packages, repository patterns and integrations before building a new utility; compare adopting, extending and implementing. |
| [teaching](knowledge/teaching/SKILL.md) | Teach a skill through short source-grounded lessons, retrieval practice and a durable learning record tied to the learner's goal. |
| [technical-research](knowledge/technical-research/SKILL.md) | Investigate a technical question against current primary sources, verify relevant versions and record cited findings without prescribing a hosted search provider. |

<a id="agents"></a>

### Agent systems (12)

Explicitly selected coordination, evaluation, context, learning and unattended-operation workflows.

| Skill | Purpose / when to use |
|---|---|
| [agent-cost-report](agents/agent-cost-report/SKILL.md) | Report observed coding-agent usage and cost from selected local records, deduplicating cumulative session snapshots; optionally create a shareable usage card. |
| [agent-evaluation](agents/agent-evaluation/SKILL.md) | Evaluate coding-agent reliability using reproducible tasks, capability and regression checks, cost and elapsed-time evidence. Use when explicitly benchmarking agents or harness changes. |
| [agent-loop-design](agents/agent-loop-design/SKILL.md) | Design or review an explicitly requested iterative agent harness with measurable completion, independent evaluation, budgets and stop conditions. |
| [agent-orchestration](agents/agent-orchestration/SKILL.md) | Coordinate multi-agent engineering work or substantive independent review with scoped ownership, dependency lanes, integration and evidence. |
| [agent-tool-design](agents/agent-tool-design/SKILL.md) | Design agent tools, action spaces, observations and error recovery. Use when building or changing an agent harness tool interface. |
| [autonomous-operation](agents/autonomous-operation/SKILL.md) | Design or configure explicitly requested unattended or scheduled agent operation with persistent state, bounded authority and recovery. |
| [context-budget](agents/context-budget/SKILL.md) | Route live context requests to native harness meters; audit installed discovery overhead only when explicitly requested. |
| [context-management](agents/context-management/SKILL.md) | Curate working context, retrieve task-relevant evidence and preserve restartable handoffs. Use when setting up session context, recovering context quality or explicitly configuring compaction guidance. |
| [continuous-learning](agents/continuous-learning/SKILL.md) | Capture project-scoped instincts from selected sessions and promote reviewed patterns into reusable instructions. Use only when the user explicitly selects the learning system. |
| [hook-rules](agents/hook-rules/SKILL.md) | Author and validate local Claude hook rules with bounded matching and warn or block actions. Use when the user explicitly chooses hook-based behavior enforcement. |
| [review-team](agents/review-team/SKILL.md) | Run an explicitly requested multi-perspective review, adversarial decision council or independent verification team. |
| [skill-compliance-testing](agents/skill-compliance-testing/SKILL.md) | Measure whether an agent follows a skill, rule or agent definition using generated scenarios and tool-call traces. Use only when explicitly evaluating agent compliance. |

<a id="tooling"></a>

### Tooling (16)

Configure development support, automation, guardrails, packaging and skill maintenance.

| Skill | Purpose / when to use |
|---|---|
| [agent-configuration-security](tooling/agent-configuration-security/SKILL.md) | Statically audit agent configuration, hook commands, MCP dependencies and tool permissions; optionally run an authorized local scanner. |
| [complete-output](tooling/complete-output/SKILL.md) | Deliver an explicitly requested complete file, implementation or exhaustive artifact without placeholder omissions. |
| [configuration-audit](tooling/configuration-audit/SKILL.md) | Audit agent/automation configuration for stale, broken or redundant surfaces and apply requested reversible cleanup. |
| [github-operations](tooling/github-operations/SKILL.md) | Inspect or manage GitHub issues, pull requests, workflow runs, releases and security alerts using authorized gh operations. |
| [operation-guardrails](tooling/operation-guardrails/SKILL.md) | Configure optional destructive-command, write-scope, or first-touch fact gates for agent tool use. |
| [prompt-optimizer](tooling/prompt-optimizer/SKILL.md) | Analyze and rewrite a draft task prompt with clearer intent, context, constraints and acceptance; do not execute it. |
| [public-release-preparation](tooling/public-release-preparation/SKILL.md) | Prepare a private repository as a sanitized, attributed, reviewable public-release candidate. |
| [quality-automation](tooling/quality-automation/SKILL.md) | Configure repository CI, pre-commit, or optional edit-time checks using its actual language and tools. |
| [quality-constraints](tooling/quality-constraints/SKILL.md) | Establish or revise an explicit project quality contract and check changes for silently weakened guarantees. |
| [response-depth](tooling/response-depth/SKILL.md) | Apply an explicitly requested response length or level of detail without changing the underlying task scope. |
| [skill-maintenance](tooling/skill-maintenance/SKILL.md) | Inventory, evaluate, consolidate or validate skills/rules and host portability with executable local checks. |
| [terminal-opener](tooling/terminal-opener/SKILL.md) | Plan or explicitly open a command's executable and argument array in a supported visible terminal without shell interpolation. |
| [windows-python-packaging](tooling/windows-python-packaging/SKILL.md) | Build or optimize advanced Windows Python distributions with Nuitka and Inno Setup while preserving runtime behavior. |
| [workflow-guide](tooling/workflow-guide/SKILL.md) | Help select the next appropriate development workflow from current repository evidence and user intent. |
| [workspace-setup](tooling/workspace-setup/SKILL.md) | Inspect and configure a selected repository's agent workflow, issue tracking and optional capability surfaces. |
| [writing-for-agents](tooling/writing-for-agents/SKILL.md) | Write or refactor agent instructions, skill prompts and context pointers for precise triggering and reliable execution. |

<a id="ui"></a>

### UI and design (15)

Develop and audit interfaces, establish design systems and select visual styles.

| Skill | Purpose / when to use |
|---|---|
| [brandkit](ui/brandkit/SKILL.md) | Explicitly selected image generation workflow for a coherent brand identity board with logo concepts, palette, typography and applications. |
| [cinematic-web-design](ui/cinematic-web-design/SKILL.md) | Explicitly selected cinematic website style with AIDA structure, wide editorial typography, dense grids and accessible GSAP scroll choreography. |
| [design-system](ui/design-system/SKILL.md) | Extract or audit visual tokens and component consistency from an existing interface; produce a maintainable design specification, token data and preview. |
| [html-presentations](ui/html-presentations/SKILL.md) | Create, enhance or convert a presentation into responsive HTML slides with viewport-fit checks, keyboard navigation and reduced motion. |
| [image-to-website](ui/image-to-website/SKILL.md) | Explicitly selected image-first website workflow: generate readable section references, inspect them and implement a matching responsive interface. |
| [industrial-brutalist-ui](ui/industrial-brutalist-ui/SKILL.md) | Explicitly selected industrial interface style using Swiss print or tactical telemetry, rigid grids, square geometry and controlled analog texture. |
| [interface-accessibility](ui/interface-accessibility/SKILL.md) | Audit or implement keyboard, focus, labeling, semantic structure, contrast and reduced-motion support in interfaces. Use for accessibility-specific reviews and fixes. |
| [interface-development](ui/interface-development/SKILL.md) | Build or improve usable interfaces with coherent hierarchy, interaction states and rendered verification. Use for general UI implementation; visual style alternatives are selected separately. |
| [interface-redesign](ui/interface-redesign/SKILL.md) | Explicitly selected targeted visual redesign of an existing interface, preserving its stack, working behavior and real content. |
| [minimalist-ui](ui/minimalist-ui/SKILL.md) | Explicitly selected warm editorial interface style with flat surfaces, compact corner radii, muted pastel accents and strong typographic contrast. |
| [monitoring-dashboard](ui/monitoring-dashboard/SKILL.md) | Build an operational metrics dashboard for Grafana, SigNoz or a similar system from operator questions, metric queries and actionable thresholds. |
| [premium-web-design](ui/premium-web-design/SKILL.md) | Explicitly selected premium website style with glass or editorial surfaces, nested bezel components, floating navigation and tactile motion. |
| [stitch-design-system](ui/stitch-design-system/SKILL.md) | Explicitly selected semantic DESIGN.md generation for Google Stitch, with functional color, typography, layout, component and motion rules. |
| [website-art-direction](ui/website-art-direction/SKILL.md) | Explicitly selected research-led website art direction using a local direction library, source lint and browser screenshot critique. For public-facing pages rather than app dashboards. |
| [website-design-images](ui/website-design-images/SKILL.md) | Explicitly selected image generation workflow producing one horizontal website reference image per section with a consistent palette and varied composition. |

<a id="video"></a>

### Video (4)

Record interfaces, compose videos, measure styles and edit footage.

| Skill | Purpose / when to use |
|---|---|
| [remotion-video](video/remotion-video/SKILL.md) | Build and render React-based video compositions using Remotion frame timing, media, captions, audio and transitions. |
| [ui-demo-recording](video/ui-demo-recording/SKILL.md) | Record a real web-application walkthrough with Playwright using discovered controls, rehearsal, visible cursor and deliberate pacing. |
| [video-style-analysis](video/video-style-analysis/SKILL.md) | Measure reference footage into a reusable color, cadence, still and overlay style pack, with optional separately selected semantic description. |
| [video-style-editing](video/video-style-editing/SKILL.md) | Grade, cut and assemble local or explicitly generated video against a measured style pack, preserving editable media, timing and delivery evidence. |

## Shared terminology

| Term | Meaning in this repository |
|---|---|
| Canonical skill | The single maintained entrypoint for a distinct job, under `skills/<category>/<name>/SKILL.md`. |
| Shared rule | A canonical standard under `rules/`, linked from applicable skills. See the [selected rule sets](../rules/README.md) and [coverage inventory](../rules/coverage.json). |
| Workflow route | A suggested combination of skills selected for the current outcome; it is not an automatic execution pipeline. |
| Mode | A distinct way to use a skill without adding a competing entrypoint. |
| Reference | Focused detail read only when relevant to the selected task or mode. |
| Agent / role prompt | A bounded delegated-task definition; the host supplies the actual agent execution mechanism. |
| Command template | A reusable task instruction; host registration is separate from its Markdown definition. |
| Hook | Code triggered by a configured host event. Imported hook recipes are inactive until explicitly configured. |
| Dependency inventory | A category's `support/<category>/dependencies.json`, identifying supporting files, sources, consumers, activation and external prerequisites. |
| Task ledger | The authoritative record of task state for one initiative; the default is the plan's Markdown checklist. |
| ADR | An architecture decision record documenting a consequential choice, alternatives and lasting tradeoffs. |
| Milestone commit | A local commit of a meaningful verified task slice, excluding unrelated user changes. |
| Verification evidence | An observed check result with a stated scope; headless, mocked or simulated evidence does not establish live-host acceptance. |
| Explicitly selected | A capability requested or deliberately chosen for the task, rather than silently enabled as a universal development requirement. |
| Provenance | Original source locations, revisions, licenses and adaptation notes retained in `SOURCES.md`, dependency inventories and the consolidation records. |

## Default artifacts and supporting material

| Artifact | Shared default |
|---|---|
| Requirements/specifications | `docs/specs/` |
| Plans and authoritative task checklists | `docs/plans/` |
| Consequential architecture decisions | `docs/decisions/` |
| Durable project knowledge | `docs/knowledge/` |
| Skill-specific references, scripts and assets | Alongside the skill's `SKILL.md` |
| Category-shared agents, commands, hooks and helpers | `support/<category>/` |
| Canonical shared rules and rule-source coverage | `rules/` |

Current task and repository instructions take precedence over these defaults. [KLCode plugin wiring](../plugin/README.md) exposes 16 convenient command names and nine roles. Its 15 alias skills live outside the canonical catalog because `requirements` already has the requested name. Installation, activation and project-specific variants remain separate work.

See the [repository overview](../README.md), [supporting dependency guide](../support/README.md), [source-to-canonical mapping](../consolidation/manifest.json), and [validation record](../consolidation/validation.json). Update this glossary when canonical names, purposes, modes or routing relationships change.
