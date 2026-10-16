"""Portable scoped inventory/quick-diff adapted from ECC stocktake/rules-distill (MIT)."""
import argparse
import hashlib
import json
from pathlib import Path

EXCLUDED = {".git", "node_modules", ".trash", "_archived", "__pycache__"}

def allowed(path, root):
    return not any(part in EXCLUDED for part in path.relative_to(root).parts) and not path.is_symlink()

def inventory(root, kind="skills"):
    root = Path(root).resolve(strict=True)
    entries = {}
    paths = root.rglob("SKILL.md" if kind == "skills" else "*.md")
    for source in sorted(paths):
        if not allowed(source, root):
            continue
        directory = source.parent if kind == "skills" else None
        selected = [p for p in sorted(directory.rglob("*")) if p.is_file() and allowed(p, root)] if directory else [source]
        digest = hashlib.sha256()
        resources = []
        for file in selected:
            relative = file.relative_to(root).as_posix()
            digest.update(relative.encode("utf-8"))
            digest.update(b"\0")
            with file.open("rb") as stream:
                for block in iter(lambda: stream.read(65536), b""):
                    digest.update(block)
            resources.append(relative)
        text = source.read_text(encoding="utf-8-sig")
        key = source.relative_to(root).as_posix()
        entries[key] = {"path": key, "sha256": digest.hexdigest(), "lines": len(text.splitlines()), "headings": [line[3:] for line in text.splitlines() if line.startswith("## ")], "resources": resources}
    return {"schema_version": 1, "root": str(root), "kind": kind, "entries": entries}

def compare(current, previous):
    if current["root"] != previous.get("root") or current["kind"] != previous.get("kind"):
        raise ValueError("Previous inventory has a different scope or kind")
    old = previous.get("entries", {})
    changed = []
    for key, item in current["entries"].items():
        if old.get(key, {}).get("sha256") != item["sha256"]:
            changed.append(key)
        elif "evaluation" in old[key]:
            item["evaluation"] = old[key]["evaluation"]
    return {"changed_or_new": changed, "removed": sorted(set(old) - set(current["entries"]))}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root")
    parser.add_argument("--kind", choices=["skills", "rules"], default="skills")
    parser.add_argument("--previous", type=Path)
    parser.add_argument("--out", type=Path)
    args = parser.parse_args()
    result = inventory(args.root, args.kind)
    if args.previous:
        result["diff"] = compare(result, json.loads(args.previous.read_text(encoding="utf-8")))
    payload = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(payload, encoding="utf-8")
    else:
        print(payload, end="")

if __name__ == "__main__":
    main()
