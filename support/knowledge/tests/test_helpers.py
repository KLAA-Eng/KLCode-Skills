"""Meaningful local evidence checks for documentation audit and tour anchors."""
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parents[1] / "scripts"


class Helpers(unittest.TestCase):
    def run_script(self, script, *args):
        return subprocess.run([sys.executable, "-X", "utf8", "-B", str(SCRIPTS / script), *map(str, args)], capture_output=True, text=True, encoding="utf-8")

    def test_document_links_and_no_mutation(self):
        with tempfile.TemporaryDirectory(prefix="klcode-doc-audit-") as temp:
            root = Path(temp)
            (root / "README.md").write_text("[missing](missing.md)\n", encoding="utf-8")
            before = sorted(str(p.relative_to(root)) for p in root.rglob("*"))
            result = self.run_script("docs-audit/audit-docs.py", "--root", root, "--scope", "artifacts")
            self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
            self.assertEqual(before, sorted(str(p.relative_to(root)) for p in root.rglob("*")))
            (root / "missing.md").write_text("# Real target\n", encoding="utf-8")
            result = self.run_script("docs-audit/audit-docs.py", "--root", root, "--scope", "artifacts")
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_tour_real_and_invalid_anchor(self):
        with tempfile.TemporaryDirectory(prefix="klcode-tour-") as temp:
            root = Path(temp)
            (root / "main.py").write_text("def main():\n    pass\n", encoding="utf-8")
            tour = root / "test.tour"
            data = {"title": "Actual code", "steps": [{"file": "main.py", "line": 1, "description": "Entry function"}]}
            tour.write_text(json.dumps(data), encoding="utf-8")
            self.assertEqual(self.run_script("validate-tour.py", tour, "--root", root).returncode, 0)
            data["steps"][0]["line"] = 99
            tour.write_text(json.dumps(data), encoding="utf-8")
            self.assertEqual(self.run_script("validate-tour.py", tour, "--root", root).returncode, 1)
            data["steps"][0]["file"] = "../outside.py"
            tour.write_text(json.dumps(data), encoding="utf-8")
            self.assertEqual(self.run_script("validate-tour.py", tour, "--root", root).returncode, 1)

    def test_adr_supersession_and_history_share_default_directory(self):
        with tempfile.TemporaryDirectory(prefix="klcode-adr-audit-") as temp:
            root = Path(temp)
            adrs = root / "docs/decisions"
            adrs.mkdir(parents=True)
            (adrs / "README.md").write_text("[Original](0001-original.md)\n[Replacement](0002-replacement.md)\n", encoding="utf-8")
            original = adrs / "0001-original.md"
            replacement = adrs / "0002-replacement.md"
            (adrs / "history.md").write_text("# History\n\n## [2026-10-16] Change | API transport changed\nStatus: Accepted\n", encoding="utf-8")
            (adrs / "history-archive.md").write_text("# Earlier history\n", encoding="utf-8")
            for prefix in ("", "ADR-"):
                with self.subTest(prefix=prefix):
                    original.write_text(f"# {prefix}0001: Original\nStatus: Superseded by {prefix}0002\n\n[Successor](0002-replacement.md)\n", encoding="utf-8")
                    replacement.write_text(f"# {prefix}0002: Replacement\nStatus: Accepted\n\n[Predecessor](0001-original.md)\n", encoding="utf-8")
                    result = self.run_script("docs-audit/audit-docs.py", "--root", root, "--scope", "adr")
                    self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                    self.assertIn("all 2 decision files", result.stdout)
            original.write_text("# 0001: Original\nStatus: Superseded by [0002](0002-replacement.md)\n", encoding="utf-8")
            self.assertEqual(self.run_script("docs-audit/audit-docs.py", "--root", root, "--scope", "adr").returncode, 0)
            replacement.write_text("# Broken decision record\nNo lifecycle status supplied.\n", encoding="utf-8")
            result = self.run_script("docs-audit/audit-docs.py", "--root", root, "--scope", "adr")
            self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
            self.assertIn("ADR has no parseable status", result.stdout)
            self.assertIn("0002-replacement.md", result.stdout)
            self.assertIn("ADR inline successor does not exist", result.stdout)

    def test_literature_local_deduplication(self):
        script = Path(__file__).resolve().parents[3] / "skills/knowledge/literature-review/scripts/search_databases.py"
        with tempfile.TemporaryDirectory(prefix="klcode-literature-") as temp:
            source = Path(temp) / "records.json"
            source.write_text(json.dumps([
                {"title": "A", "doi": "https://doi.org/10.1234/ABC", "year": 2020},
                {"title": "A duplicate record", "doi": "10.1234/abc", "year": 2020},
                {"title": "B", "doi": "10.1234/def", "year": 2024},
            ]), encoding="utf-8")
            result = subprocess.run([sys.executable, "-X", "utf8", "-B", str(script), str(source), "--deduplicate", "--format", "json"], capture_output=True, text=True, encoding="utf-8")
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(len(json.loads(result.stdout)), 2)
            source.write_text(json.dumps({"provider": "raw envelope"}), encoding="utf-8")
            result = subprocess.run([sys.executable, "-X", "utf8", "-B", str(script), str(source)], capture_output=True, text=True, encoding="utf-8")
            self.assertNotEqual(result.returncode, 0)


if __name__ == "__main__":
    unittest.main()
