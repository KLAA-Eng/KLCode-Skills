const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {test}=require('node:test');
const {validatePlan,runFlow}=require('../../../skills/video/ui-demo-recording/scripts/record-demo.cjs');
test('flow rejects unsupported actions, external navigation and invalid geometry',()=>{
 const base={baseUrl:'http://localhost:3000',steps:[]};
 for(const bad of [{...base,steps:[{action:'shell',command:'anything'}]},{...base,steps:[{action:'goto',url:'https://elsewhere.example'}]},{...base,viewport:{width:0,height:720}},{...base,steps:[{action:'click'}]},{...base,output:'demo.mp4'}])assert.throws(()=>validatePlan(bad));
 const plan=validatePlan({...base,steps:[{action:'goto',url:'/settings'}]},os.tmpdir());assert.equal(plan.viewport.width,1280);assert.equal(path.dirname(plan.output),os.tmpdir());
});
test('record refuses output collision before browser launch',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'klcode-recorder-'));try{const output=path.join(dir,'old.webm');fs.writeFileSync(output,'existing');await assert.rejects(runFlow(validatePlan({baseUrl:'http://localhost:3000',output,steps:[]}), 'record',{chromium:{launch(){throw Error('must not launch')}}}),/already exists/);assert.equal(fs.readFileSync(output,'utf8'),'existing')}finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('required missing control fails and owned browser/context close',async()=>{
 const events=[];const page={goto:async()=>{},evaluate:async()=>[],locator:()=>({count:async()=>1,isVisible:async()=>false})};const context={newPage:async()=>page,close:async()=>events.push('context-close')};const chromium={launch:async()=>({newContext:async()=>context,close:async()=>events.push('browser-close')})};
 await assert.rejects(runFlow(validatePlan({baseUrl:'http://localhost:3000',steps:[{action:'click',selector:'#missing',label:'Missing button'}]}),'rehearse',{chromium,log:()=>{}}),/unavailable/);assert.deepEqual(events,['context-close','browser-close']);
});
test('successful recording flushes context before stable save and reports only its actual output',async()=>{
 const events=[];const dir=fs.mkdtempSync(path.join(os.tmpdir(),'klcode-recorder-'));try{const plan=validatePlan({baseUrl:'http://localhost:3000',output:path.join(dir,'result.webm'),steps:[]});const page={goto:async()=>{},evaluate:async()=>{},video:()=>({saveAs:async file=>{assert.ok(events.includes('context-close'));fs.writeFileSync(file,'test video bytes');events.push('save')}})};const context={newPage:async()=>page,close:async()=>events.push('context-close')};const chromium={launch:async()=>({newContext:async()=>context,close:async()=>events.push('browser-close')})};const r=await runFlow(plan,'record',{chromium,log:()=>{}});assert.equal(r.output,plan.output);assert.deepEqual(events,['context-close','save','browser-close']);assert.ok(fs.statSync(plan.output).size)}finally{fs.rmSync(dir,{recursive:true,force:true})}
});
