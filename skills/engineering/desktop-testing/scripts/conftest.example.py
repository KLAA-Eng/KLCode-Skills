"""Copy/adapt into the target suite; never loaded automatically.

MIT adaptation of ECC windows-desktop-e2e Tier 1 isolation.
Requires pytest, pywinauto, Windows and an unlocked interactive test session.
Set DESKTOP_TEST_EXE to the test executable, not a user's existing session.
"""
import os
from pathlib import Path
import subprocess

import pytest

@pytest.fixture
def owned_app(tmp_path):
    executable = os.environ.get("DESKTOP_TEST_EXE")
    if not executable:
        pytest.skip("DESKTOP_TEST_EXE is not configured")
    executable = Path(executable).resolve(strict=True)
    environment = os.environ.copy()
    # Apps must explicitly support this setting; it is not OS isolation.
    environment["DESKTOP_TEST_WORK"] = str(tmp_path)
    process = subprocess.Popen([str(executable)], cwd=str(tmp_path), env=environment)
    try:
        from pywinauto.application import Application
        app = Application(backend="uia").connect(process=process.pid, timeout=20)
        yield app, tmp_path
    finally:
        # Only terminate the process launched here. Child-process containment
        # needs an explicitly configured Job Object or disposable OS sandbox.
        if process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)
