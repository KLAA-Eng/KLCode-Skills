# Select verification from the actual change

Adapted from ECC verification-loop/terminal-ops and Caveman verify-and-stop.

| Surface | Evidence | Important limit |
|---|---|---|
| Python command/helper | Repo unittest/pytest and syntax compatibility checks | A modern CPython compile does not prove IronPython 2.7 compatibility or Revit API behavior |
| .NET | Correct SDK/target build and focused xUnit tests | net9 success does not prove net48/Revit host or Windows resources |
| C++ | Existing CMake/CTest and selected sanitizers | Timing, ABI and host integration may still need target execution |
| Browser | Relevant unit/E2E, trace, screenshots, keyboard checks | No visual baseline means no visual regression verdict |
| WPF/Avalonia | VM/headless tests plus actual click/binding/resource smoke | Calling a command directly bypasses real button routing |
| Revit/Excel/vendor | Disposable representative fixture, cancellation, transactions, COM and output readback | Mock/simulator proof is separate from live acceptance |
| Graphics | Supported-device launch, picking/camera/render proof, appropriate performance fixture | Environment-gated skip is not success |
| File/schema change | Old/new fixtures, identity/units, idempotence, partial-failure recovery | A successful parser call does not prove semantic preservation |
| Release | Repository release gate, package contents/version/startup and required acceptance | One built target does not establish all supported host versions |

Discover commands from repository instructions, manifests and existing scripts. For Node projects use the bundled detector only to read scripts/lockfiles; it never establishes that tests actually ran. Avoid running all suites in parallel when a repository shares fixtures or test hosts.

Capture command, working directory, revision/source state, relevant environment, exit code, and concise output. Preserve the real exit status when truncating output; in PowerShell capture $LASTEXITCODE immediately for native processes. In POSIX pipelines use pipefail or separate producer status. Do not replace a failing producer's code with a successful tail/tee code.

No required check may become a silent pass. Outcomes: PASS, FAIL, UNAVAILABLE, NOT APPLICABLE, or INCONCLUSIVE. Describe why unavailable/inconclusive evidence matters. Report inspected/changed/verified/committed/pushed/deployed as different states with independent proof. Stop after required evidence is sufficient.
