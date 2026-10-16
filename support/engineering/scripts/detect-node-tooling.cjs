#!/usr/bin/env node
'use strict';
// Read-only adaptation of ref.ECC/scripts/{setup-package-manager.js,lib/package-manager.js}.
// MIT, Copyright (c) 2026 Affaan Mustafa; full license in ../licenses/ecc-MIT.txt.
const fs = require('node:fs');
const path = require('node:path');
function detectNodeTooling(directory) {
  const root = path.resolve(directory);
  const manifest = path.join(root, 'package.json');
  if (!fs.existsSync(manifest)) return { root, nodeProject: false, packageManager: null, scripts: {} };
  const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  const locks = { npm: ['package-lock.json','npm-shrinkwrap.json'], pnpm: ['pnpm-lock.yaml'], yarn: ['yarn.lock'], bun: ['bun.lock','bun.lockb'] };
  const found = Object.entries(locks).filter(([,names])=>names.some(n=>fs.existsSync(path.join(root,n)))).map(([n])=>n);
  const declared = typeof pkg.packageManager === 'string' ? pkg.packageManager.split('@')[0] : null;
  const allowed = Object.keys(locks);
  const selected = allowed.includes(declared) ? declared : found.length === 1 ? found[0] : null;
  return { root, nodeProject: true, declared, lockManagers: found, packageManager: selected, ambiguous: found.length > 1 || (!!declared && !allowed.includes(declared)), scripts: pkg.scripts || {}, note: 'Read scripts and installed runner. bun test differs from bun run test. No installation or configuration writes performed.' };
}
module.exports = { detectNodeTooling };
if (require.main === module) {
  try { console.log(JSON.stringify(detectNodeTooling(process.argv[2] || process.cwd()),null,2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
