# Web Coding Style

Extends [shared coding style](../common/coding-style.md). Applies to actual HTML/CSS/web UI and supported embedded browser engines.

## Organization and tokens
Follow local feature/component organization. Use shared tokens for repeated palette, spacing, typography and motion values without rebuilding a system for a tiny page. Modern CSS such as clamp or oklch needs support or fallbacks.

## Motion
Prefer transform/opacity for inexpensive motion; clip-path/filter can still be costly and need measurement. Avoid needless layout animation and respect reduced motion. Motion is not required by a visual style.

## Semantics and naming
Use landmarks, logical headings, real buttons/links, labels and visible focus. Prefer native semantics to clickable divs. Follow local component/hook/class naming rather than imposing React conventions on every page.

Use [interface development](../../skills/ui/interface-development/SKILL.md) and [accessibility](../../skills/ui/interface-accessibility/SKILL.md).
