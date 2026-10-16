# Shared rules

This folder is the canonical home for team rules. Skills link to the rules needed for their task; rule files describe standards, while skills describe workflows. These files are instruction resources, not registered hooks or an installed plugin.

## Selected defaults

- [Common](common/): development, testing, review, security, coding, git, performance, agent coordination and hook policy.
- [Python](python/), [C#/.NET](csharp/) and [C++](cpp/): read the relevant language rules against the actual interpreter, target framework, compiler and host. FastAPI guidance applies only to FastAPI projects.
- [Web](web/) and [JavaScript/TypeScript](typescript/): conditional web guidance; native WPF/Avalonia interfaces use their native APIs. Visual style alternatives remain explicitly selected.
- [React](react/): conditional guidance for actual React interfaces and Remotion compositions; it does not select React or Next.js for a project.

The other language/framework directories are retained upstream reference material, **not selected team defaults**. Their exclusion and source fingerprints are recorded in [coverage.json](coverage.json). Do not load or install this entire tree as a rules pack. Plugin packaging and host-specific activation will select the adapted files later.

## Policy and precedence

Follow the active host's instruction hierarchy and the authorized task. Explicit project instructions and actual runtime constraints take precedence over these defaults. Language rules specialize the common rules where their applicability requires it; examples do not authorize tool installation, framework adoption, remote changes or new services.

The agreed defaults are test-first development for new testable logic and bug fixes with practical exceptions; an 80% coverage target for new or substantially changed testable code; independent review of substantive changes when delegation is available and authorized; focused security review of sensitive changes; and size/nesting thresholds as review prompts. Read [testing](common/testing.md), [code review](common/code-review.md) and [coding style](common/coding-style.md) for scope and exceptions. Do not apply these as universal numerical gates to existing repositories.

Check local implementations before introducing new code or dependencies. Use primary documentation to resolve uncertain API behavior. Preserve project toolchains, host transactions and thread affinity. Keep external research, aesthetic prescriptions and provider-specific integrations conditional.

## Coverage and provenance

[coverage.json](coverage.json) records audited upstream rule files, source hashes, dispositions, destinations and reasons. The category audit records under `consolidation/` contain section-level details. A valid link proves that a destination exists; semantic incorporation is established by the recorded audit and review, not by the link checker alone.

The ECC rules are adapted from [Affaan Mustafa's ECC](https://github.com/affaan-m/ECC) under its [MIT license](../licenses/ref.ECC/LICENSE). Other sources retain their attribution through the coverage inventory, skill `SOURCES.md` files and [third-party notices](../THIRD_PARTY_NOTICES.md). Upstream checkouts remain unchanged.

Run `node scripts/validate-repo.cjs --syntax` for repository checks and `node scripts/validate-rules.cjs` for selected-rule coverage, destinations and skill consumers. Neither command activates hooks or claims application behavior was tested.
