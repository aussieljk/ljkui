/**
 * Maps Tailwind CSS v4 style palettes (11 stops, 50–950) onto the 12-step
 * scales that ljkui components consume.
 *
 * Steps are named after the Tailwind stops they come from, plus a `10` step for the
 * extra light shade — so the scale reads 10, 50, 100 … 900, 950 (see `scaleStops`).
 *
 * The mapping is static and verbatim:
 * - light: step 10 is an extra light shade (stop 50 mixed 60% toward white),
 *   steps 50–950 are the palette stops of the same name, unchanged.
 * - dark: the same stops read in reverse for backgrounds and text, with the
 *   solid steps anchored so buttons stay recognizable:
 *   [50↦black 40%, 950, 900, 900·800, 800, 800·700, 700, 700·600, 600, 500, 300, 100]
 *   (a·b means the OKLab midpoint of the two stops). Note this makes the dark
 *   step *names* deliberately not equal to the stops they read from.
 *
 * Alpha steps are the most transparent rgba() that composites back to the
 * solid step over white (light) / black (dark), like Radix alpha scales.
 *
 * `scripts/generate-palettes.ts` uses this module to generate the checked-in
 * scales for every Tailwind palette (src/styles/tokens/palettes.css), and
 * `<Theme accentColor="#8b5cf6">` uses it at runtime for custom colors.
 */

type TailwindPaletteStop = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** A Tailwind-style palette: 11 CSS colors (hex, rgb() or oklch()) keyed by stop. */
type TailwindPalette = Record<TailwindPaletteStop, string>;

const tailwindPaletteStops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/**
 * The names of the 12 scale steps: the Tailwind stops, prefixed with `10` for the
 * extra light shade. Every `--{scale}-{stop}` / `--{scale}-a{stop}` token is named
 * from this list, so `--accent-950` is the darkest step and `--accent-700` is solid.
 */
const scaleStops = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/** The solid step (`--{scale}-700`): buttons, solid backgrounds, the `--color-{scale}` default. */
const SOLID_STOP = 700;
/** The step the translucent surface is derived from (`--{scale}-50`). */
const SURFACE_STOP = 50;

/* * * * * * * * * * * * * * * * * * * */
/*             Color math              */
/* * * * * * * * * * * * * * * * * * * */

interface Oklab {
  L: number;
  a: number;
  b: number;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

const WHITE: Oklab = { L: 1, a: 0, b: 0 };
const BLACK: Oklab = { L: 0, a: 0, b: 0 };

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function rgbToOklab({ r, g, b }: Rgb): Oklab {
  const lr = srgbToLinear(r / 255);
  const lg = srgbToLinear(g / 255);
  const lb = srgbToLinear(b / 255);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

function oklabToLinearRgb({ L, a, b }: Oklab): { r: number; g: number; b: number } {
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);

  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

function isInGamut(color: Oklab): boolean {
  const { r, g, b } = oklabToLinearRgb(color);
  const eps = 0.000005;
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps;
}

/** Convert to sRGB, reducing chroma (hue-preserving) when the color is out of gamut. */
function oklabToRgb(color: Oklab): Rgb {
  let mapped = color;
  if (!isInGamut(color)) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 30; i++) {
      const t = (lo + hi) / 2;
      mapped = { L: color.L, a: color.a * t, b: color.b * t };
      if (isInGamut(mapped)) lo = t;
      else hi = t;
    }
    mapped = { L: color.L, a: color.a * lo, b: color.b * lo };
  }

  const lin = oklabToLinearRgb(mapped);
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  return {
    r: Math.round(clamp01(linearToSrgb(clamp01(lin.r))) * 255),
    g: Math.round(clamp01(linearToSrgb(clamp01(lin.g))) * 255),
    b: Math.round(clamp01(linearToSrgb(clamp01(lin.b))) * 255),
  };
}

function oklchToOklab(L: number, C: number, hDeg: number): Oklab {
  const h = (hDeg * Math.PI) / 180;
  return { L, a: C * Math.cos(h), b: C * Math.sin(h) };
}

