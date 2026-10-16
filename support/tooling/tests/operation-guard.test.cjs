#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {decide,inside}=require('../hooks/operation_guard.cjs');
const {spawnSync}=require('node:child_process');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'klcode-guard-test-'));
try{
 assert.equal(decide({},'off',temp),null);
 assert.equal(decide({tool_name:'Write',tool_input:{file_path:'inside.txt'}},'freeze',temp),null);
 assert.match(decide({tool_name:'Write',tool_input:{file_path:'../escape.txt'}},'freeze',temp),/outside/);
 assert.equal(inside(temp,temp+'-sibling'),false);
 assert.match(decide({tool_name:'Bash',tool_input:{command:'rm -rf ./owned'}},'careful',temp),/destructive/);
 assert.equal(decide({tool_name:'Bash',tool_input:{command:'git status --short'}},'careful',temp),null);
 assert.match(decide({tool_name:'Bash',tool_input:{command:'git push origin branch'}},'strict-git',temp),/Git/);
 assert.equal(fs.existsSync(path.join(temp,'.klcode')),false);
 const payload=JSON.stringify({tool_name:'Write',tool_input:{file_path:path.join(temp,'new.py'),content:'value = 1\n'},cwd:temp,session_id:'offline-fact-gate'});
 const invoke=()=>spawnSync(process.execPath,[path.resolve(__dirname,'../hooks/operation_guard.cjs')],{encoding:'utf8',input:payload,env:{...process.env,KLCODE_GUARD_MODE:'facts',KLCODE_GUARD_ROOT:temp,GATEGUARD_STATE_DIR:path.join(temp,'.klcode','gateguard'),GATEGUARD_DISABLED:'0',ECC_GATEGUARD:'on'}});
 const first=invoke();assert.equal(first.status,0,first.stderr);assert.equal(JSON.parse(first.stdout).hookSpecificOutput.permissionDecision,'deny');
 const retry=invoke();assert.equal(retry.status,0,retry.stderr);assert.equal(retry.stdout,'');
 console.log('PASS: disabled/no-state, root/traversal checks, destructive/read-only/strict Git, full imported fact-gate first denial and retry with isolated state.');
}finally{
 const resolved=fs.realpathSync(temp);assert.equal(path.dirname(resolved),fs.realpathSync(os.tmpdir()));assert.ok(path.basename(resolved).startsWith('klcode-guard-test-'));fs.rmSync(resolved,{recursive:true});
}
