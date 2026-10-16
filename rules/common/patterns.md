# Common Patterns

Search the repository before introducing a new structure. For a genuinely new subsystem, evaluate a proven skeleton when useful: relevance, security, compatibility, licensing, maintenance, and extensibility matter. Parallel evaluation is optional and subject to delegation permission. Do not clone a template merely because it exists.

Apply patterns to observed problems:

- A repository or adapter can isolate storage or external APIs behind a stable domain interface. Define needed operations rather than a universal CRUD layer.
- For an API you own, use consistent success/error semantics and relevant pagination metadata. Preserve public contracts and protocol conventions rather than imposing a custom envelope on every API.
- Prefer testable boundaries and simple dependency direction over speculative interchangeability.

Read [interface design](../../skills/engineering/interface-design/SKILL.md), [architecture design](../../skills/planning/architecture-design/SKILL.md), and [coding style](coding-style.md).

Adapted from ECC common rules; see [source coverage](../../consolidation/rules-common-audit.json).