function oklabChroma(c: Oklab): number {
  return Math.sqrt(c.a * c.a + c.b * c.b);
}

function oklabHueDeg(c: Oklab): number {
  return (Math.atan2(c.b, c.a) * 180) / Math.PI;
}

function mix(from: Oklab, to: Oklab, t: number): Oklab {
  return {
    L: from.L + (to.L - from.L) * t,
    a: from.a + (to.a - from.a) * t,
    b: from.b + (to.b - from.b) * t,
  };
}

function parseColor(input: string): Oklab {
  const str = input.trim().toLowerCase();

  const hexMatch = str.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) hex = hex.replace(/./g, (ch) => ch + ch);
    return rgbToOklab({
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    });
  }

  const oklchMatch = str.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)\s*(?:\/[^)]+)?\)$/);
  if (oklchMatch) {
    const L = parseFloat(oklchMatch[1]) / (oklchMatch[2] === '%' ? 100 : 1);
    const C = parseFloat(oklchMatch[3]);
    const h = oklchMatch[4] === 'none' ? 0 : parseFloat(oklchMatch[4]);
    return oklchToOklab(L, C, h);
  }

  const rgbMatch = str.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*(?:[/,][^)]+)?\)$/);
  if (rgbMatch) {
    return rgbToOklab({ r: Number(rgbMatch[1]), g: Number(rgbMatch[2]), b: Number(rgbMatch[3]) });
  }

  throw new Error(`Unsupported color "${input}". Use #hex, rgb() or oklch().`);
}

function toHexByte(v: number): string {
  return Math.min(255, Math.max(0, Math.round(v)))
    .toString(16)
    .padStart(2, '0');
}

function rgbToHex({ r, g, b }: Rgb): string {
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}

function wcagLuminance({ r, g, b }: Rgb): number {
  return 0.2126 * srgbToLinear(r / 255) + 0.7152 * srgbToLinear(g / 255) + 0.0722 * srgbToLinear(b / 255);
}

function contrastWithWhite(c: Rgb): number {
  return 1.05 / (wcagLuminance(c) + 0.05);
}

/** Parse a CSS color (`#hex`, `rgb()`, `oklch()`) and return its sRGB hex, gamut-mapped. */
function cssColorToHex(color: string): string {
  return rgbToHex(oklabToRgb(parseColor(color)));
}

/* * * * * * * * * * * * * * * * * * * */
/*        Stops → 12-step scales       */
/* * * * * * * * * * * * * * * * * * * */

interface ModeScale {
  /** 12 solid steps as CSS colors (verbatim palette stops where possible). */
  steps: string[];
  /** The solid steps in sRGB (for the alpha/surface derivations). */
  stepsRgb: Rgb[];
  /** 12 alpha steps as #rrggbbaa. */
  alphas: string[];
  /** Text color for the solid step (700). */
  contrast: string;
  /** Translucent surface (#rrggbbaa) that composites back to step 50 over the page. */
  surface: string;
  /** Dark-mode translucent panel color (#rrggbbaa), only meaningful for grays. */
  translucent: string;
}

interface ScaleColors {
  light: ModeScale;
  dark: ModeScale;
}

/** The most transparent rgba() that composites back to `target` over white. */
function alphaOverWhite(target: Rgb): string {
  const alphaByte = Math.max(1, Math.ceil(255 - Math.min(target.r, target.g, target.b)));
  const a = alphaByte / 255;
  const solve = (t: number) => (t - (1 - a) * 255) / a;
  return rgbToHex({ r: solve(target.r), g: solve(target.g), b: solve(target.b) }) + toHexByte(alphaByte);
}

/** The most transparent rgba() that composites back to `target` over black. */
function alphaOverBlack(target: Rgb): string {
  const alphaByte = Math.max(1, Math.max(target.r, target.g, target.b));
  const solve = (t: number) => (t * 255) / alphaByte;
  return rgbToHex({ r: solve(target.r), g: solve(target.g), b: solve(target.b) }) + toHexByte(alphaByte);
}

