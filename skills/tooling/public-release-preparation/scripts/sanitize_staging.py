"""Read-only staging scan adapted from ECC opensource-sanitizer (MIT).

Reports categories/locations, never matched values. Does not inspect VCS history,
execute source, modify files or prove binaries are cleared.
"""
import argparse
import json
from pathlib import Path
import re
import sys

PATTERNS = {
    "aws-access-key": re.compile(r"AKIA[0-9A-Z]{16}"),
    "github-token": re.compile(r"gh[pousr]_[A-Za-z0-9_]{36,}|github_pat_[A-Za-z0-9_]{22,}"),
    "private-key": re.compile(r"-----BEGIN\s+(?:(?:RSA|EC|DSA|OPENSSH)\s+)?PRIVATE KEY-----"),
    "database-credential-url": re.compile(r"(?:postgres|mysql|mongodb|redis)://[^:\s]+:[^@\s]+@"),
    "slack-webhook": re.compile(r"https://hooks\.slack\.com/services/T[A-Z0-9]+/B[A-Z0-9]+/[A-Za-z0-9]+"),
    "assigned-api-secret": re.compile(r"(?:api[_-]?key|api[_-]?secret)\s*[=:]\s*['\"]?[A-Za-z0-9+/=_-]{16,}", re.I),
}

def scan(root, max_bytes=10_000_000):
    root = Path(root).resolve(strict=True)
    findings, unreviewed, skipped, scanned = [], [], [], 0
    for file in sorted(root.rglob("*")):
        relative = file.relative_to(root).as_posix()
        if any(p in {".git", "node_modules", ".venv", "__pycache__"} for p in file.relative_to(root).parts):
            continue
        if file.is_symlink():
            unreviewed.append({"path": relative, "reason": "symlink not followed"})
            continue
        if not file.is_file():
            continue
        try:
            if file.stat().st_size > max_bytes:
                skipped.append({"path": relative, "reason": "size limit"})
                continue
            data = file.read_bytes()
            if b"\0" in data:
                raise UnicodeError("binary")
            text = data.decode("utf-8-sig")
        except (OSError, UnicodeError):
            unreviewed.append({"path": relative, "reason": "unreadable or non-UTF8/binary"})
            continue
        scanned += 1
        for number, line in enumerate(text.splitlines(), 1):
            for category, pattern in PATTERNS.items():
                if pattern.search(line):
                    findings.append({"path": relative, "line": number, "category": category})
    return {"scope": str(root), "status": "FINDINGS" if findings else "REVIEW" if unreviewed or skipped else "TEXT_SCAN_CLEAR", "scanned_text_files": scanned, "findings": findings, "unreviewed": unreviewed, "skipped": skipped, "limits": ["Working tree text only; VCS history, dependencies and binary asset acceptance require separate review."]}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root")
    args = parser.parse_args()
    result = scan(args.root)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 1 if result["findings"] else 2 if result["unreviewed"] or result["skipped"] else 0

if __name__ == "__main__":
    sys.exit(main())
