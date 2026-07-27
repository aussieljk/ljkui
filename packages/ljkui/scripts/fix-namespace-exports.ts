// Rolldown lowers `export * as Tabs from './tabs'` into a materialized getter
// object (`var tabs_exports = __exportAll({...})`). React Server Components
// cannot resolve members of such an object across a client-reference boundary
// (<Tabs.Root> renders undefined in Next.js), so this script rewrites the ESM
// output back to real `export * as` syntax after every tsdown build.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist', import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.js') ? [p] : [];
  });
}

// Drop `ident` (bare or aliased) from every `export { ... };` list in src.
function dropFromExportLists(src, ident) {
  return src.replace(/export \{ ([^}]*) \};/g, (stmt, list) => {
    const kept = list.split(', ').filter((item) => item !== ident && !item.startsWith(`${ident} as `));
    return kept.length ? `export { ${kept.join(', ')} };` : '';
  });
}

let definers = 0;
let facades = 0;

for (const file of walk(DIST)) {
  let src = readFileSync(file, 'utf8');
  if (!src.includes('_exports')) continue;
  const original = src;

  // Defining modules: drop the materialized namespace object and its export.
  for (const [stmt, ident] of src.matchAll(/var (\w+_exports) = \/\* @__PURE__ \*\/ __exportAll\(\{[^}]*\}\);\n/g)) {
    src = src.replace(stmt, '');
    src = dropFromExportLists(src, ident);
    definers++;
  }

  // Facades/barrels: `import { x_exports } from "P"` + `x_exports as Name` in an
  // export list become `export * as Name from "P"`.
  for (const [stmt, ident, path] of src.matchAll(/import \{ (\w+_exports) \} from "([^"]+)";\n/g)) {
    const alias = src.match(new RegExp(`(?:^|\\{ |, )${ident} as ([$\\w]+)`));
    const name = alias ? alias[1] : ident;
    src = src.replace(stmt, `export * as ${name} from "${path}";\n`);
    src = dropFromExportLists(src, ident);
    facades++;
  }

  // Drop the helper import when nothing uses it anymore.
  if (!src.includes('__exportAll(')) {
    src = src.replace(/import \{ __exportAll \} from "[^"]*_rolldown\/runtime.js";\n/, '');
  }

  if (src !== original) writeFileSync(file, src);
  if (/\w+_exports/.test(src)) {
    console.error(`fix-namespace-exports: unresolved _exports reference left in ${file}`);
    process.exitCode = 1;
  }
}

console.log(`fix-namespace-exports: rewrote ${definers} namespace definitions, ${facades} facade re-exports`);