/**
 * Expand an 11-stop palette into the light and dark 12-step scales, with
 * alpha steps, step-9 contrast color and translucent surfaces.
 */
function computeScale(palette: TailwindPalette): ScaleColors {
  const raw = {} as Record<TailwindPaletteStop, string>;
  const ok = {} as Record<TailwindPaletteStop, Oklab>;
  for (const stop of tailwindPaletteStops) {
    const value = palette[stop];
    if (typeof value !== 'string') throw new Error(`Palette is missing stop ${stop}.`);
    raw[stop] = value.trim();
    ok[stop] = parseColor(value);
  }

  type Step = TailwindPaletteStop | Oklab;
  const lightSteps: Step[] = [mix(ok[50], WHITE, 0.6), 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const darkSteps: Step[] = [
    mix(ok[950], BLACK, 0.4),
    950,
    900,
    mix(ok[900], ok[800], 0.5),
    800,
    mix(ok[800], ok[700], 0.5),
    700,
    mix(ok[700], ok[600], 0.5),
    600,
    500,
    300,
    100,
  ];

  // Solid-step text: white, or a near-black palette tint for palettes whose solid
  // steps (light 700 / dark 600) are too light for white text.
  const darkText = rgbToHex(oklabToRgb(mix(ok[900], ok[950], 0.6)));
  const contrastFor = (solid: Rgb) => (contrastWithWhite(solid) >= 2.16 ? 'white' : darkText);

  const build = (steps: Step[], mode: 'light' | 'dark'): ModeScale => {
    const stepsRgb = steps.map((s) => oklabToRgb(typeof s === 'number' ? ok[s] : s));
    const alpha = mode === 'light' ? alphaOverWhite : alphaOverBlack;
    const step50 = stepsRgb[scaleStops.indexOf(SURFACE_STOP)];
    const surface =
      mode === 'light'
        ? rgbToHex({ r: (step50.r - 51) / 0.8, g: (step50.g - 51) / 0.8, b: (step50.b - 51) / 0.8 }) + 'cc'
        : rgbToHex({ r: step50.r * 2, g: step50.g * 2, b: step50.b * 2 }) + '80';
    return {
      steps: steps.map((s, i) => (typeof s === 'number' ? raw[s] : rgbToHex(stepsRgb[i]))),
      stepsRgb,
      alphas: stepsRgb.map(alpha),
      contrast: contrastFor(stepsRgb[scaleStops.indexOf(SOLID_STOP)]),
      surface,
      translucent: rgbToHex(step50) + 'd9',
    };
  };

  return { light: build(lightSteps, 'light'), dark: build(darkSteps, 'dark') };
}

/* * * * * * * * * * * * * * * * * * * */
/*            CSS generation           */
/* * * * * * * * * * * * * * * * * * * */

const LIGHT_SELECTOR = ':root,\n.light,\n.light-theme';
const DARK_SELECTOR = '.dark,\n.dark-theme';

function cssBlock(selector: string, lines: string[]): string {
  return `${selector} {\n${lines.map((l) => `  ${l};`).join('\n')}\n}`;
}

function scaleDeclarations(name: string, scale: ModeScale, options: { gray?: boolean; dark?: boolean }): string[] {
  return [
    ...scale.steps.map((v, i) => `--${name}-${scaleStops[i]}: ${v}`),
    ...scale.alphas.map((v, i) => `--${name}-alpha-${scaleStops[i]}: ${v}`),
    `--${name}-${SOLID_STOP}-contrast: ${scale.contrast}`,
    `--${name}-surface: ${scale.surface}`,
    ...(options.gray && options.dark ? [`--${name}-${SURFACE_STOP}-translucent: ${scale.translucent}`] : []),
  ];
}

/** The `:root`/`.dark` blocks defining the full `--{name}-*` scale. */
function scaleCss(name: string, colors: ScaleColors, options: { gray?: boolean } = {}): string {
  return [
    cssBlock(LIGHT_SELECTOR, scaleDeclarations(name, colors.light, { ...options, dark: false })),
    cssBlock(DARK_SELECTOR, scaleDeclarations(name, colors.dark, { ...options, dark: true })),
  ].join('\n\n');
}

function mappingDeclarations(target: string, name: string): string[] {
  return [
    ...scaleStops.map((stop) => `--${target}-${stop}: var(--${name}-${stop})`),
    ...scaleStops.map((stop) => `--${target}-alpha-${stop}: var(--${name}-alpha-${stop})`),
    `--${target}-${SOLID_STOP}-contrast: var(--${name}-${SOLID_STOP}-contrast)`,
  ];
}

/** The `[data-accent-color='{name}']` block pointing `--accent-*` at a scale. */
function accentMappingCss(name: string): string {
  return cssBlock(`[data-accent-color='${name}']`, [
    `--color-surface-accent: var(--${name}-surface)`,
    ...mappingDeclarations('accent', name),
  ]);
}

/** The `[data-gray-color='{name}']` block pointing `--gray-*` at a scale. */
function grayMappingCss(name: string): string {
  return cssBlock(`.ljkui:where([data-gray-color='${name}'])`, [
    `--gray-surface: var(--${name}-surface)`,
    `--gray-${SURFACE_STOP}-translucent: var(--${name}-${SURFACE_STOP}-translucent)`,
    ...mappingDeclarations('gray', name),
  ]);
}

/** The `[data-{kind}-color='{name}']` block pointing a semantic scale at a palette. */
function semanticMappingCss(kind: 'danger' | 'warning' | 'success' | 'info', name: string, isDefault: boolean): string {
  const selector = isDefault ? `:root,\n[data-${kind}-color='${name}']` : `[data-${kind}-color='${name}']`;
  return cssBlock(selector, [`--color-surface-${kind}: var(--${name}-surface)`, ...mappingDeclarations(kind, name)]);
}

interface CreatePaletteCssOptions {
  /** Also emit a `[data-gray-color='{name}']` mapping so the palette can be the Theme `grayColor`. */
  gray?: boolean;
}

/**
 * Generate the ljkui CSS for one Tailwind-style palette. The returned CSS is
 * self-contained: inject it once (a css file or a <style> tag) and `name` becomes usable
 * everywhere a scale name works, e.g. `<Theme accentColor={'my-brand' as never}>` or
 * `data-accent-color="my-brand"` on any subtree.
 */
function createPaletteCss(name: string, palette: TailwindPalette, options: CreatePaletteCssOptions = {}): string {
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error(`Invalid palette name "${name}". Use lowercase letters, digits and dashes.`);
  }

  const colors = computeScale(palette);
  const blocks = [scaleCss(name, colors, { gray: options.gray }), accentMappingCss(name)];
  if (options.gray) blocks.push(grayMappingCss(name));
  return blocks.join('\n\n') + '\n';
}

