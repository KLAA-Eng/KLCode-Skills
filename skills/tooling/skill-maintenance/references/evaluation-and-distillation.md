# Skill quality, quick review and rule distillation

Adapted from ECC stocktake, skill-host-compat, skill-scout and rules-distill.

## Inventory and resumption
Record exact scoped paths, content fingerprints and source metadata. A baseline must include all reviewed skill resources, not just entrypoint mtime: changed scripts can alter behavior without touching SKILL.md. Compare the same root/scope; exclude archived content intentionally and explain excluded paths. Carry forward an evaluation only when its fingerprint and governing policy still match.

For a large review, use bounded independent batches when delegation is selected. Each evaluator receives actual paths/inventory, checklist and output format; environment variables in the parent do not automatically become an agent brief. Preserve one results ledger with completed/pending entries and evidence. A missing record is pending, not implied keep.

## Evaluate
Check distinctive output and trigger; overlap in words alone does not prove duplicate jobs. Review unique behavior, useful branch detail, current dependencies, invocation metadata, source/runtime paths, licenses, external services and host limitations. Frequency is unmeasured unless actually observed; missing telemetry is not zero use.

Verdicts: keep (state why useful), improve (specific change), update (verified stale assumption), merge (named destination and unique content to retain), retire (defect and replacement/absence of useful behavior). Do not use 'unchanged', 'too long' or 'superseded' without sufficient evidence.

Search local catalog before new creation when useful. External candidates need source/license/dependency review; a popularity ranking does not establish suitability. Honor a request to create from scratch.

## Distill cross-cutting rules
A candidate should occur in multiple workflows, change action, have a concrete violation risk, and not already be covered in existing rules. Keep framework-specific details/examples in the skill or focused reference. Compare full rule meaning rather than keyword matches.

Verdicts: append, revise, new section, new file, already covered, too specific. Record principle, source sections, risk, exact target, confidence and proposed text. For revision provide before/after and why. Apply the approved scope without re-asking the same decision; preserve source attribution and update pointers.

## Host checks
Keep required name/description and supported metadata. Do not project Claude-only substitutions into executable host-neutral shell examples. Positional shell parameters are context-dependent, not automatically invalid. Metadata checks do not test instruction quality, actual host discovery, or runtime behavior. CI can use the bundled validator with its selected root; no mirror copy is required merely because another host once used one.
