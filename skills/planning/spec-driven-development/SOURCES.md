# Sources and adaptations

- Source repository: Addy Osmani's `ref.agent-skills`, https://github.com/addyosmani/agent-skills.
- Source file: `skills/spec-driven-development/SKILL.md`.
- Source SHA-256: `c4b97ce3d7f24be0e67fd612c7595f65504872e3a9f8d338d098b2363fdb66ef`.
- License: MIT; preserved in [AGENT-SKILLS-LICENSE.txt](../../../support/planning/licenses/AGENT-SKILLS-LICENSE.txt).

Imported as an additional, independently callable source-preserving workflow at the user's request. Existing `requirements` and `implementation-planning` skills and their historical consolidation assignments are retained. The manifest's empty `historical_sources` for this additional entry avoids counting the same historical source twice; this file records its direct import provenance.

Preserved inline templates, mandatory human phase approvals, separate specification/plan/task artifacts, external specification/tracker conventions and incomplete-plan protection. Adaptations resolve catalog skill links, make approval stops explicit, remove assumptions that KLCode provides upstream `/build`, and keep task status in one authority. No source workflow is executed by importing these instructions.

The implementation handoff uses existing implementation, test-first development and context-management workflows. Single-capability specs default to `SPEC.md`; the capability map is named `CAPABILITY-MAP.md`, with `SPEC-<module-id>.md` specs alongside it.
