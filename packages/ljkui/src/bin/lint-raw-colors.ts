#!/usr/bin/env node
/// <reference types="node" />
/**
 * ljkui-lint-raw-colors — a standalone checker/codemod that finds raw hex
 * colors (and, optionally, arbitrary Tailwind spacing) in a project's source
 * and suggests the nearest ljkui design token.
 *
 * This is the single source for both:
 *   - the published bin:   `bunx ljkui-lint-raw-colors [path]`
 *   - local development:   `bun src/bin/lint-raw-colors.ts [path]`
 *
 * ljkui ships a 12-step, Radix-style scale per palette (steps are ROLES, not
 * Tailwind stops — see CLAUDE.md "Sharp Edges"). The concrete light-mode hex
 * seeds live in src/styles/tokens/palettes.css; at build they're extracted into
 * `dist/token-seeds.json` (via scripts/gen-token-seeds.ts) so the published bin
 * can read them without shipping `src/`. This tool builds a hex→token lookup
 * and, for every raw color it finds, reports the nearest token by CIELAB (ΔE).
 *
 * Usage:
 *   ljkui-lint-raw-colors [path]            # scan (default path: ".")
 *   ljkui-lint-raw-colors src --fix         # rewrite confident className cases
 *   ljkui-lint-raw-colors src --report-only # never exit non-zero
 *   ljkui-lint-raw-colors src --spacing     # also flag arbitrary spacing
 *   ljkui-lint-raw-colors --help
 */

import convert from 'color-convert';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css']);
const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', '.next', 'build', '.vercel', '.source']);

// When a raw color's nearest match is a *chromatic* palette we surface the
// equivalent `accent` step as the primary suggestion — accent is the app's
// configurable brand color, which is almost always what a consumer reaching for
// a blue/indigo/etc. literal actually wants.
const CHROMATIC_TO_ACCENT = true;

type Lab = [number, number, number];

interface TokenSeed {
  palette: string;
  step: number;
  hex: string;
  lab: Lab;
}

/** Expand #rgb → #rrggbb and lowercase; drop any alpha channel. */
function normalizeHex(hex: string): string {
  let h = hex.replace('#', '').toLowerCase();
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  if (h.length === 8) h = h.slice(0, 6);
  return `#${h}`;
}

/**
 * Load the hex seeds. Prefer the shipped `dist/token-seeds.json` (published
 * bin); fall back to parsing palettes.css directly (running from source).
 */
function loadTokenSeeds(): TokenSeed[] {
  const here = dirname(fileURLToPath(import.meta.url));
  const toSeed = (palette: string, step: number, rawHex: string): TokenSeed => {
    const hex = normalizeHex(rawHex);
    return { palette, step, hex, lab: convert.hex.lab(hex.slice(1)) as Lab };
  };

  // 1. Shipped JSON (dist/bin/lint-raw-colors.js → dist/token-seeds.json).
  const jsonCandidates = [resolve(here, '..', 'token-seeds.json'), resolve(here, 'token-seeds.json')];
  for (const p of jsonCandidates) {
    if (existsSync(p)) {
      const raw = JSON.parse(readFileSync(p, 'utf8')) as Array<{ palette: string; step: number; hex: string }>;
      return raw.map((s) => toSeed(s.palette, s.step, s.hex));
    }
  }

  // 2. Source CSS (src/bin/lint-raw-colors.ts → src/styles/tokens/palettes.css).
  const cssCandidates = [
    resolve(here, '..', 'styles', 'tokens', 'palettes.css'),
    resolve(here, '..', '..', 'src', 'styles', 'tokens', 'palettes.css'),
  ];
  const cssPath = cssCandidates.find((p) => existsSync(p));
  if (!cssPath) return [];

  const css = readFileSync(cssPath, 'utf8');
  const seeds: TokenSeed[] = [];
  const seen = new Set<string>();
  const re = /--([a-z]+)-(\d+)\s*:\s*(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)\s*;/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    const key = `${m[1]}-${m[2]}`;
    if (seen.has(key)) continue;
    seen.add(key);
    seeds.push(toSeed(m[1], Number(m[2]), m[3]));
  }
  return seeds;
}

