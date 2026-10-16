# C++ build diagnosis

| Diagnostic | Inspect before changing code |
|---|---|
| Undefined reference / unresolved external | Definition, compiled source, symbol signature/calling convention, link inputs/order and architecture |
| Multiple definition | Translation units, header definitions, generated sources, ODR and intended inline/template linkage |
| No matching overload / deduction failure | Real argument types/constraints/includes/standard; avoid casts that hide a contract mismatch |
| Incomplete type / missing member | Definition visibility, generated headers, dependency order and selected package/configuration |
| CMake configure/generate failure | Existing preset/toolchain/generator, cache paths, package discovery and platform |
| Configuration-specific failure | Conditional sources/definitions, ABI/runtime-library choice, generated assets and architecture |

Start from the failing command and first causal error. Retain its exit status and sufficient output; inspect verbose compiler/linker commands when useful. Reconfigure/clean only the selected generated build surface when its state is the demonstrated cause.

After an authorized repair rerun the proving configuration and relevant checks. Missing prerequisites are a limitation to report, not permission to upgrade/install a toolchain. Architectural changes that exceed the repair scope belong in the canonical architecture workflow.
