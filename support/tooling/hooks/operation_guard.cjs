#!/usr/bin/env node
'use strict';
// Optional adapter of ECC safety-guard/GateGuard + Matt git-guardrails (MIT).
// Off by default. No hook registration. Native permissions remain authoritative.
const fs=require('node:fs'),path=require('node:path');
function resolvedTarget(value,root){
 let candidate=path.resolve(root,value),pending=[];
 while(!fs.existsSync(candidate)){const parent=path.dirname(candidate);if(parent===candidate)break;pending.unshift(path.basename(candidate));candidate=parent;}
 return path.resolve(fs.realpathSync(candidate),...pending);
}
function inside(root,target){const rel=path.relative(root,target);return rel===''||(!path.isAbsolute(rel)&&rel!=='..'&&!rel.startsWith('..'+path.sep));}
function decide(payload,mode='off',root=process.cwd()){
 if(mode==='off')return null;
 if(!['careful','freeze','guard','facts','strict-git'].includes(mode))throw Error('Unknown guard mode');
 const realRoot=fs.realpathSync(root),tool=String(payload.tool_name||''),input=payload.tool_input||{};
 if(['freeze','guard'].includes(mode)&&['Edit','Write','MultiEdit','NotebookEdit'].includes(tool)){
  const targets=tool==='MultiEdit'?(Array.isArray(input.edits)?input.edits.map(e=>e.file_path||input.file_path):[]):[input.file_path||input.notebook_path];
  if(!targets.length||targets.some(t=>typeof t!=='string'||!inside(realRoot,resolvedTarget(t,realRoot))))return 'Write scope is outside the explicitly selected guard root, or target payload is unknown.';
 }
 if(['careful','guard','strict-git'].includes(mode)&&/^(Bash|PowerShell)$/i.test(tool)){
  if(typeof input.command!=='string')return 'Unknown shell payload needs review.';
  const gate=require('../runtime/scripts/hooks/gateguard-fact-force.js');
  if(gate.classifyDestructiveCommand(tool,input.command).length)return 'Supplemental guard detected a destructive command. Inspect concrete targets, recovery and existing authorization.';
  if(mode==='strict-git'&&/\bgit\s+(?:push\b|reset\s+--hard\b|clean\s+-[\w]*f|branch\s+-D\b|(?:checkout|restore)\s+\.)/i.test(input.command))return 'Selected strict Git profile blocks push/destructive Git operations.';
 }
 return null;
}
function main(raw){
 const mode=process.env.KLCODE_GUARD_MODE||'off';
 if(mode==='off')return;
 const root=process.env.KLCODE_GUARD_ROOT||process.cwd(),payload=JSON.parse(raw);
 if(mode==='facts'){
  process.env.GATEGUARD_STATE_DIR=process.env.GATEGUARD_STATE_DIR||path.join(fs.realpathSync(root),'.klcode','gateguard');
  process.env.GATEGUARD_BASH_ROUTINE_DISABLED=process.env.GATEGUARD_BASH_ROUTINE_DISABLED||'1';
  const result=require('../runtime/scripts/hooks/gateguard-fact-force.js').run(raw);
  if(result&&typeof result==='object'){
   if(result.stdout)process.stdout.write(result.stdout);
   if(result.stderr)process.stderr.write(result.stderr+'\n');
   process.exitCode=result.exitCode||0;
  }return;
 }
 const reason=decide(payload,mode,root);
 if(reason)process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:'PreToolUse',permissionDecision:'deny',permissionDecisionReason:reason}}));
}
module.exports={decide,resolvedTarget,inside};
if(require.main===module){
 try{main(fs.readFileSync(0,'utf8'));}catch(error){process.stderr.write('Guard adapter configuration/input error: '+error.message+'\n');process.exitCode=2;}
}