/* * * * * * * * * * * * * * * * * * * */
/*      Custom colors for <Theme>      */
/* * * * * * * * * * * * * * * * * * * */

function customScaleStyle(prefix: 'fui-ca' | 'fui-cg', colors: ScaleColors): Record<string, string> {
  const vars: Record<string, string> = {};
  colors.light.steps.forEach((v, i) => (vars[`--${prefix}-l${scaleStops[i]}`] = v));
  colors.dark.steps.forEach((v, i) => (vars[`--${prefix}-d${scaleStops[i]}`] = v));
  colors.light.alphas.forEach((v, i) => (vars[`--${prefix}-lalpha-${scaleStops[i]}`] = v));
  colors.dark.alphas.forEach((v, i) => (vars[`--${prefix}-dalpha-${scaleStops[i]}`] = v));
  vars[`--${prefix}-contrast`] = colors.dark.contrast;
  vars[`--${prefix}-ls`] = colors.light.surface;
  vars[`--${prefix}-ds`] = colors.dark.surface;
  if (prefix === 'fui-cg') vars[`--${prefix}-dt`] = colors.dark.translucent;
  return vars;
}

/**
 * Inline-style custom properties that make an arbitrary CSS color usable as the
 * accent under `data-accent-color="custom"`. Used by `<Theme accentColor="#8b5cf6">`.
 * The `[data-accent-color='custom']` block in tokens/custom-color.css turns them
 * into the `--accent-*` scale. Supports `#hex`, `rgb()` and `oklch()` colors.
 */
