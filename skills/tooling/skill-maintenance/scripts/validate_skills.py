"""Recursive skill metadata/link/host checks adapted from ECC CI validators (MIT).

Requires PyYAML. No installation, model call or host registration is performed.
"""
import argparse
import json
from pathlib import Path
import re
import sys

import yaml

KEYS = {"name", "description", "metadata", "license", "allowed-tools", "compatibility"}
CLAUDE_TOKENS = re.compile(r"\$(?:\{)?(?:CLAUDE_(?:SESSION_ID|SKILL_DIR|PLUGIN_ROOT|PROJECT_DIR)|ARGUMENTS)(?:\})?")

def validate(root, portable=True):
    root = Path(root).resolve(strict=True)
    errors, warnings, count = [], [], 0
    for file in sorted(root.rglob("SKILL.md")):
        if file.is_symlink() or any(p in {".git", "node_modules", ".trash", "_archived"} for p in file.relative_to(root).parts):
            continue
        count += 1
        text = file.read_text(encoding="utf-8-sig")
        match = re.match(r"^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)", text)
        if not match:
            errors.append({"path": str(file), "issue": "missing frontmatter"})
            continue
        try:
            front = yaml.safe_load(match[1])
        except yaml.YAMLError:
            errors.append({"path": str(file), "issue": "invalid YAML"})
            continue
        if not isinstance(front, dict):
            errors.append({"path": str(file), "issue": "frontmatter must be a mapping"})
            continue
        name = front.get("name")
        if not isinstance(name, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name) or len(name) > 64:
            errors.append({"path": str(file), "issue": "name must be 1-64 lowercase letters/digits with single internal hyphens"})
        if name != file.parent.name:
            errors.append({"path": str(file), "issue": "name does not match directory"})
        if not isinstance(front.get("description"), str) or not front["description"].strip():
            errors.append({"path": str(file), "issue": "description must be a nonempty string"})
        if portable and set(front) - KEYS:
            errors.append({"path": str(file), "issue": "host-specific/unsupported frontmatter keys", "keys": sorted(set(front) - KEYS)})
        fenced, language, prose = False, "", []
        for line in text.splitlines():
            fence = re.match(r"^\s*(?:\x60\x60\x60|~~~)(.*)$", line)
            if fence:
                fenced = not fenced
                language = fence.group(1).strip().lower() if fenced else ""
                continue
            if fenced:
                if portable and language in {"bash", "sh", "zsh", "powershell", "ps1"} and CLAUDE_TOKENS.search(line):
                    errors.append({"path": str(file), "issue": "Claude-only variable in portable executable example"})
            else:
                prose.append(line)
        if fenced:
            errors.append({"path": str(file), "issue": "unclosed fence"})
        for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", "\n".join(prose)):
            target = target.strip("<>").split("#", 1)[0]
            if not target or re.match(r"^[a-z][a-z0-9+.-]*:", target, re.I):
                continue
            if not (file.parent / target).exists():
                errors.append({"path": str(file), "issue": "missing resource", "target": target})
        policy = file.parent / "agents" / "openai.yaml"
        if policy.exists():
            try:
                config = yaml.safe_load(policy.read_text(encoding="utf-8"))
                implicit = config.get("policy", {}).get("allow_implicit_invocation", True)
                if not isinstance(implicit, bool):
                    errors.append({"path": str(policy), "issue": "invocation policy must be boolean"})
            except (yaml.YAMLError, AttributeError):
                errors.append({"path": str(policy), "issue": "invalid openai.yaml"})
    if not count:
        warnings.append("No SKILL.md files found under the explicit root")
    return {"skills": count, "errors": errors, "warnings": warnings}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root")
    parser.add_argument("--host", choices=["portable", "claude"], default="portable")
    args = parser.parse_args()
    report = validate(args.root, args.host == "portable")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if report["errors"] else 0

if __name__ == "__main__":
    sys.exit(main())
