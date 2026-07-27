/**
 * Generates `src/icons/adapters/*.ts` and the `CANONICAL_ICON_NAMES` union in
 * `src/icons/types.ts` from the single source-of-truth mapping in
 * `scripts/icon-map.ts`.
 *
 * Before emitting anything, every referenced export name is validated against
 * the installed library (by importing its ESM entry), so a library upgrade
 * that renames icons fails loudly here instead of silently breaking adapters.
 *
 * Run with: `bun run generate:icon-adapters` (packages/ljkui)
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import { ICON_LIBRARIES, LIBRARY_MODULES, type IconLibrary } from './icon-map';
import { CANONICAL_NAMES, mappedEntries, unmappedNames, validateIconMap } from './validate-icon-map';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ADAPTERS_DIR = path.join(PACKAGE_ROOT, 'src', 'icons', 'adapters');
const TYPES_FILE = path.join(PACKAGE_ROOT, 'src', 'icons', 'types.ts');

/** Matches prettier.config.ts at the repo root (kept inline for determinism). */
const PRETTIER_OPTIONS: prettier.Options = {
  arrowParens: 'always',
  bracketSameLine: false,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  parser: 'typescript',
};

interface LibraryConfig {
  /** Human-readable name used in the header comment. */
  displayName: string;
  /** Exported adapter binding, e.g. `lucideAdapter`. */
  adapterExport: string;
}

const LIBRARY_CONFIG: Record<IconLibrary, LibraryConfig> = {
  lucide: { displayName: 'lucide-react', adapterExport: 'lucideAdapter' },
  phosphor: { displayName: '@phosphor-icons/react', adapterExport: 'phosphorAdapter' },
  heroicons: { displayName: '@heroicons/react (24px outline set)', adapterExport: 'heroiconsAdapter' },
  tabler: { displayName: '@tabler/icons-react', adapterExport: 'tablerAdapter' },
  hugeicons: {
    displayName: 'Hugeicons (@hugeicons/react + @hugeicons/core-free-icons)',
    adapterExport: 'hugeiconsAdapter',
  },
};

/* -------------------------------------------------------------------------------------------------
 * Emission
 * -----------------------------------------------------------------------------------------------*/

function headerComment(lib: IconLibrary): string {
  const { displayName, adapterExport } = LIBRARY_CONFIG[lib];
  const lines = [
    `${displayName} adapter. Importing this module registers it:`,
    ``,
    `  import 'ljkui/icons/${lib}';`,
    ``,
    `Or scope it with \`<IconProvider library={${adapterExport}}>\`.`,
  ];
  const unmapped = unmappedNames(lib);
  if (unmapped.length > 0) {
    lines.push(``, `The following canonical names have no ${LIBRARY_MODULES[lib]} equivalent and are unmapped:`);
    // Wrap the name list into comment lines that stay within the 120-char print width.
    let current = ' ';
    for (const name of unmapped) {
      const piece = ` \`${name}\`,`;
      if (current.length + piece.length > 100) {
        lines.push(current);
        current = ' ';
      }
      current += piece;
    }
    lines.push(current.replace(/,$/, '.'));
  }
  lines.push(
    ``,
    `GENERATED FILE — do not edit by hand. Edit \`scripts/icon-map.ts\` and run`,
    `\`bun run generate:icon-adapters\`.`,
  );
  return `/**\n${lines.map((line) => (line === '' ? ' *' : ` * ${line}`)).join('\n')}\n */`;
}

function importBlock(names: string[], specifier: string): string {
  const unique = [...new Set(names)].sort();
  return `import {\n${unique.map((name) => `  ${name},`).join('\n')}\n} from '${specifier}';`;
}

function emitPlainAdapter(lib: IconLibrary): string {
  const { adapterExport } = LIBRARY_CONFIG[lib];
  const specifier = LIBRARY_MODULES[lib];
  const entries = mappedEntries(lib);
  const iconLines = entries
    .map(([canonical, exportName]) =>
      canonical === exportName ? `    ${canonical},` : `    ${canonical}: ${exportName},`,
    )
    .join('\n');

  return `${headerComment(lib)}
${importBlock(
  entries.map(([, exportName]) => exportName),
  specifier,
)}
import { registerIconAdapter } from '../registry';
import type { IconAdapter } from '../types';

export const ${adapterExport}: IconAdapter = {
  name: '${lib}',
  icons: {
${iconLines}
  },
};

registerIconAdapter(${adapterExport});
`;
}

