#!/usr/bin/env node
import { createHash } from 'node:crypto';
const args=process.argv.slice(2);
if(args.includes('--help')){console.log('Usage: node choose-direction.mjs <seed>');process.exit(0)}
if(args.length!==1){console.error('Provide one explicit seed.');process.exit(2)}
const digest=createHash('sha256').update(args[0]).digest();let i=0;
const pick=a=>a[digest[i++%digest.length]%a.length];
const hero=pick(['cinematic-center','artistic-asymmetry','editorial-split']);
const typography=pick(['Satoshi','Cabinet Grotesk','Outfit','Geist']);
const components=['inline-images','horizontal-accordion','partner-marquee','testimonial-carousel'];
const omitted=pick(components);const selected=components.filter(x=>x!==omitted);
const motions=['split-pin','image-scale-fade','text-scrub','card-stack'];const first=pick(motions);const second=pick(motions.filter(x=>x!==first));
console.log(JSON.stringify({seed:args[0],hero,typography,components:selected,motions:[first,second]},null,2));
