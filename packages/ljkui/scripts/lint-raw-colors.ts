/**
 * lint-raw-colors.ts — a standalone codemod/checker that finds raw hex colors
 * (and, optionally, arbitrary Tailwind spacing) in a consumer's source and
 * suggests the nearest ljkui design token.
 *
 * ljkui ships a 12-step, Radix-style scale per palette (steps are ROLES, not
 * Tailwind stops: 10/50/100 backgrounds, 200/300 subtle bg, 400/500/600
 * borders, 700/800 solid, 900/950 text — see CLAUDE.md "Sharp Edges"). The
 * concrete light-mode hex seeds live in
 * src/styles/tokens/palettes.css. This tool parses those seeds at runtime,
 * builds a hex→token lookup, and for every raw color it finds it reports the
 * nearest token by CIELAB (ΔE) distance.
 *
 * Usage:
 *   bun scripts/lint-raw-colors.ts [path]            # scan (default path: ".")
 *   bun scripts/lint-raw-colors.ts src --fix         # rewrite confident cases
 *   bun scripts/lint-raw-colors.ts src --report-only # never exit non-zero
 *   bun scripts/lint-raw-colors.ts src --spacing     # also flag arbitrary spacing
 *   bun scripts/lint-raw-colors.ts --help
 *
 * No new dependencies: hex→Lab conversion uses `color-convert` (already a
 * devDependency); everything else is inline and self-contained.
 */

import convert from 'color-convert';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, resolve } from 'node:path';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css']);
const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', '.next', 'build', '.vercel', '.source']);

// The palettes.css seeds we care about. accent/gray-alpha are themeable aliases
// (`--accent-700: var(--gray-700)`), so they carry no literal hex and are
// skipped by the parser. When a raw color's nearest match is a *chromatic*
// palette we surface the equivalent `accent` step as the primary suggestion —
// accent is the app's configurable brand color, which is almost always what a
// consumer reaching for a blue/indigo/etc. literal actually wants.
const CHROMATIC_TO_ACCENT = true;

// ---------------------------------------------------------------------------
// Palette parsing
// ---------------------------------------------------------------------------

type Lab = [number, number, number];

interface TokenSeed {
  /** Palette family, e.g. "blue", "gray". */
  palette: string;
  /** Role step, e.g. 700. */
  step: number;
  /** The literal light-mode hex, e.g. "#216fff". */
  hex: string;
  lab: Lab;
}

/** Resolve palettes.css relative to this script, wherever it's run from. */
function palettesCssPath(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, '..', 'src', 'styles', 'tokens', 'palettes.css');
}

/**
 * Parse the concrete `--<palette>-<step>: #hex;` declarations out of
 * palettes.css. We only take literal hex seeds (ignoring `var(...)` aliases and
 * `*-alpha-*` ladders, which aren't useful opaque targets), and we keep the
 * *first* occurrence of each palette+step — that's the light-theme block, which
 * is the canonical seed for a light UI.
 */
function loadTokenSeeds(cssPath: string): TokenSeed[] {
  const css = readFileSync(cssPath, 'utf8');
  const seeds: TokenSeed[] = [];
  const seen = new Set<string>();
  // --name-step: #rgb | #rrggbb  (skip alpha ladders and var() aliases)
  const re = /--([a-z]+)-(\d+)\s*:\s*(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)\s*;/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    const palette = m[1];
    // The `--<name>-alpha-<step>` form matches too (palette="<name>", but the
    // "alpha" word sits between). Guard: alpha decls look like `--red-alpha-10`,
    // whose captured palette would be "red" and step "10" only if the regex
    // skipped "alpha" — it can't, so alpha lines simply don't match. Nothing to do.
    const step = Number(m[2]);
    const hex = normalizeHex(m[3]);
    const key = `${palette}-${step}`;
    if (seen.has(key)) continue;
    seen.add(key);
    seeds.push({ palette, step, hex, lab: convert.hex.lab(hex.slice(1)) as Lab });
  }
  return seeds;
}

// ---------------------------------------------------------------------------
// Color utilities
// ---------------------------------------------------------------------------

/** Expand #rgb → #rrggbb and lowercase; drop any alpha channel. */
function normalizeHex(hex: string): string {
  let h = hex.replace('#', '').toLowerCase();
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  if (h.length === 8) h = h.slice(0, 6); // strip alpha for matching
  return `#${h}`;
}

/** Plain Euclidean distance in CIELAB — a good enough ΔE for "nearest". */
function labDistance(a: Lab, b: Lab): number {
  const dl = a[0] - b[0];
  const da = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dl * dl + da * da + db * db);
}

interface Match {
  seed: TokenSeed;
  distance: number;
  /** The token family we recommend using (accent for chromatic matches). */
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

// ---------------------------------------------------------------------------
// Utility-prefix inference (for a nicer suggestion + confident --fix)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Scanning
// ---------------------------------------------------------------------------

interface Finding {
  file: string;
  line: number;
  column: number;
  raw: string; // the matched hex as written
  match: Match;
  /** The full arbitrary-utility text if this was `prefix-[#hex]`, else undefined. */
  utility?: { prefix: string; full: string; start: number };
}

const HEX_RE = /#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{8}\b/g;
// A whole arbitrary utility token, e.g. `bg-[#3b82f6]`.
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
    // First, whole arbitrary utilities so we can offer a confident rewrite.
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

// ---------------------------------------------------------------------------
// Suggestion formatting
// ---------------------------------------------------------------------------

function tokenClass(prefix: string | undefined, palette: string, step: number): string {
  // If we know the utility prefix, produce a real class; otherwise default to bg-.
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

// ---------------------------------------------------------------------------
// --fix rewriting (conservative)
// ---------------------------------------------------------------------------

/**
 * Only arbitrary-utility className cases (`bg-[#hex]` → `bg-accent-700`) are
 * rewritten: they are unambiguous and lossless in intent. Bare hex in a style
 * object, a CSS value, or free text is reported but never touched.
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
    // Replace each unique utility token once.
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

// ---------------------------------------------------------------------------
// Optional: arbitrary Tailwind spacing
// ---------------------------------------------------------------------------

// e.g. p-[13px], mt-[7px], gap-[3px] — flags px values that aren't on the 4px grid.
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
      const nearestStep = Math.round(px / 4); // Tailwind scale: 1 = 4px
      out.push({
        file,
        line: i + 1,
        raw: m[0],
        suggestion: `${m[1]}-${nearestStep} (${nearestStep * 4}px)`,
      });
    }
  });
  return out;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function printHelp(): void {
  console.log(
    [
      'lint-raw-colors — suggest ljkui tokens for raw hex colors',
      '',
      'Usage:',
      '  bun scripts/lint-raw-colors.ts [path]        scan (default ".")',
      '',
      'Flags:',
      '  --fix           rewrite confident className cases in place',
      '  --report-only   never exit non-zero (report and pass)',
      '  --spacing       also flag arbitrary Tailwind spacing (p-[13px] …)',
      '  --help          show this help',
    ].join('\n'),
  );
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

  const seeds = loadTokenSeeds(palettesCssPath());
  if (seeds.length === 0) {
    console.error('No token seeds parsed from palettes.css — is this an ljkui checkout?');
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

  // Report (re-scan not needed; report original findings — after --fix the
  // rewritten ones simply become the "before" record of what changed).
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

function rel(p: string): string {
  const cwd = process.cwd();
  return p.startsWith(cwd) ? p.slice(cwd.length + 1) : p;
}

main();
