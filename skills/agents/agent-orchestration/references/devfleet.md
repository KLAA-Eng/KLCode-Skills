# Optional local DevFleet adapter

DevFleet is a separate local MCP server from https://github.com/LEC-AI/claude-devfleet; it is not bundled or installed here. Verify the executable listening on localhost:18801 before connecting. Required tools include plan_project, create_project/create_mission, dispatch_mission, get_mission_status, get_report and cancel_mission.

Inspect the mission DAG, working repository and auto-dispatch/auto-merge settings before execution. Use explicit task authorization; disable remote mutations that are outside scope. A background mission may not inherit this conversation's permissions. Scope each mission/worktree and acceptance contract.

Dispatch root missions only when prerequisites are settled. Poll status rather than using a long blocking wait. Collect reports for completed, failed and cancelled missions. A report is not proof of a verified merge: inspect resulting branches/diffs/checks. Do not silently replace the host's normal agents with this optional service.
