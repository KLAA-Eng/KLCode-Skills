"""Optional configured-argv edit check, adapted from ECC/Plankton patterns (MIT).

Off without KLCODE_QUALITY_CONFIG. No shell, auto-download, global settings or
model subprocess. Fixers require explicit KLCODE_QUALITY_ALLOW_FIX=1.
"""
import json
import os
from pathlib import Path
import subprocess
import sys

def run(payload, config, allow_fix=False):
    root = Path(config["project_root"]).resolve(strict=True)
    selected = payload.get("tool_input", {}).get("file_path")
    if not isinstance(selected, str):
        return {"checks": [], "skipped": "no file_path"}
    target = Path(selected)
    target = (root / target).resolve() if not target.is_absolute() else target.resolve()
    if not target.is_relative_to(root):
        raise ValueError("Target is outside configured project root")
    results = []
    for check in config.get("checks", []):
        if target.suffix.lower() not in check.get("extensions", []):
            continue
        def execute(argv):
            if not isinstance(argv, list) or not argv or not all(isinstance(v, str) for v in argv):
                raise ValueError("Check argv must be a nonempty list of strings")
            args = [value.replace("{file}", str(target)) for value in argv]
            return subprocess.run(args, cwd=root, shell=False, timeout=check.get("timeout_seconds", 30), capture_output=True, text=True)
        if allow_fix and check.get("fixer"):
            fixed = execute(check["fixer"])
            results.append({"kind": "fixer", "exit_code": fixed.returncode})
            if fixed.returncode:
                break
        checked = execute(check["argv"])
        # Tool output may contain secrets: return status only, not raw diagnostics.
        results.append({"kind": "check", "exit_code": checked.returncode})
    return {"checks": results}

def main():
    configured = os.environ.get("KLCODE_QUALITY_CONFIG")
    if not configured:
        return 0
    config = json.loads(Path(configured).read_text(encoding="utf-8"))
    payload = json.load(sys.stdin)
    result = run(payload, config, os.environ.get("KLCODE_QUALITY_ALLOW_FIX") == "1")
    if any(item["exit_code"] for item in result["checks"]):
        print("Configured quality check failed; inspect the selected tool's redacted diagnostics.", file=sys.stderr)
        return 2
    return 0

if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, subprocess.TimeoutExpired) as error:
        print("Quality hook configuration/tool error: " + type(error).__name__, file=sys.stderr)
        sys.exit(2)