function labDistance(a: Lab, b: Lab): number {
  const dl = a[0] - b[0];
  const da = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dl * dl + da * da + db * db);
}

interface Match {
  seed: TokenSeed;
  distance: number;
  suggestedPalette: string;
}

function nearestToken(hex: string, seeds: TokenSeed[]): Match {
  const lab = convert.hex.lab(normalizeHex(hex).slice(1)) as Lab;
  let best = seeds[0];
  let bestDist = Infinity;
  for (const seed of seeds) {
    const d = labDistance(lab, seed.lab);
    if (d < bestDist) {
      bestDist = d;
      best = seed;
    }
  }
  const isGrayish = best.palette === 'gray';
  const suggestedPalette = CHROMATIC_TO_ACCENT && !isGrayish ? 'accent' : best.palette;
  return { seed: best, distance: bestDist, suggestedPalette };
}

interface Finding {
  file: string;
  line: number;
  column: number;
  raw: string;
  match: Match;
  utility?: { prefix: string; full: string; start: number };
}

const HEX_RE = /#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{8}\b/g;
const ARB_UTILITY_RE =
  /\b(bg|text|border|ring|fill|stroke|from|via|to|outline|divide|shadow|caret|accent|decoration)-\[(#[0-9a-fA-F]{3,8})\]/g;

function collectFiles(root: string): string[] {
  const out: string[] = [];
  const st = statSync(root);
  if (st.isFile()) return SCAN_EXTENSIONS.has(extname(root)) ? [root] : [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name)) walk(join(dir, entry.name));
      } else if (SCAN_EXTENSIONS.has(extname(entry.name))) {
        out.push(join(dir, entry.name));
      }
    }
  };
  walk(root);
  return out;
}

function scanFile(file: string, seeds: TokenSeed[]): Finding[] {
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  const findings: Finding[] = [];

  lines.forEach((text, i) => {
    const utilityRanges: Array<{ start: number; end: number; prefix: string; full: string; hex: string }> = [];
    let um: RegExpExecArray | null;
    ARB_UTILITY_RE.lastIndex = 0;
    while ((um = ARB_UTILITY_RE.exec(text)) !== null) {
      utilityRanges.push({ start: um.index, end: um.index + um[0].length, prefix: um[1], full: um[0], hex: um[2] });
    }

    let hm: RegExpExecArray | null;
    HEX_RE.lastIndex = 0;
    while ((hm = HEX_RE.exec(text)) !== null) {
      const raw = hm[0];
      const col = hm.index;
      const match = nearestToken(raw, seeds);
      const util = utilityRanges.find((u) => col >= u.start && col < u.end);
      findings.push({
        file,
        line: i + 1,
        column: col + 1,
        raw,
        match,
        utility: util ? { prefix: util.prefix, full: util.full, start: util.start } : undefined,
      });
    }
  });

  return findings;
}

function tokenClass(prefix: string | undefined, palette: string, step: number): string {
  return `${prefix ?? 'bg'}-${palette}-${step}`;
}

function cssVar(palette: string, step: number): string {
  return `var(--${palette}-${step})`;
}

function formatSuggestion(f: Finding): string {
  const { suggestedPalette, seed } = f.match;
  const cls = tokenClass(f.utility?.prefix, suggestedPalette, seed.step);
  const v = cssVar(suggestedPalette, seed.step);
  return `${cls} / ${v}`;
}

/**
 * Only arbitrary-utility className cases (`bg-[#hex]` → `bg-accent-700`) are
 * rewritten: they are unambiguous. Bare hex in a style object, a CSS value, or
 * free text is reported but never touched.
 */
