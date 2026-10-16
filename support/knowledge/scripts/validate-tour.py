#!/usr/bin/env python3
"""Validate CodeTour JSON and inspected anchors; no extension/network required."""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path


def validate(root, tour):
    root = root.resolve()
    data = json.loads(tour.read_text(encoding="utf-8"))
    if not isinstance(data, dict) or not isinstance(data.get("title"), str):
        raise ValueError("tour requires a title")
    steps = data.get("steps")
    if not isinstance(steps, list) or not steps:
        raise ValueError("tour requires nonempty steps")
    ref = data.get("ref")
    if ref:
        subprocess.run(["git", "-C", str(root), "rev-parse", "--verify", ref + "^{commit}"], check=True, capture_output=True, timeout=10)
    for number, step in enumerate(steps, 1):
        if not isinstance(step, dict) or not isinstance(step.get("description"), str):
            raise ValueError(f"step {number}: missing description")
        rel = step.get("file") or step.get("directory")
        if number == 1 and not rel:
            raise ValueError("first step must reference a real file or directory")
        if not rel:
            continue
        if not isinstance(rel, str) or Path(rel).is_absolute():
            raise ValueError(f"step {number}: invalid repository-relative path")
        target = (root / rel).resolve()
        if not target.is_relative_to(root):
            raise ValueError(f"step {number}: path escapes repository")
        if ref:
            kind = subprocess.run(["git", "-C", str(root), "cat-file", "-t", ref + ":" + rel], check=True, capture_output=True, text=True, timeout=10).stdout.strip()
            if "directory" in step:
                if kind != "tree":
                    raise ValueError(f"step {number}: revision target is not directory")
                continue
            content = subprocess.run(["git", "-C", str(root), "show", ref + ":" + rel], check=True, capture_output=True, text=True, encoding="utf-8", timeout=10).stdout
        else:
            if "directory" in step:
                if not target.is_dir():
                    raise ValueError(f"step {number}: directory missing")
                continue
            content = target.read_text(encoding="utf-8")
        lines = content.splitlines()
        if "line" in step:
            line = step["line"]
            if not isinstance(line, int) or isinstance(line, bool) or not 1 <= line <= len(lines):
                raise ValueError(f"step {number}: line out of range")
        if "pattern" in step and not re.search(step["pattern"], content):
            raise ValueError(f"step {number}: pattern not found")
        if "selection" in step:
            start, end = step["selection"]["start"], step["selection"]["end"]
            points = []
            for point in (start, end):
                line, char = point["line"], point["character"]
                if not isinstance(line, int) or not isinstance(char, int) or not 1 <= line <= len(lines) or not 0 <= char <= len(lines[line - 1]):
                    raise ValueError(f"step {number}: selection out of range")
                points.append((line, char))
            if points[0] > points[1]:
                raise ValueError(f"step {number}: reversed selection")
    return len(steps)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("tour", type=Path)
    parser.add_argument("--root", type=Path, default=Path.cwd())
    args = parser.parse_args()
    try:
        count = validate(args.root, args.tour)
        print(f"Valid tour: {count} inspected steps")
        return 0
    except (ValueError, KeyError, TypeError, OSError, subprocess.SubprocessError) as error:
        print(f"Invalid or unverified tour: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
