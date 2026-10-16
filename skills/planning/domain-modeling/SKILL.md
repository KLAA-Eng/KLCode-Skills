---
name: domain-modeling
description: Resolve ambiguous domain terminology and relationships into an evidence-backed glossary without mixing task status or architecture rationale into definitions.
---

# Domain Modeling

Use when terminology itself is changing or repeatedly misunderstood, not merely because another workflow reads domain words.

Read existing terms and relevant code/contracts first. Challenge overloaded words, generate edge-case scenarios and ask the domain owner when a meaning is uncertain. Code usage is evidence, not authority to invent business semantics.

Maintain one domain-language document under `docs/knowledge/<domain>-glossary.md` by default; create it only when there is stable content. Use [the glossary contract](references/glossary.md). Include relationships, confirmed interpretations and labeled unresolved ambiguity. Keep implementation details, requirements, tasks and history elsewhere.

As a term crystallizes, record it and update affected definitions together. Read only the relevant context in a large domain, using an index when needed rather than eagerly loading all glossaries.

Offer a [decision record](../../knowledge/architecture-decisions/SKILL.md) only when a choice is hard to reverse, surprising without context and involved a real tradeoff. Link the record; do not paste its rationale into the glossary.

Apply the relevant shared rules: [common / coding style](../../../rules/common/coding-style.md), [common / patterns](../../../rules/common/patterns.md).
