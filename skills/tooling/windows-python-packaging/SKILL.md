---
name: windows-python-packaging
description: Build or optimize advanced Windows Python distributions with Nuitka and Inno Setup while preserving runtime behavior.
---

# windows python packaging

Use for an explicitly requested Windows installer or size/startup optimization, not automatic replacement of a working PyInstaller workflow. Discover Python/architecture, app framework, entrypoint, dynamic imports, native/vendor dependencies, resources, identity, signing and existing packaging contracts.

Read [Nuitka distribution](references/nuitka-distribution.md) and [Inno Setup and clean-machine acceptance](references/inno-and-acceptance.md). Folder distributions help inspect DLLs and startup behavior; choose one-file packaging only when its extraction/startup tradeoff fits the requirement. Never recommend 32-bit or remove WebEngine/3D/Qt plugins merely to save space when the application needs them.

Establish a working packaged baseline, then measure size and cold/warm launch. Change one exclusion/toolchain option at a time; verify dynamic imports, resources, COM/pythonnet/vendor bridges, licensing and native runtimes. Preserve runtime-required metadata and distinguish source tests from shipped-artifact behavior.

Use the [Inno template](templates/app.iss) as a project-specific starting point. Validate architecture-matched redistributables, install/upgrade/uninstall, user-data preservation and a clean target machine. Tools/signing/vendor installations are explicit prerequisites, not bundled by this skill.
