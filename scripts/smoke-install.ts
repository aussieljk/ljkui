#!/usr/bin/env bun
/**
 * Install smoke test: pack the real tarball and prove every entry point resolves in a
 * clean project. `publint` / `attw` (the `health` script) check the manifest; this checks
 * that `bun add ljkui && import { Button }` actually works — catching a broken `files`
 * array, a missing `dist/` file, or an `exports`/`sideEffects` mistake that manifest
 * linters miss. Not a unit test — nothing is asserted about behaviour, only resolution.
 *
 *   bun scripts/smoke-install.ts
 *
 * Assumes the library is already built (dist/ present); CI runs it right after Build.
 */
import { mkdtempSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PKG, fail, run, capture, step } from './lib.ts';

step('Install smoke');

// Pack the package exactly as it would publish (honours `files`, build outputs). `bun pm pack`
// rather than `npm pack` so this runs in the CI check job, which has bun but not node/npm.
run(['bun', 'pm', 'pack', '--destination', tmpdir()], { cwd: PKG });
const tarball = readdirSync(tmpdir())
  .filter((f) => f.startsWith('ljkui-') && f.endsWith('.tgz'))
  .map((f) => join(tmpdir(), f))
  .sort()
  .at(-1);
if (!tarball) fail('npm pack produced no ljkui-*.tgz');

// A throwaway consumer project, installed from the tarball only.
const app = mkdtempSync(join(tmpdir(), 'ljkui-smoke-'));
writeFileSync(join(app, 'package.json'), JSON.stringify({ name: 'smoke', private: true, type: 'module' }) + '\n');
// The tarball plus the peers a real consumer installs: react, and every optional icon package the
// adapters wrap (each adapter re-exports from its provider, so without the provider it can't resolve).
const peers = [
  'react',
  'react-dom',
  'tailwindcss',
  'lucide-react',
  '@heroicons/react',
  '@hugeicons/react',
  '@hugeicons/core-free-icons',
  '@phosphor-icons/react',
  '@tabler/icons-react',
];
run(['bun', 'add', tarball!, ...peers], { cwd: app });

// Every public entry point, exactly as a consumer would import it.
const entries = [
  'ljkui',
  'ljkui/tailwind',
  'ljkui/icons',
  'ljkui/icons/lucide',
  'ljkui/icons/heroicons',
  'ljkui/icons/hugeicons',
  'ljkui/icons/phosphor',
  'ljkui/icons/tabler',
];

/*
 * Import each entry in a child. A *resolution* failure (ERR_MODULE_NOT_FOUND / "Cannot find
 * module") means the package is broken and must fail. A *runtime* error is fine here — there is
 * no DOM in this process, so a component touching `document` at import time throws without
 * meaning the package is mis-published. We classify on the error, not merely on success.
 */
const probe = entries
  .map(
    (e) => `try { await import(${JSON.stringify(e)}); console.log('ok ${e}'); }
  catch (err) {
    const msg = String(err && err.message || err);
    if (err?.code === 'ERR_MODULE_NOT_FOUND' || /Cannot find module|Failed to resolve|Cannot find package/.test(msg)) {
      console.log('UNRESOLVED ${e}: ' + msg);
    } else { console.log('resolved (runtime-only error) ${e}'); }
  }`,
  )
  .join('\n');
writeFileSync(join(app, 'probe.mjs'), probe + '\n');

const out = capture(['bun', 'run', join(app, 'probe.mjs')], { cwd: app });
console.log(out);
if (/UNRESOLVED/.test(out)) fail('one or more entry points did not resolve from the packed tarball');

console.log(`\n✓ all ${entries.length} entry points resolve from a clean install`);
