"""Optional delivery heuristics adapted from ECC delivery-gate (MIT).

Advisory by default. Learning checks inspect explicitly configured project paths.
No home-memory search, transcript following, registration or config modification.
"""
from datetime import date
import json
import os
from pathlib import Path
import shutil
import sys

def assess(root, knowledge_paths=(), block_learning=False, disk_block_gb=0):
    root = Path(root).resolve(strict=True)
    stale = []
    for value in knowledge_paths:
        target = (root / value).resolve()
        if not target.is_relative_to(root):
            raise ValueError("Knowledge path escapes configured root")
        files = list(target.rglob("*")) if target.is_dir() else [target]
        # Do not follow links to another project's knowledge.
        fresh = any(f.is_file() and not f.is_symlink() and f.resolve().is_relative_to(root) and date.fromtimestamp(f.stat().st_mtime) == date.today() for f in files if f.exists())
        if not fresh:
            stale.append(value)
    free_gb = shutil.disk_usage(root).free / (1024 ** 3)
    return {"stale": stale, "free_gb": round(free_gb, 2), "block": (block_learning and bool(stale)) or (disk_block_gb > 0 and free_gb < disk_block_gb)}

def main():
    configured = os.environ.get("KLCODE_DELIVERY_CONFIG")
    if not configured:
        return 0
    config = json.loads(Path(configured).read_text(encoding="utf-8"))
    result = assess(config["project_root"], config.get("knowledge_paths", []), config.get("block_learning", False), config.get("disk_block_gb", 0))
    if result["stale"]:
        print("Delivery hint: selected knowledge paths have no update today; this is not proof of incomplete work.", file=sys.stderr)
    if result["block"]:
        print("Explicitly selected delivery gate unmet. Check project disk/learning policy.", file=sys.stderr)
        return 2
    return 0

if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError) as error:
        print("Delivery gate could not inspect selected scope: " + type(error).__name__, file=sys.stderr)
        sys.exit(2)
