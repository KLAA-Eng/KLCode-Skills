# Nuitka distribution and size/startup measurement

Adapted and translated from ECC generating-python-installer.

## Establish a runnable baseline
Record CPython version/architecture, compiler toolchain, Nuitka version, GUI framework, entrypoint, icon, data files, dynamic imports, native libraries, package metadata and vendor APIs. pythonnet/COM/Revit/ETABS interop often fixes architecture and host constraints; smaller 32-bit artifacts are irrelevant if the target vendor host requires x64.

An illustrative folder build:
```powershell
python -m nuitka --standalone --windows-console-mode=disable --output-dir=build-package --output-filename=MyApp.exe app.py
```
Verify flags against the installed Nuitka release. GUI console mode may hide valuable startup errors; retain a diagnostic build/logging path. Add an appropriate GUI plugin only for the actual framework and include required data/resources explicitly.

LTO, job count, anti-bloat plugins and exclusion flags are experiments, not defaults guaranteed to improve size/startup. Establish cold/warm launch and representative feature proof before changing them. Static imports alone do not discover reflection, dynamic modules, .NET/native DLL load or plugin/resource lookup.

## Inventory before slimming
Measure distribution totals and largest directories/DLLs. Group Python runtime, GUI plugins, browser binaries, numerical/media libraries, debug symbols, tests/docs and metadata. A test/doc/build tool may be removable; a package with the same name can also be loaded at runtime. Preserve wheel metadata/licenses required by runtime or distribution.

Select only genuinely unused modules. PySide/PyQt WebEngine, Charts, 3D, platform/style/imageformat plugins and OpenCV GPU/GUI components are feature dependencies, not universal bloat. A headless library substitution changes capabilities. Keep the full working baseline to compare.

## Native/runtime checks
Inspect architecture and redistributable dependencies using appropriate Windows tools. Bundle the correct Microsoft runtime under its redistribution terms; do not copy arbitrary system DLLs. Preserve DLL search behavior and audit native loading directories. Verify startup and all dynamically loaded features from the installed layout on a clean licensed workstation.

Build output cleanup must resolve to an owned output directory below the workspace and preserve source/user data. Never paste batch snippets that recursively delete generic dist/build folders without checking ownership and resolved paths.
