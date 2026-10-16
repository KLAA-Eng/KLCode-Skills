# Release identity and readback

Adapted from ECC github-ops/references/ecc-release-checklist.md; upstream incident IDs, versions, commit SHAs, registry package names and announcement channels are historical examples, not requirements for this repository.

Pin the selected release commit and required green checks. Use the repository's designated branch/owner/channel/version process. Keep product version, tag identity, package metadata, artifact hash and release notes coherent without assuming a generated build-metadata source SHA equals a later squash commit.

If signed annotated tags are part of the release policy, verify the actual signature and target commit. Never move or silently reuse a published tag/version to conceal an identity error; follow the repository recovery policy.

Build and verify one distributable artifact, then publish those exact bytes within task authorization. A registry lookup failure may be an access/network problem rather than proof a version is unused. Distinguish absence from unknown; do not publish a conflicting replacement merely because a read failed.

Read back the remote ref, release channel/target, registry metadata and uploaded asset/hash as applicable. A successful CLI exit is not enough when publication can be delayed or partially applied. Do not promote a registry tag or replace assets outside the approved release scope.

Announcements are separate message-sending actions and need explicit instructions. Report shipped behavior and known host limitations accurately; never claim planned functionality as delivered. Keep artifact/version evidence in the existing release record.
