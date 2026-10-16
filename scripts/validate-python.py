"""Compile bundled Python helpers without creating bytecode; optionally run Skill Creator validation."""
from __future__ import annotations

import argparse
import ast
import json
from pathlib import Path
import runpy
import tomllib


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skill-validator", type=Path, help="Path to Skill Creator's quick_validate.py")
    parser.add_argument("--partial", action="store_true", help="Only inspect canonical skills already present")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    manifest = json.loads((root / "consolidation/manifest.json").read_text(encoding="utf-8-sig"))
    errors: list[str] = []
    scripts = 0
    validated = 0
    roots = [root / item["path"] for item in manifest["skills"]]
    catalog = json.loads((root / "plugin/catalog.json").read_text(encoding="utf-8-sig"))
    skill_entries = list(manifest["skills"]) + [
        {"path": entry["codex"]} for entry in catalog["commands"] if entry.get("kind") != "canonical"
    ]
    roots.extend(root / entry["codex"] for entry in catalog["commands"] if entry.get("kind") != "canonical")
    roots.append(root / "support")
    for directory in roots:
        if not directory.exists():
            continue
        for filename in directory.rglob("*.py"):
            try:
                ast.parse(filename.read_text(encoding="utf-8-sig"), filename=str(filename))
                scripts += 1
            except (SyntaxError, UnicodeError) as exc:
                errors.append(f"{filename.relative_to(root)}: {exc}")
    if args.skill_validator:
        validate = runpy.run_path(str(args.skill_validator))["validate_skill"]
        for item in skill_entries:
            directory = root / item["path"]
            if not directory.exists() and args.partial:
                continue
            try:
                ok, reason = validate(directory)
                validated += 1
                if not ok:
                    errors.append(f"{item['path']}: {reason}")
            except Exception as exc:
                errors.append(f"{item['path']}: {type(exc).__name__}: {exc}")
    agent_templates = 0
    for entry in catalog["agents"]:
        try:
            agent = tomllib.loads((root / entry["codex"]).read_text(encoding="utf-8-sig"))
            agent_templates += 1
            if agent.get("name") != entry["name"] or not all(isinstance(agent.get(key), str) and agent[key].strip() for key in ("description", "developer_instructions")):
                errors.append(f"{entry['codex']}: invalid native role template")
        except Exception as exc:
            errors.append(f"{entry['codex']}: {type(exc).__name__}: {exc}")
    print(json.dumps({"status": "failed" if errors else "passed", "python_scripts": scripts,
                      "official_skill_validations": validated, "agent_templates": agent_templates, "errors": errors}, indent=2))
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
