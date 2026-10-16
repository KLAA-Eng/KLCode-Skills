# Filesystem confinement review

First establish whether untrusted input must remain beneath a configured root, or the user simply selected an arbitrary file. Only the former needs a confinement claim. Interpret input using the target platform's rules, including Windows rooted/drive-relative paths, UNC/device namespaces and alternate data streams. Allow only the input forms the operation supports.

Compare **components**, not string prefixes. A root `C:\work\data` must not accept sibling `C:\work\database\secret`. Reject different roots/volumes and any relative result whose first component is `..`; permit the root itself only when the operation allows that target.

- **Python:** normalize the root/candidate using supported runtime APIs; compare using `os.path.commonpath` or a componentwise equivalent on older hosts, handling different-drive/errors. `normpath` plus rejecting literal `..` is insufficient. `Path.resolve`/`realpath` may resolve existing links, but missing paths and exceptions need the same policy as the actual operation.
- **.NET:** `Path.GetFullPath` is lexical normalization. Where supported, `Path.GetRelativePath(root, candidate)` with rooted/different-volume and leading-parent-component checks expresses lexical containment; use equivalent componentwise handling on older frameworks. `candidate.StartsWith(root)` does not. Select comparison semantics for the actual filesystem rather than assuming all targets share the developer machine's case rules.

Lexical checks do not establish **physical** containment. Inspect existing ancestors and final targets for symbolic links, junctions, mount/reparse traversal and aliases; for new output validate the actual existing parent chain. Windows reparse points need suitable handle/reparse inspection, not a POSIX-only symlink test.

A checked path followed by ordinary open/delete can race if another actor replaces an ancestor. Under adversarial concurrent writes use supported descriptor-relative no-follow operations or Windows handle-based access/reparse protections and verify the opened object, or operate in an appropriately protected workspace. `resolve` followed by `open` alone does not eliminate TOCTOU. If the host cannot enforce the required boundary, fail explicitly or reduce the supported trust scope; do not claim a lexical check provides it.

Relevant cases: valid child, root itself, prefix sibling, parent escape, other drive/UNC/device input, case/alias behavior, linked ancestor/final target, missing parent and concurrent ancestor replacement. Findings should distinguish lexical, physical and race-resistant guarantees.
