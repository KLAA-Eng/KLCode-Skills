# Python Testing

Extends [shared testing](../common/testing.md).

## Framework
Keep the existing compatible framework. pytest is suitable where supported; unittest or a host harness can be necessary for IronPython or embedded environments.

## Coverage
Default to test-first for new testable logic and bug fixes, with practical exceptions from the shared rule. Target 80% for new or substantially changed testable code, not a repository gate. When pytest-cov is installed, adapt `python -m pytest --cov=<package> --cov-report=term-missing` to the actual interpreter and package. Explain exclusions and unmeasurable host code.

## Organization
Name tests by behavior. Separate pure logic, integration and host checks; register pytest unit/integration markers when used. Isolate filesystem, network, time and external effects at realistic boundaries.

Use [Python development](../../skills/languages/python-development/SKILL.md). A different interpreter's pass does not prove host behavior.
