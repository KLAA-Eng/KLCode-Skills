"""Observable offline tests for adapted tooling helpers; stdlib unittest + PyYAML."""
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[3]

def load(name, relative):
    spec = importlib.util.spec_from_file_location(name, ROOT / relative)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

inventory = load("inventory", "skills/tooling/skill-maintenance/scripts/inventory.py")
validator = load("validator", "skills/tooling/skill-maintenance/scripts/validate_skills.py")
mcp = load("mcp", "skills/tooling/agent-configuration-security/scripts/audit_mcp.py")
sanitize = load("sanitize", "skills/tooling/public-release-preparation/scripts/sanitize_staging.py")
quality = load("quality", "support/tooling/hooks/quality_hook.py")
delivery = load("delivery", "support/tooling/hooks/delivery_gate.py")

class ToolingOfflineTests(unittest.TestCase):
    def test_inventory_tracks_resource_changes_and_scope(self):
        with tempfile.TemporaryDirectory(prefix="klcode-inventory-") as work:
            root = Path(work)
            skill = root / "example"
            skill.mkdir()
            (skill / "SKILL.md").write_text("---\nname: example\ndescription: Real test skill.\n---\n", encoding="utf-8")
            resource = skill / "helper.py"
            resource.write_text("value = 1\n", encoding="utf-8")
            before = inventory.inventory(root)
            after = inventory.inventory(root)
            self.assertEqual(inventory.compare(after, before)["changed_or_new"], [])
            resource.write_text("value = 2\n", encoding="utf-8")
            changed = inventory.inventory(root)
            self.assertEqual(inventory.compare(changed, before)["changed_or_new"], ["example/SKILL.md"])
            with self.assertRaises(ValueError):
                inventory.compare(changed, {"root": "different", "kind": "skills"})

    def test_validator_finds_metadata_resource_and_host_errors(self):
        with tempfile.TemporaryDirectory(prefix="klcode-validate-") as work:
            root = Path(work)
            skill = root / "example"
            skill.mkdir()
            entry = skill / "SKILL.md"
            entry.write_text("---\nname: wrong\ndescription: Example.\n---\n[missing](absent.md)\n\x60\x60\x60bash\necho $ARGUMENTS\n\x60\x60\x60\n", encoding="utf-8")
            self.assertGreaterEqual(len(validator.validate(root)["errors"]), 3)
            entry.write_text("---\nname: example\ndescription: Example.\n---\nA complete workflow.\n", encoding="utf-8")
            self.assertEqual(validator.validate(root)["errors"], [])

    def test_static_selectors_do_not_execute_and_cover_unknown(self):
        data = {"mcpServers": {
            "packages": {"command": "npx", "args": ["--package", "@scope/one@1.2.3", "--package=two@latest", "--", "tool"]},
            "python": {"command": "uvx", "args": ["--from", "example==1.2.3", "command"]},
            "docker": {"command": "docker", "args": ["run", "--rm", "-e", "SECRET=not-reported", "image:1.2"]},
            "unknown": {"command": "sh", "args": ["-c", "do-not-run"]},
        }}
        report = mcp.audit(data)
        results = [f["result"] for f in report["findings"]]
        self.assertEqual(results, ["SAFE", "HIGH", "SAFE", "HIGH", "REVIEW"])
        self.assertNotIn("not-reported", json.dumps(report))
        self.assertEqual(mcp.classify("image@sha256:" + "a" * 64, "docker"), "SAFE")
        self.assertEqual(mcp.selectors("npx", ["--unknown", "secret"])[0], [])
        extra, problem = mcp.selectors("uvx", ["--with", "requests==2.32.0", "primary@1.2.3"])
        self.assertIsNone(problem)
        self.assertEqual(extra, [("python", "requests==2.32.0"), ("python", "primary@1.2.3")])

    def test_validator_rejects_invalid_skill_names_and_folder_mismatch(self):
        with tempfile.TemporaryDirectory(prefix="klcode-name-validate-") as work:
            root = Path(work)
            for name in ("Bad Name", "bad_name", "-bad", "bad-", "bad--name", "a" * 65):
                with self.subTest(name=name):
                    skill = root / name
                    skill.mkdir()
                    (skill / "SKILL.md").write_text(f"---\nname: {name}\ndescription: Example.\n---\n", encoding="utf-8")
                    errors = validator.validate(skill)["errors"]
                    self.assertTrue(any("1-64" in error["issue"] for error in errors), errors)
            skill = root / "valid-name-2"
            skill.mkdir()
            entry = skill / "SKILL.md"
            for name in ("valid-name-2", "a" * 64):
                target = skill if name == "valid-name-2" else root / name
                target.mkdir(exist_ok=True)
                (target / "SKILL.md").write_text(f"---\nname: {name}\ndescription: Example.\n---\n", encoding="utf-8")
                self.assertEqual(validator.validate(target)["errors"], [])
            entry.write_text("---\nname: another-valid-name\ndescription: Example.\n---\n", encoding="utf-8")
            self.assertTrue(any("directory" in error["issue"] for error in validator.validate(skill)["errors"]))

    def test_sanitizer_redacts_values_and_records_binary_gaps(self):
        with tempfile.TemporaryDirectory(prefix="klcode-sanitize-") as work:
            root = Path(work)
            secret = "AKIA" + "A" * 16
            (root / "source.txt").write_text(secret, encoding="utf-8")
            (root / "image.bin").write_bytes(b"\0binary")
            report = sanitize.scan(root)
            self.assertEqual(report["status"], "FINDINGS")
            self.assertEqual(report["findings"][0]["category"], "aws-access-key")
            self.assertEqual(len(report["unreviewed"]), 1)
            self.assertNotIn(secret, json.dumps(report))

    def test_quality_hook_uses_selected_checks_and_scope(self):
        with tempfile.TemporaryDirectory(prefix="klcode-quality-") as work:
            root = Path(work)
            target = root / "file with spaces.py"
            target.write_text("pass\n", encoding="utf-8")
            config = {"project_root": str(root), "checks": [{"extensions": [".py"], "argv": [sys.executable, "-c", "raise SystemExit(3)"]}]}
            report = quality.run({"tool_input": {"file_path": str(target)}}, config)
            self.assertEqual(report["checks"][0]["exit_code"], 3)
            with self.assertRaises(ValueError):
                quality.run({"tool_input": {"file_path": str(root.parent / "outside.py")}}, config)

    def test_delivery_is_advisory_unless_selected(self):
        with tempfile.TemporaryDirectory(prefix="klcode-delivery-") as work:
            self.assertFalse(delivery.assess(work, ["docs/knowledge/missing.md"])["block"])
            self.assertTrue(delivery.assess(work, ["docs/knowledge/missing.md"], block_learning=True)["block"])
            with self.assertRaises(ValueError):
                delivery.assess(work, ["../outside.md"])

if __name__ == "__main__":
    unittest.main()