function applyFixes(file: string, findings: Finding[]): number {
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  let rewrites = 0;

  const byLine = new Map<number, Finding[]>();
  for (const f of findings) {
    if (!f.utility) continue;
    const arr = byLine.get(f.line) ?? [];
    arr.push(f);
    byLine.set(f.line, arr);
  }

  for (const [lineNo, fs] of byLine) {
    let text = lines[lineNo - 1];
    const seenFull = new Set<string>();
    for (const f of fs) {
      if (!f.utility || seenFull.has(f.utility.full)) continue;
      seenFull.add(f.utility.full);
      const cls = tokenClass(f.utility.prefix, f.match.suggestedPalette, f.match.seed.step);
      if (text.includes(f.utility.full)) {
        text = text.split(f.utility.full).join(cls);
        rewrites++;
      }
    }
    lines[lineNo - 1] = text;
  }

  if (rewrites > 0) writeFileSync(file, lines.join('\n'));
  return rewrites;
}

const ARB_SPACING_RE = /\b([mp][trblxy]?|gap|space-[xy]|inset|top|right|bottom|left|w|h)-\[(\d+)px\]/g;

interface SpacingFinding {
  file: string;
  line: number;
  raw: string;
  suggestion: string;
}

function scanSpacing(file: string): SpacingFinding[] {
  const src = readFileSync(file, 'utf8');
  const out: SpacingFinding[] = [];
  src.split('\n').forEach((text, i) => {
    let m: RegExpExecArray | null;
    ARB_SPACING_RE.lastIndex = 0;
    while ((m = ARB_SPACING_RE.exec(text)) !== null) {
      const px = Number(m[2]);
      const nearestStep = Math.round(px / 4);
      out.push({ file, line: i + 1, raw: m[0], suggestion: `${m[1]}-${nearestStep} (${nearestStep * 4}px)` });
    }
  });
  return out;
}

function printHelp(): void {
  console.log(
    [
      'ljkui-lint-raw-colors — suggest ljkui tokens for raw hex colors',
      '',
      'Usage:',
      '  ljkui-lint-raw-colors [path]        scan (default ".")',
      '',
      'Flags:',
      '  --fix           rewrite confident className cases in place',
      '  --report-only   never exit non-zero (report and pass)',
      '  --spacing       also flag arbitrary Tailwind spacing (p-[13px] …)',
      '  --help          show this help',
    ].join('\n'),
  );
}

function rel(p: string): string {
  const cwd = process.cwd();
  return p.startsWith(cwd) ? p.slice(cwd.length + 1) : p;
}

function main(): void {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const fix = argv.includes('--fix');
  const reportOnly = argv.includes('--report-only');
  const doSpacing = argv.includes('--spacing');
  const target = argv.find((a) => !a.startsWith('-')) ?? '.';
  const root = resolve(process.cwd(), target);

  const seeds = loadTokenSeeds();
  if (seeds.length === 0) {
    console.error('ljkui: could not load color token seeds (token-seeds.json / palettes.css not found).');
    process.exit(2);
  }

  const files = collectFiles(root);
  const allFindings: Finding[] = [];
  const spacingFindings: SpacingFinding[] = [];

  for (const file of files) {
    const findings = scanFile(file, seeds);
    if (fix && findings.some((f) => f.utility)) {
      const n = applyFixes(file, findings);
      if (n > 0) console.log(`fixed ${n} className(s) in ${rel(file)}`);
    }
    allFindings.push(...findings);
    if (doSpacing) spacingFindings.push(...scanSpacing(file));
  }

  for (const f of allFindings) {
    const loc = `${rel(f.file)}:${f.line}:${f.column}`;
    const dist = f.match.distance.toFixed(1);
    const exact = f.match.distance < 0.5 ? ' (exact)' : '';
    console.log(`${loc}  ${f.raw} → ${formatSuggestion(f)}  [ΔE ${dist}${exact}]`);
  }

  if (doSpacing) {
    for (const s of spacingFindings) {
      console.log(`${rel(s.file)}:${s.line}  ${s.raw} → ${s.suggestion}`);
    }
  }

  const total = allFindings.length + spacingFindings.length;
  console.log('');
  console.log(
    `${allFindings.length} raw color(s)` +
      (doSpacing ? `, ${spacingFindings.length} arbitrary spacing value(s)` : '') +
      ` across ${files.length} file(s).`,
  );

  if (total > 0 && !reportOnly) process.exit(1);
}

main();
