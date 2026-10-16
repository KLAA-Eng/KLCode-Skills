"""Static MCP selector audit adapted from ECC mcp-dependency-review (MIT).

Reads only an explicitly named JSON file. Never executes, resolves or installs
a server. Unsupported runners/options produce REVIEW and are never omitted.
"""
import argparse
import json
from pathlib import Path
import re
import sys

def classify(selector, ecosystem):
    if not isinstance(selector, str) or not selector:
        return "REVIEW"
    if ecosystem == "docker":
        if re.search(r"@sha256:[0-9a-fA-F]{64}$", selector):
            return "SAFE"
        return "REVIEW" if "@" in selector else "HIGH"
    if re.search(r"(?:https?://|git\+|file:|^[./]|^[A-Za-z]:)", selector):
        return "REVIEW"
    if ecosystem == "python":
        if re.fullmatch(r"[A-Za-z0-9_.-]+(?:\[[A-Za-z0-9_,.-]+\])?(?:==|@)\d+(?:\.\d+)+(?:[A-Za-z0-9.+-]*)", selector):
            return "SAFE"
        if any(mark in selector for mark in ("<", ">", "~=", "!=", "==", "*")):
            return "MEDIUM"
        if "@" in selector and not selector.endswith("@latest"):
            return "REVIEW"
        return "HIGH"
    # npm scopes are part of the name, not a version separator.
    match = re.fullmatch(r"(@[^/@\s]+/[^@\s]+|[^@/\s]+)(?:@([^\s]+))?", selector)
    if not match:
        return "REVIEW"
    version = match.group(2)
    if version and re.fullmatch(r"\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?", version):
        return "SAFE"
    if version and re.search(r"[~^*<>=| ]|^\d+(?:\.\d+)?(?:\.x)?$", version):
        return "MEDIUM"
    return "HIGH"

def safe_reference(value):
    if re.search(r"https?://|git\+|file:", value):
        return "<direct-url-or-vcs>"
    return value

def selectors(command, args):
    runner = command.replace("\\", "/").rsplit("/", 1)[-1].removesuffix(".exe").lower()
    tokens = list(args)
    ecosystem = "npm"
    if runner == "npm":
        if not tokens or tokens.pop(0) != "exec":
            return [], "unsupported npm invocation"
    elif runner == "pnpm" or runner == "yarn":
        if not tokens or tokens.pop(0) != "dlx":
            return [], "unsupported runner subcommand"
    elif runner == "bun":
        if not tokens or tokens.pop(0) != "x":
            return [], "unsupported bun invocation"
    elif runner in {"uvx", "pipx", "uv"}:
        ecosystem = "python"
        if runner == "pipx":
            if not tokens or tokens.pop(0) != "run":
                return [], "unsupported pipx invocation"
        if runner == "uv":
            if tokens[:2] != ["tool", "run"]:
                return [], "unsupported uv invocation"
            tokens = tokens[2:]
    elif runner == "docker":
        ecosystem = "docker"
        if tokens[:2] == ["container", "run"]:
            tokens = tokens[2:]
        elif tokens[:1] == ["run"]:
            tokens = tokens[1:]
        else:
            return [], "unsupported docker invocation"
    elif runner not in {"npx", "bunx"}:
        return [], "local, wrapped or unknown runner"
    found = []
    explicit = []
    primary_explicit = False
    index = 0
    no_value = {"-y", "--yes", "--no-install", "--quiet", "-q"} if ecosystem != "docker" else {"--rm", "-i", "-t", "-it", "--init", "--read-only"}
    valued = {"--package", "-p"} if ecosystem == "npm" else {"--from", "--spec", "--with"} if ecosystem == "python" else {"--name", "-e", "--env", "--env-file", "-v", "--volume", "--mount", "-p", "--publish", "--network", "--entrypoint", "-w", "--workdir", "-u", "--user"}
    while index < len(tokens):
        token = tokens[index]
        if token == "--":
            index += 1
            break
        key, equal, value = token.partition("=")
        if key in no_value:
            index += 1
            continue
        if key in valued:
            if not equal:
                index += 1
                if index >= len(tokens):
                    return [], "missing option value"
                value = tokens[index]
            if ecosystem != "docker":
                explicit.append(value)
                if ecosystem == "npm" or key in {"--from", "--spec"}:
                    primary_explicit = True
            index += 1
            continue
        if token.startswith("-"):
            return [], "unsupported option boundaries"
        break
    found.extend(explicit)
    if not primary_explicit and index < len(tokens):
        found.append(tokens[index])
    if not found:
        return [], "no isolated package/image selector"
    return [(ecosystem, value) for value in found], None

def audit(data):
    servers = data.get("mcpServers") or data.get("servers") or data.get("mcp", {}).get("servers")
    if not isinstance(servers, dict):
        raise ValueError("No supported MCP server mapping")
    results = []
    for name, config in servers.items():
        if not isinstance(config, dict):
            results.append({"server": name, "result": "REVIEW", "reason": "non-object server definition"})
            continue
        if "image" in config and isinstance(config["image"], str):
            result = classify(config["image"], "docker")
            results.append({"server": name, "ecosystem": "docker", "reference": safe_reference(config["image"]), "result": result})
            continue
        command, args = config.get("command"), config.get("args", [])
        if not isinstance(command, str) or not isinstance(args, list) or not all(isinstance(v, str) for v in args):
            results.append({"server": name, "result": "REVIEW", "reason": "remote/unknown command schema"})
            continue
        selected, problem = selectors(command, args)
        if problem:
            results.append({"server": name, "result": "REVIEW", "reason": problem})
        for ecosystem, selector in selected:
            results.append({"server": name, "ecosystem": ecosystem, "reference": safe_reference(selector), "result": classify(selector, ecosystem)})
    return {"servers": len(servers), "findings": results, "limit": "SAFE classifies the direct selector only, not package safety, integrity or transitive reproducibility."}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("config", type=Path)
    args = parser.parse_args()
    result = audit(json.loads(args.config.read_text(encoding="utf-8-sig")))
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 1 if any(f["result"] in {"HIGH", "MEDIUM", "REVIEW"} for f in result["findings"]) else 0

if __name__ == "__main__":
    sys.exit(main())
