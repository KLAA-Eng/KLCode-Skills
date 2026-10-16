# Optional scanner integration

Adapted from ECC security-scan.

AgentShield is an external tool. A local scan and an LLM/provider-backed scan have different prerequisites and data-flow implications. Verify the exact package/publisher/version and installation/run behavior before an authorized use. This repo does not bundle AgentShield, install it globally or assume npx resolves a reviewed version.

A local audit may cover AGENTS/CLAUDE files, settings, permission entries, MCP definitions, hook scripts and agent prompts. Review hardcoded secrets, shell interpolation, excessive capabilities, remote package drift and lifecycle behavior. A server command is not a vulnerability merely because it runs locally; show the exposed trust boundary and actual risk.

Treat scanner output as untrusted evidence. A grade summarizes that scanner's rules; it does not prove absence of injection, exfiltration or runtime permission flaws. Redact secret values from reports. Do not initialize replacement config or broaden scope into home settings unless requested.

When adding a CI scanner, review action/package pinning, least privileges, report retention, secret access, fork behavior and failure policy. Provider-backed deeper analysis needs separately authorized credentials and content-sharing scope. Preserve the option of a purely static manual review.