function createAccentScaleStyle(color: string): Record<string, string> {
  return customScaleStyle('fui-ca', computeScale(createPaletteFromColor(color)));
}

/**
 * Inline-style custom properties that make an arbitrary CSS color usable as the
 * gray scale under `data-gray-color="custom"`. Used by `<Theme grayColor="#3f3f46">`.
 */
function createGrayScaleStyle(color: string): Record<string, string> {
  return customScaleStyle('fui-cg', computeScale(createPaletteFromColor(color)));
}

/**
 * The dark-mode page background (scale step 10) for an arbitrary gray color, as a hex
 * string. theme.tsx applies this to `<body>`, which no CSS scale scope reaches.
 */
function darkPageBackgroundFromColor(color: string): string {
  const palette = createPaletteFromColor(color);
  return rgbToHex(oklabToRgb(mix(parseColor(palette[950]), BLACK, 0.4)));
}

/**
 * Pick the gray scale that pairs best with an arbitrary accent color, mirroring
 * `tailwindGetMatchingGrayScale`'s hue groupings. Falls back to `neutral` for
 * achromatic or unparseable colors.
 */
function matchingGrayFromColor(color: string): 'stone' | 'neutral' | 'zinc' {
  try {
    const c = parseColor(color);
    if (oklabChroma(c) < 0.02) return 'neutral';
    const hue = ((oklabHueDeg(c) % 360) + 360) % 360;
    if (hue >= 20 && hue < 115) return 'stone'; // warm: red/orange/amber/yellow
    if (hue >= 115 && hue < 190) return 'neutral'; // greens
    return 'zinc'; // cool hues, purples and pinks
  } catch {
    return 'neutral';
  }
}

/* * * * * * * * * * * * * * * * * * * */
/*     Single-color custom accents     */
/* * * * * * * * * * * * * * * * * * * */

// Reference lightness/chroma curves shaped like Tailwind v4's chromatic palettes.
const referenceLightness = [0.977, 0.936, 0.885, 0.808, 0.704, 0.637, 0.577, 0.505, 0.444, 0.396, 0.266];
const referenceChroma = [0.013, 0.032, 0.062, 0.114, 0.191, 0.237, 0.245, 0.213, 0.177, 0.141, 0.092];

/**
 * Expand a single CSS color into a full Tailwind-style 50–950 palette (constant hue,
 * Tailwind-shaped lightness/chroma curves; the seed color is kept verbatim at the
 * nearest stop). Feed the result to `createPaletteCss` for a fully custom accent.
 */
function createPaletteFromColor(color: string): TailwindPalette {
  const seed = parseColor(color);
  const chroma = oklabChroma(seed);
  const hue = oklabHueDeg(seed);

  let nearest = 0;
  for (let i = 1; i < referenceLightness.length; i++) {
    if (Math.abs(seed.L - referenceLightness[i]) < Math.abs(seed.L - referenceLightness[nearest])) nearest = i;
  }

  const chromaScale = Math.min(chroma / Math.max(referenceChroma[nearest], 0.001), 0.32 / Math.max(...referenceChroma));

  const palette = {} as TailwindPalette;
  tailwindPaletteStops.forEach((stop, i) => {
    const c = i === nearest ? seed : oklchToOklab(referenceLightness[i], referenceChroma[i] * chromaScale, hue);
    palette[stop] = rgbToHex(oklabToRgb(c));
  });
  return palette;
}

export {
  accentMappingCss,
  computeScale,
  createAccentScaleStyle,
  createGrayScaleStyle,
  createPaletteCss,
  createPaletteFromColor,
  cssColorToHex,
  darkPageBackgroundFromColor,
  grayMappingCss,
  matchingGrayFromColor,
  scaleCss,
  scaleStops,
  semanticMappingCss,
  tailwindPaletteStops,
};
export type { CreatePaletteCssOptions, ScaleColors, TailwindPalette, TailwindPaletteStop };
