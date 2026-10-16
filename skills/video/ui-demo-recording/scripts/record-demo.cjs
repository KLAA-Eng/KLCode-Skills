#!/usr/bin/env node
'use strict';
// Adapted from ECC ui-demo inline recorder; MIT. Dependencies load only for a selected live run.
const fs=require('node:fs'),path=require('node:path');
const helpers=require('./demo-helpers.cjs');
const ACTIONS=new Set(['goto','click','type','select','assertVisible','pan']);
function validatePlan(value,baseDirectory=process.cwd()){
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Flow must be an object');
  const base=new URL(value.baseUrl);if(!['http:','https:'].includes(base.protocol))throw new Error('baseUrl must be http or https');
  const steps=value.steps||[];if(!Array.isArray(steps))throw new Error('steps must be an array');
  for(const step of steps){if(!step||!ACTIONS.has(step.action))throw new Error('Unsupported flow action');if(step.action!=='goto'&&(typeof step.selector!=='string'||!step.selector.trim()))throw new Error('Action needs a selector');if(step.action==='goto'&&new URL(step.url,base).origin!==base.origin)throw new Error('Navigation must stay on the selected base origin');if(step.action==='type'&&typeof step.text!=='string')throw new Error('type needs text');if(step.action==='select'&&typeof step.value!=='string')throw new Error('select needs value');if(step.pauseMs!==undefined&&(!Number.isFinite(step.pauseMs)||step.pauseMs<0||step.pauseMs>30000))throw new Error('pauseMs must be between 0 and 30000');}
  const viewport=value.viewport||{width:1280,height:720};if(!['width','height'].every(k=>Number.isInteger(viewport[k])&&viewport[k]>0&&viewport[k]<=8192))throw new Error('viewport needs positive bounded integer dimensions');
  const output=path.resolve(baseDirectory,value.output||'demo.webm');if(path.extname(output).toLowerCase()!=='.webm')throw new Error('output must be a WebM file');
  const routes=value.routes||['/'];if(!Array.isArray(routes)||!routes.every(r=>typeof r==='string'&&new URL(r,base).origin===base.origin))throw new Error('Discovery routes must stay on the selected origin');
  return {...value,baseUrl:base.href,steps,viewport,output,routes};
}
async function runFlow(plan,mode,{chromium,log=console.log}={}){
  if(!['discover','rehearse','record'].includes(mode))throw new Error('Select discover, rehearse or record');
  if(mode==='record'&&fs.existsSync(plan.output))throw new Error('Output already exists; select a new version');
  const browser=await chromium.launch({headless:true});let context,video;
  try{
    const options={viewport:plan.viewport};if(mode==='record'){fs.mkdirSync(path.dirname(plan.output),{recursive:true});options.recordVideo={dir:path.join(path.dirname(plan.output),'.demo-recordings'),size:plan.viewport};}
    context=await browser.newContext(options);const page=await context.newPage();
    if(page.route)await page.route('**/*',async route=>{const request=route.request();if(request.isNavigationRequest()&&request.frame()===page.mainFrame()&&new URL(request.url()).origin!==new URL(plan.baseUrl).origin)return route.abort();return route.continue();});
    const decorate=async()=>{await helpers.injectCursor(page);await helpers.injectSubtitleBar(page)};
    await page.goto(plan.baseUrl);await decorate();
    if(mode==='discover'){
      const result=[];for(const route of plan.routes){await page.goto(new URL(route,plan.baseUrl).href);const fields=await page.evaluate(()=>Array.from(document.querySelectorAll('input,select,textarea,button,[contenteditable],a')).filter(el=>el.offsetParent!==null).map(el=>({tag:el.tagName,type:el.type||'',name:el.name||'',placeholder:el.placeholder||'',text:el.textContent?.trim().slice(0,80)||'',role:el.getAttribute('role')||''})));result.push({route,fields});}log(JSON.stringify(result,null,2));return result;
    }
    for(const step of plan.steps){
      const label=step.label||step.action;if(step.subtitle)await helpers.showSubtitle(page,step.subtitle);
      let locator;if(step.selector&&step.action!=='pan'){locator=page.locator(step.selector);if(await locator.count()!==1)throw new Error('Required selector must resolve to one element: '+label);if(!await helpers.ensureVisible(page,locator,label))throw new Error('Required control unavailable: '+label);}
      switch(step.action){
      case 'goto':await page.goto(new URL(step.url,plan.baseUrl).href);break;
      case 'click':if(!await helpers.moveAndClick(page,locator,label))throw new Error('Required click failed: '+label);break;
      case 'type':if(!await helpers.typeSlowly(page,locator,step.text,label))throw new Error('Required typing failed: '+label);break;
      case 'select':await locator.selectOption(step.value);break;
      case 'assertVisible':break;
      case 'pan':await helpers.panElements(page,step.selector,step.count||6);break;
      }
      await decorate();if(step.pauseMs)await page.waitForTimeout(step.pauseMs);
    }
    await helpers.showSubtitle(page,'');video=mode==='record'?page.video():null;await context.close();context=null;
    if(video){await video.saveAs(plan.output);log('Video saved: '+plan.output);}else log('Rehearsal completed; no video recorded.');
    return {mode,output:video?plan.output:null};
  }finally{if(context)await context.close();await browser.close();}
}
async function main(args){
  if(!args.length||args.includes('--help')){console.log('Usage: node record-demo.cjs <flow.json> --discover|--rehearse|--record');return 0;}
  const selected=['discover','rehearse','record'].filter(x=>args.includes('--'+x));if(selected.length!==1)throw new Error('Select exactly one mode');
  const file=path.resolve(args[0]);const plan=validatePlan(JSON.parse(fs.readFileSync(file,'utf8')),path.dirname(file));
  const packagePath=process.env.KLCODE_PLAYWRIGHT_ROOT||'playwright';const {chromium}=require(packagePath);
  await runFlow(plan,selected[0],{chromium});return 0;
}
if(require.main===module)main(process.argv.slice(2)).then(code=>{process.exitCode=code}).catch(error=>{console.error('Demo failed: '+error.message);process.exitCode=1});
module.exports={validatePlan,runFlow};
