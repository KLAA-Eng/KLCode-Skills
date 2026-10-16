#!/usr/bin/env node
'use strict';
// Adapted from ref.ECC/skills/prompt-caching-strategy/SKILL.md, MIT.
// Offline arithmetic only. Rates are supplied by the caller, never live quotes.
function compareCacheCost(usage, rates) {
  for (const [values, keys] of [[usage,['uncached','written','read','output','storageTokenHours']],[rates,['input','write','read','output','storage']]]) {
    if (!values || typeof values !== 'object') throw new TypeError('usage and rates must be objects');
    for (const key of keys) if (!Number.isFinite(values[key]) || values[key] < 0) throw new RangeError(key+' must be a finite nonnegative number');
  }
  const outputCost = usage.output * rates.output / 1e6;
  const storageCost = usage.storageTokenHours * rates.storage / 1e6;
  const baseline = (usage.uncached + usage.written + usage.read) * rates.input / 1e6 + outputCost;
  const actual = (usage.uncached*rates.input + usage.written*rates.write + usage.read*rates.read)/1e6 + outputCost + storageCost;
  return { baseline, actual, savings: baseline-actual, outputCost, storageCost };
}
module.exports = { compareCacheCost };
if (require.main === module) {
  if (process.argv[2] === '--self-test') {
    const assert = require('node:assert/strict');
    const rates={input:3,write:3.75,read:0.3,output:15,storage:1};
    const usage={uncached:20000,written:10000,read:90000,output:20000,storageTokenHours:0};
    const result=compareCacheCost(usage,rates);
    assert.ok(Math.abs(result.baseline-0.66)<1e-12);
    assert.ok(Math.abs(result.actual-0.4245)<1e-12);
    assert.ok(Math.abs(compareCacheCost({...usage,storageTokenHours:20000},rates).actual-0.4445)<1e-12);
    assert.ok(compareCacheCost({uncached:0,written:10000,read:0,output:0,storageTokenHours:0},rates).savings < 0);
    assert.throws(()=>compareCacheCost({...usage,read:-1},rates));
    assert.throws(()=>compareCacheCost(usage,{...rates,output:NaN}));
    console.log('PASS: warm reuse, storage, one-off write premium, invalid usage/rates.');
  } else {
    try {
      const fs=require('node:fs');
      const data=JSON.parse(fs.readFileSync(0,'utf8'));
      console.log(JSON.stringify(compareCacheCost(data.usage,data.rates),null,2));
    } catch(error) { console.error(error.message); process.exitCode=1; }
  }
}
