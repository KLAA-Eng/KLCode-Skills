---
name: response-depth
description: Apply an explicitly requested response length or level of detail without changing the underlying task scope.
---

# response depth

Honor an existing preference silently. Map brief/25% to essentials, balanced/50% to main reasoning and an example, detailed/75% to relevant alternatives, and exhaustive/100% to the complete requested scope. These percentages are qualitative levels, not measured fractions of a fixed answer.

If the user wants to choose but has not chosen, present independent depth choices together once; a trivial answer or an already-clear preference needs no menu. Explicit token caps constrain output planning, not correctness or required deliverables. Do not estimate billing from prose length or claim tokenizer-level precision.

Read [depth options](references/depth-options.md) for examples. Preserve safety-relevant context, uncertainty and material limitations at every level. Fuller detail does not authorize external work; brevity does not justify leaving an implementation incomplete. Session preferences persist until changed.

This mode is explicitly selected; it does not override unrelated task requirements.
