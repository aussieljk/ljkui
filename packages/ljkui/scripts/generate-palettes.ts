/**
 * Generates the checked-in color scales from the Tailwind CSS v4 palettes.
 *
 * Reads every palette verbatim from the installed `tailwindcss` package
 * (theme.css) — the repo holds no palette data of its own — and writes:
 *
 * - src/styles/tokens/palettes.css: the 12-step light/dark scales (solid,
 *   alpha, surface, contrast), the accent/gray/semantic mapping blocks and
 *   the black/white alpha ladders.
 * - src/styles/theme.css: the named-palette utility section (everything after
 *   the GENERATED-PALETTES marker), for Tailwind v4 `@theme` consumers.
 *
 * Run with: bun run generate:palettes
 */
import * as fs from 'fs';
import * as path from 'path';
import {
  accentMappingCss,
  computeScale,
  grayMappingCss,
  scaleCss,
  scaleStops,
  semanticMappingCss,
  tailwindPaletteStops,
  type TailwindPalette,
} from '../src/helpers/tailwind-palette';

const CHROMATIC = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;
const GRAYS = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const;
const ALL = [...CHROMATIC, ...GRAYS];

const SEMANTIC: Record<'danger' | 'warning' | 'success' | 'info', readonly string[]> = {
  danger: ['red', 'rose'], // first entry is the default
  warning: ['amber', 'yellow', 'orange'],
  success: ['green', 'emerald', 'teal'],
  info: ['sky', 'blue', 'cyan'],
};

/* Locate the installed tailwindcss theme.css (hoisted by bun workspaces). */
function findTailwindTheme(): string {
  let dir = __dirname;
  while (true) {
    const candidate = path.join(dir, 'node_modules', 'tailwindcss', 'theme.css');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error('Could not find node_modules/tailwindcss/theme.css — run bun install first.');
    dir = parent;
  }
}

function parsePalettes(themeCss: string): Record<string, TailwindPalette> {
  const palettes: Record<string, Partial<Record<(typeof tailwindPaletteStops)[number], string>>> = {};
  for (const match of themeCss.matchAll(/--color-([a-z]+)-(\d+):\s*([^;]+);/g)) {
    const [, name, stop, value] = match;
    (palettes[name] ??= {})[Number(stop) as (typeof tailwindPaletteStops)[number]] = value.trim();
  }
  const complete: Record<string, TailwindPalette> = {};
  for (const name of ALL) {
    const palette = palettes[name];
    for (const stop of tailwindPaletteStops) {
      if (!palette?.[stop]) throw new Error(`tailwindcss theme.css is missing --color-${name}-${stop}`);
    }
    complete[name] = palette as TailwindPalette;
  }
  return complete;
}

const alphaLadder = (color: string) =>
  [0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95].map(
    (a, i) => `  --${color}-alpha-${scaleStops[i]}: rgba(${color === 'black' ? '0, 0, 0' : '255, 255, 255'}, ${a});`,
  );

function generatePalettesCss(palettes: Record<string, TailwindPalette>): string {
  const scales = Object.fromEntries(ALL.map((name) => [name, computeScale(palettes[name])]));

  const parts: string[] = [
    `/*
 * GENERATED FILE — do not edit by hand. Run \`bun run generate:palettes\`.
 *
 * The 12-step light/dark scales for every Tailwind CSS v4 palette, generated
 * verbatim from the installed \`tailwindcss\` package, plus the mapping blocks
 * that point --accent-*, --gray-* and the semantic scales at them.
 * See src/helpers/tailwind-palette.ts for the step mapping.
 */`,
    `/* Black and white alpha ladders */\n:root {\n${[...alphaLadder('black'), ...alphaLadder('white')].join('\n')}\n}`,
  ];

  for (const name of ALL) {
    const gray = (GRAYS as readonly string[]).includes(name);
    parts.push(`/* ${name} */\n${scaleCss(name, scales[name], { gray })}`);
  }

  parts.push(
    `/* Accent mappings. 'gray' follows the active gray scale (--gray-*). */`,
    accentMappingCss('gray'),
    ...ALL.filter((name) => name !== 'gray').map((name) => accentMappingCss(name)),
    `/* Gray mappings ('gray' itself is the default --gray-* scale). */`,
    ...GRAYS.filter((name) => name !== 'gray').map((name) => grayMappingCss(name)),
    `/* Semantic mappings */`,
    ...Object.entries(SEMANTIC).flatMap(([kind, names]) =>
      names.map((name, i) => semanticMappingCss(kind as keyof typeof SEMANTIC, name, i === 0)),
    ),
  );

  return parts.join('\n\n') + '\n';
}

const THEME_MARKER = '  /* GENERATED-PALETTES — everything below is written by generate-palettes.ts */';

function generateThemeSection(): string {
  const lines: string[] = [];
  for (const name of ALL) {
    lines.push(`  /* ${name} */`, `  --color-${name}: var(--${name}-700);`);
    for (const stop of scaleStops) {
      lines.push(`  --color-${name}-${stop}: var(--${name}-${stop});`);
      if (stop === 700) lines.push(`  --color-${name}-700-contrast: var(--${name}-700-contrast);`);
    }
    for (const stop of scaleStops) lines.push(`  --color-${name}-alpha-${stop}: var(--${name}-alpha-${stop});`);
    lines.push(`  --color-${name}-surface: var(--${name}-surface);`, '');
  }
  return lines.join('\n');
}

const palettes = parsePalettes(fs.readFileSync(findTailwindTheme(), 'utf8'));

const tokensDir = path.join(__dirname, '..', 'src', 'styles', 'tokens');
fs.writeFileSync(path.join(tokensDir, 'palettes.css'), generatePalettesCss(palettes));

const themePath = path.join(__dirname, '..', 'src', 'styles', 'theme.css');
const theme = fs.readFileSync(themePath, 'utf8');
const markerIndex = theme.indexOf(THEME_MARKER);
if (markerIndex === -1) throw new Error(`Marker comment not found in theme.css: "${THEME_MARKER.trim()}"`);
fs.writeFileSync(themePath, theme.slice(0, markerIndex) + `${THEME_MARKER}\n\n` + generateThemeSection() + '}\n');

console.log(`Generated scales for ${ALL.length} palettes (from ${findTailwindTheme()}).`);
