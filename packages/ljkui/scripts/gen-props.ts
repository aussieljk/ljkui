/**
 * Generates prop tables from the ljkui component `*.props.ts` files.
 *
 * Those files export structured `propDef` objects (`{ type, values, default, required }`) with
 * JSDoc descriptions — the design-system props, not every inherited HTML attribute, which is
 * exactly what a prop table should show. Bun imports the TS directly, so we read the runtime
 * values with no TypeScript compiler API (the old generator died on the TS7 native compiler's
 * missing JS API — this one never touches it). Descriptions come from a light regex over the
 * source, following one level of `export { X } from './y'` re-export (button -> base-button).
 *
 * Writes src/generated/props.json, keyed by kebab component name. Re-run after prop changes:
 *
 *   bun run scripts/gen-props.ts
 */
import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, basename } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, '../src');
const outFile = join(here, '../src/generated/props.json');

/** Every `*.props.ts` under src, keyed by its base name (`heading.props.ts` -> `heading`). Keying
 * by file rather than directory keeps the shared `typography/` dir from collapsing heading/text/
 * code/… into one bucket, and matches the kebab component/demo names the pages use. */
function findPropsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...findPropsFiles(full));
    else if (entry.endsWith('.props.ts')) out.push(full);
  }
  return out;
}

type PropRow = { type: string; default?: string; description?: string; required?: boolean };
type PropDef = {
  type: string;
  values?: readonly unknown[];
  default?: unknown;
  required?: boolean;
  responsive?: boolean;
};

function isPropDef(v: unknown): v is PropDef {
  return typeof v === 'object' && v !== null && typeof (v as PropDef).type === 'string';
}

function typeString(def: PropDef): string {
  const base = def.type === 'enum' && def.values ? def.values.map((v) => `"${String(v)}"`).join(' | ') : def.type;
  return def.responsive ? `Responsive<${base}>` : base;
}

/** Map JSDoc-annotated prop keys to their description text, across a source file + one re-export hop. */
function descriptionsFor(propsFile: string): Record<string, string> {
  const out: Record<string, string> = {};
  const seen = new Set<string>();

  const scan = (file: string) => {
    if (seen.has(file) || !existsSync(file)) return;
    seen.add(file);
    const src = readFileSync(file, 'utf8');

    for (const m of src.matchAll(/\/\*\*([\s\S]*?)\*\/\s*(\w+)\s*:/g)) {
      const text = m[1]
        .replace(/^\s*\*\s?/gm, '')
        .replace(/@default.*$/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (text) out[m[2]] ??= text;
    }
    // Follow `export { ... } from './relative'` one level to reach re-exported propDefs.
    for (const m of src.matchAll(/from\s+'(\.[^']+)'/g)) {
      const rel = m[1].endsWith('.ts') ? m[1] : `${m[1]}.ts`;
      scan(join(dirname(file), rel));
    }
  };

  scan(propsFile);
  return out;
}

async function propsForFile(full: string): Promise<Record<string, PropRow> | null> {
  const mod = (await import(pathToFileURL(full).href)) as Record<string, unknown>;
  const descriptions = descriptionsFor(full);

  const rows: Record<string, PropRow> = {};
  for (const value of Object.values(mod)) {
    if (typeof value !== 'object' || value === null) continue;
    for (const [name, def] of Object.entries(value as Record<string, unknown>)) {
      if (!isPropDef(def) || rows[name]) continue;
      rows[name] = {
        type: typeString(def),
        ...(def.default !== undefined ? { default: String(def.default) } : {}),
        ...(def.required ? { required: true } : {}),
        ...(descriptions[name] ? { description: descriptions[name] } : {}),
      };
    }
  }
  return Object.keys(rows).length > 0 ? rows : null;
}

// The `<Theme>` props live in theme-options.tsx as `themePropDefs` (same shape, not a *.props.ts
// file), so pull them in explicitly under the `theme` key.
const propsFiles = [...findPropsFiles(srcDir), join(srcDir, 'theme-options.tsx')];

const all: Record<string, Record<string, PropRow>> = {};
for (const full of propsFiles.sort()) {
  const name = basename(full)
    .replace(/\.props\.ts$|\.tsx$/, '')
    .replace('theme-options', 'theme');
  try {
    const rows = await propsForFile(full);
    if (rows) all[name] = rows;
  } catch (err) {
    console.warn(`skip ${name}: ${(err as Error).message}`);
  }
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(all, null, 2) + '\n');
console.log(`Props: ${Object.keys(all).length} components → src/generated/props.json`);
