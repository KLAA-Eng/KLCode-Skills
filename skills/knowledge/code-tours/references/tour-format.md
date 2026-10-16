# CodeTour JSON

Use $schema https://aka.ms/codetour-schema, title, optional description/ref and steps. Each step needs a title/description and one suitable target:
- directory: repository-relative real directory.
- file plus line (positive, within file).
- file plus selection: start/end line and character; ordered and inside real text.
- file plus pattern: a real matching anchor; verify how the viewer interprets it.
- uri: explicit supporting source, not a substitute for a grounded first step.
- content-only: occasional context/closing step, not the first.

Do not guess lines. Prefer a pattern for volatile text. A ref can make the viewer read from Git rather than working tree; verify files/anchors at that revision, especially new PR files. Omit ref to use current content. The bundled validator intentionally reports an unresolved explicit ref instead of certifying it from current disk content.

Descriptions explain situation/mechanism/implication/gotcha for the selected reader. Keep the path focused and narrative, not a list of arbitrary files. The schema URL is metadata; validation does not need to fetch it.
