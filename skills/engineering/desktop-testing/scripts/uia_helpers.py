"""Owned-process UIA helpers adapted from ECC windows-desktop-e2e (MIT).

Requires Windows, an interactive desktop and pywinauto. No session attachment or
process termination occurs implicitly. Instantiate with a subprocess PID owned
by the test. Artifacts should contain seeded test data only.
"""
from pathlib import Path
from time import monotonic, sleep

class UiaPage:
    def __init__(self, window, artifact_dir):
        self.window = window
        self.artifact_dir = Path(artifact_dir)

    def by_id(self, automation_id, **properties):
        return self.window.child_window(auto_id=automation_id, **properties)

    def by_name(self, name, **properties):
        return self.window.child_window(title=name, **properties)

    def click(self, control, timeout=10):
        control.wait("visible enabled", timeout=timeout)
        control.click_input()

    def set_text(self, control, value, timeout=10):
        control.wait("visible enabled", timeout=timeout)
        # Fail explicitly if ValuePattern is unsupported. Choose a tested,
        # escaped keyboard fallback in the calling framework-specific test.
        control.wrapper_object().set_edit_text(value)

    @staticmethod
    def wait_until(predicate, timeout=10, interval=0.1):
        deadline = monotonic() + timeout
        while True:
            if predicate():
                return
            if monotonic() >= deadline:
                raise TimeoutError("Expected UI state not observed")
            sleep(interval)

    def screenshot(self, filename):
        # Constrain artifact names to this test's directory.
        if Path(filename).name != filename or not filename.lower().endswith(".png"):
            raise ValueError("Expected a plain PNG filename")
        self.artifact_dir.mkdir(parents=True, exist_ok=True)
        target = self.artifact_dir / filename
        self.window.capture_as_image().save(str(target))
        return target

def connect_owned_process(pid, timeout=15):
    from pywinauto.application import Application
    return Application(backend="uia").connect(process=pid, timeout=timeout)
