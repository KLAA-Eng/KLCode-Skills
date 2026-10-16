# Imported review tools

Run from this skill directory or resolve absolute script/assets paths. Defaults do not install packages or make network calls.

- [search_databases.py](../scripts/search_databases.py): standard-library local processor for normalized records, deduplication and Markdown/BibTeX/JSON export. It does not actually search remote databases.
- [verify_citations.py](../scripts/verify_citations.py): optional network DOI/Crossref identity checks; requires Python requests and network authorization. Report unmatched/failed requests honestly; not a truth or methods validator.
- [generate_pdf.py](../scripts/generate_pdf.py): optional Markdown PDF export through installed pandoc/LaTeX tooling. Run --check-deps first; Markdown output does not depend on it.
- [review template](../assets/review_template.md): a starting artifact, omit inapplicable sections.
- [citation styles](citation_styles.md) and [database strategies](database_strategies.md): consult only for relevant formatting/search sources. Provider APIs/credentials are optional capabilities, never presumed installed.

No model-based schematic generator is required/bundled. An ordinary source-based table, Mermaid diagram or local figure can express the reviewed evidence. Do not turn missing optional export tooling into an incomplete review.
