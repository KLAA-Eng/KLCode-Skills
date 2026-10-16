# Architectural comparison report

For each candidate:
- Files/modules and evidence of current friction.
- Plain-language problem and proposed direction.
- Before/after relationship or flow diagram when it clarifies the change.
- Caller leverage/locality and verification effects.
- Dependency strategy, risks, ADR conflicts and recommendation strength.

Finish with the strongest candidate and the decision it needs. Do not propose a complete interface before the user chooses a substantial direction.

A self-contained HTML report in the OS temporary directory is useful for visual comparison. Use inline CSS/SVG or Mermaid when available; do not require Tailwind/Mermaid CDNs to make the report understandable. Browser opening follows host permissions. Plain Markdown is suitable for simple comparisons.

Use neutral data and restrained labels. Mark a conflict with an existing decision only when actual friction warrants reopening it, not because an alternative is theoretically possible.
