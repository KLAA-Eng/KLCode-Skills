#!/usr/bin/env node
'use strict';
// Local structural checks and observable offline helper cases. No service calls.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../../..');
const {detectNodeTooling}=require('./detect-node-tooling.cjs');
const {compareCacheCost}=require('../../../skills/engineering/llm-cost-optimization/scripts/cache-cost.cjs');
const failures=[];
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);}
const files=[...walk(path.join(root,'skills/engineering')),...walk(path.join(root,'support/engineering'))].filter(p=>!path.basename(p).startsWith('.'));
for(const file of files.filter(p=>p.endsWith('.md'))){
 const text=fs.readFileSync(file,'utf8');
 if(path.basename(file)==='SKILL.md'){
  const fm=text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if(!fm) failures.push(file+': frontmatter missing');
  else{
   const name=fm[1].match(/^name:\s*(.+)$/m)?.[1].trim();
   if(name!==path.basename(path.dirname(file)))failures.push(file+': name mismatch');
   if(!/^description:\s*\S/m.test(fm[1]))failures.push(file+': description missing');
  }
 }
 let fenced=false,visible=[];
 for(const line of text.split(/\r?\n/)){
  if(/^\s*(```|~~~)/.test(line)){fenced=!fenced;continue;}
  if(!fenced)visible.push(line);
 }
 if(fenced)failures.push(file+': unclosed fenced block');
 for(const match of visible.join('\n').matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){
  let target=match[1].replace(/^<|>$/g,'').split('#')[0];
  if(!target||/^[a-z][a-z0-9+.-]*:/i.test(target))continue;
  const dest=path.resolve(path.dirname(file),target);
  if(!fs.existsSync(dest))failures.push(path.relative(root,file)+': missing link '+target);
 }
}
const catalog=JSON.parse(fs.readFileSync(path.join(root,'consolidation/manifest.json'),'utf8')).skills.filter(s=>s.category==='engineering');
assert.equal(catalog.length,22);
for(const skill of catalog)assert.ok(fs.existsSync(path.join(root,skill.path,'SKILL.md')),skill.name);
const inventoryPath=path.join(root,'support/engineering/dependencies.json');
if(fs.existsSync(inventoryPath)){
 const inventory=JSON.parse(fs.readFileSync(inventoryPath,'utf8'));
 for(const entry of inventory.files){
  assert.ok(fs.existsSync(path.join(root,entry.path)),'Missing inventory file: '+entry.path);
  for(const origin of [{source_repo:entry.source_repo,source_path:entry.source_path},...(entry.additional_sources||[])]){
   if(origin.source_repo.startsWith('ref.'))assert.ok(fs.existsSync(path.resolve(root,'..',origin.source_repo,origin.source_path)),'Missing provenance source: '+origin.source_repo+'/'+origin.source_path);
  }
 }
}
const usage={uncached:20000,written:10000,read:90000,output:20000,storageTokenHours:0};
const rates={input:3,write:3.75,read:0.3,output:15,storage:1};
assert.ok(Math.abs(compareCacheCost(usage,rates).actual-0.4245)<1e-12);
assert.ok(Math.abs(compareCacheCost({...usage,storageTokenHours:20000},rates).actual-0.4445)<1e-12);
assert.throws(()=>compareCacheCost({...usage,uncached:Infinity},rates));
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'klcode-engineering-tooling-'));
try{
 assert.equal(detectNodeTooling(fixture).nodeProject,false);
 fs.writeFileSync(path.join(fixture,'package.json'),JSON.stringify({scripts:{test:'vitest run'}}));
 fs.writeFileSync(path.join(fixture,'bun.lock'),'fixture');
 assert.equal(detectNodeTooling(fixture).packageManager,'bun');
 assert.equal(detectNodeTooling(fixture).scripts.test,'vitest run');
 fs.writeFileSync(path.join(fixture,'pnpm-lock.yaml'),'fixture');
 assert.equal(detectNodeTooling(fixture).ambiguous,true);
 assert.equal(detectNodeTooling(fixture).packageManager,null);
 fs.writeFileSync(path.join(fixture,'package.json'),JSON.stringify({packageManager:'pnpm@10.0.0',scripts:{test:'vitest run'}}));
 assert.equal(detectNodeTooling(fixture).packageManager,'pnpm');
 fs.writeFileSync(path.join(fixture,'package.json'),'{invalid');
 assert.throws(()=>detectNodeTooling(fixture));
}finally{
 const actual=fs.realpathSync(fixture),temp=fs.realpathSync(os.tmpdir());
 assert.equal(path.dirname(actual),temp,'Temporary cleanup must stay directly inside the system temp directory');
 assert.ok(path.basename(actual).startsWith('klcode-engineering-tooling-'));
 fs.rmSync(actual,{recursive:true});
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log('PASS: 22 canonical skills, local Markdown links/fences, cache-cost examples, read-only detector non-Node/Bun/conflict/declared/invalid-manifest cases.');