function emitHugeiconsAdapter(): string {
  const lib: IconLibrary = 'hugeicons';
  const { adapterExport } = LIBRARY_CONFIG[lib];
  const specifier = LIBRARY_MODULES[lib];
  const entries = mappedEntries(lib);
  const iconLines = entries.map(([canonical, exportName]) => `    ${canonical}: wrap(${exportName}),`).join('\n');

  return `${headerComment(lib)}
${importBlock(
  entries.map(([, exportName]) => exportName),
  specifier,
)}
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import * as React from 'react';
import { registerIconAdapter } from '../registry';
import type { AdapterIconComponent, IconAdapter } from '../types';

function toNumber(value: number | string | undefined): number | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? value : parseFloat(value);
}

let warnedBrokenCjs = false;

/** Binds a Hugeicons svg object to the \`HugeiconsIcon\` renderer. */
function wrap(icon: IconSvgElement): AdapterIconComponent {
  // @hugeicons/core-free-icons declares \`"type": "module"\` but ships a CommonJS
  // \`require\` entry, which Node parses as ESM and resolves to an empty module.
  // Guard so plain-CJS consumers degrade to rendering nothing instead of crashing;
  // bundlers and ESM consumers resolve the working ESM build and are unaffected.
  if (icon == null) {
    if (!warnedBrokenCjs) {
      warnedBrokenCjs = true;
      console.warn(
        '[ljkui] @hugeicons/core-free-icons resolved to an empty module ' +
          '(its CommonJS entry is broken upstream). Load the hugeicons adapter from ESM instead.',
      );
    }
    const Empty: AdapterIconComponent = () => null;
    return Empty;
  }
  const Component: AdapterIconComponent = ({ width, height, strokeWidth, ...props }) =>
    React.createElement(HugeiconsIcon, {
      icon,
      size: toNumber(width ?? height),
      strokeWidth: toNumber(strokeWidth),
      ...props,
    });
  return Component;
}

export const ${adapterExport}: IconAdapter = {
  name: '${lib}',
  icons: {
${iconLines}
  },
};

registerIconAdapter(${adapterExport});
`;
}

function emitAdapter(lib: IconLibrary): string {
  return lib === 'hugeicons' ? emitHugeiconsAdapter() : emitPlainAdapter(lib);
}

function updatedTypesSource(current: string): string {
  const namesBlock = CANONICAL_NAMES.map((name) => `  '${name}',`).join('\n');
  const pattern = /export const CANONICAL_ICON_NAMES = \[[\s\S]*?\] as const;/;
  if (!pattern.test(current)) {
    throw new Error(`Could not find the CANONICAL_ICON_NAMES block in ${TYPES_FILE}`);
  }
  return current.replace(pattern, `export const CANONICAL_ICON_NAMES = [\n${namesBlock}\n] as const;`);
}

/* -------------------------------------------------------------------------------------------------
 * Main
 * -----------------------------------------------------------------------------------------------*/

async function main() {
  const problems = await validateIconMap();
  if (problems.length > 0) {
    console.error(`icon-map validation failed (${problems.length} problem${problems.length === 1 ? '' : 's'}):`);
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }

  for (const lib of ICON_LIBRARIES) {
    const filePath = path.join(ADAPTERS_DIR, `${lib}.ts`);
    const source = await prettier.format(emitAdapter(lib), PRETTIER_OPTIONS);
    fs.writeFileSync(filePath, source);
    console.log(`wrote ${path.relative(PACKAGE_ROOT, filePath)} (${mappedEntries(lib).length} icons)`);
  }

  const typesSource = updatedTypesSource(fs.readFileSync(TYPES_FILE, 'utf8'));
  fs.writeFileSync(TYPES_FILE, await prettier.format(typesSource, PRETTIER_OPTIONS));
  console.log(`wrote ${path.relative(PACKAGE_ROOT, TYPES_FILE)} (${CANONICAL_NAMES.length} canonical names)`);
}

if ((import.meta as { main?: boolean }).main) {
  await main();
}
