# Third-party provenance and licensing

This collection adapts material from the following repositories. Original notices and license texts are retained under `licenses/`, with source and adaptation details alongside each skill and in the dependency inventories.

| Repository | License material |
|---|---|
| [Addy Osmani agent-skills](https://github.com/addyosmani/agent-skills) | [MIT](licenses/ref.agent-skills/LICENSE) |
| [Julius Brussee Caveman](https://github.com/JuliusBrussee/caveman) | [Apache-2.0](licenses/ref.caveman/LICENSE), [retained MIT contributions](licenses/ref.caveman/LICENSE-MIT), [NOTICE](licenses/ref.caveman/NOTICE), [licensing history](licenses/ref.caveman/LICENSING.md) |
| [Affaan Mustafa ECC](https://github.com/affaan-m/ECC) | [MIT](licenses/ref.ECC/LICENSE), plus file-specific notices |
| [Matt Pocock skills](https://github.com/mattpocock/skills) | [MIT](licenses/ref.matt-skills/LICENSE) |
| [K-Dense scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | [License](licenses/ref.scientific-skills/LICENSE.md) |
| [Leonxlnx taste-skill](https://github.com/Leonxlnx/taste-skill) | [MIT](licenses/ref.taste-skill/LICENSE) |

The separately maintained [OSINT investigation](skills/knowledge/osint-investigation/SOURCES.md) adaptation carries CC-BY-SA-4.0 attribution and licensing. Its terms are not replaced by ECC's root MIT license. Other resource-specific notices remain with their files.

See [source-lock.json](consolidation/source-lock.json) for the six reference checkout revisions and hashes of the 209 curated source entrypoints used during consolidation. Source repositories were read as references and were not modified. New organization, names, workflow defaults and dependency adaptations are documented in the manifest and category handoffs.

The subsequent [rules audit](rules/coverage.json) records rule-source fingerprints, adaptations and exclusions across those repositories. Root-level ECC rules retain the ECC MIT attribution above; the adapted implementation core retains its Caveman provenance and notices.
