/**
 * Maps Tailwind CSS v4 style palettes (11 stops, 50–950) onto the 12-step
 * scales that ljkui components consume.
 *
 * Steps are named after the Tailwind stops they come from, plus a `10` step for the
 * extra light shade — so the scale reads 10, 50, 100 … 900, 950 (see `scaleStops`).
 *
 * **The step names do not equal the Tailwind stops they read from**, in either mode.
 * The 12 steps are Radix-style *roles*, not a lightness ramp:
 *
 *   10   app background        400  subtle border      700  solid (buttons)
 *   50   subtle background     500  UI border          800  hovered solid
 *   100  UI element fill       600  strong border      900  low-contrast text
 *   200  hovered fill          ...                     950  high-contrast text
 *   300  active fill
 *
 * Roles 100–600 are all backgrounds and borders, so they live in the light half of
 * the palette; feeding Tailwind's 100–600 into them straight (which is what this
 * file used to do) put near-black borders on white cards. The tables below are
 * fitted against the frosted-ui/Radix scales this library forked from — `a·b` means
 * the OKLab midpoint of two stops, `+W`/`+K` a mix toward white/black:
 *
 * - light: [50+W70, 50+W35, 100+W45, 200+W35, 200, 200·300, 300, 300·400,
 *           solid, solid+K, text, 900·950]
 * - dark:  [900+K55, 900+K45, 900+K35, 900+K25, 900·950, 900, 800·900, 700·800,
 *           solid, solid+W, text, 200]
 * - grays take the `options.gray` branch of the same tables: mixing a near-black
 *   neutral toward black just yields more black, and they have no vivid solid.
 *
 * Light background/border steps are additionally damped to `UI_STEP_CHROMA`, because
 * Radix's UI steps are consistently less saturated than the Tailwind stops they map from.
 *
 * Two steps are solved rather than tabulated, so they hold for custom accent colors
 * too (see `<Theme accentColor="#8b5cf6">`):
 *
 * - the solid step is `500·600`, or — for "bright" palettes whose vivid form is too
 *   light to carry white text (amber, yellow, lime, sky) — the most chromatic color
 *   that still takes dark text. Radix's step 9 is the *same color* in light and dark,
 *   and so is this one. Bright scales are deliberately non-monotone here: their solid
 *   is *lighter* than the border step before it, exactly as frosted-ui's are.
 * - the text step is whichever candidate lands closest to a contrast target against
 *   the app background, bracketed so it can never collide with its neighbours.
 *
 * Alpha steps are the most transparent rgba() that composites back to the solid step
 * over the page — white in light mode, the scale's own step 10 in dark mode.
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

/**
 * Push a color's chroma out to the sRGB gamut boundary, keeping its lightness and hue.
 * This is what makes a "bright" solid the *vivid* form of its hue rather than just a
 * pale ramp step: Radix's sky 9 sits at the same lightness as its step 6 but carries
 * nearly double the chroma, and picking a ramp candidate alone reproduces the
 * lightness while leaving the two steps identical.
 */
function saturateToGamut(color: Oklab): Oklab {
  const hue = oklabHueDeg(color);
  let lo = oklabChroma(color);
  let hi = 0.5;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (isInGamut(oklchToOklab(color.L, mid, hue))) lo = mid;
    else hi = mid;
  }
  return oklchToOklab(color.L, lo, hue);
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

function contrastRatio(a: Rgb, b: Rgb): number {
  const la = wcagLuminance(a);
  const lb = wcagLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/*
 * No hue drift is applied to the pale steps, deliberately. Radix's ramps do drift
 * toward the warm side as they lighten (its red runs 28°→39°, its sky 242°→211°) and
 * Tailwind's are flatter, but mixing toward white in OKLab already reproduces the
 * effect: by step 200 the chroma is under 0.06, so hue contributes almost nothing.
 * Rotating steps 10–200 toward a warm anchor was measured across 14 palettes and
 * moved light ΔE by 0.001 while making dark ΔE worse (3.82 → 3.89). Don't add it back.
 */

/** Parse a CSS color (`#hex`, `rgb()`, `oklch()`) and return its sRGB hex, gamut-mapped. */
function cssColorToHex(color: string): string {
  return rgbToHex(oklabToRgb(parseColor(color)));
}

/* * * * * * * * * * * * * * * * * * * */
/*        Stops → 12-step scales       */
/* * * * * * * * * * * * * * * * * * * */

interface ModeScale {
  /** 12 solid steps as hex colors. */
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

/** The color that, painted at `alpha` over `backdrop`, composites back to `target`. */
function colorAtAlphaOver(target: Rgb, backdrop: Rgb, alpha: number): Rgb {
  const solve = (t: number, b: number) => b + (t - b) / alpha;
  return { r: solve(target.r, backdrop.r), g: solve(target.g, backdrop.g), b: solve(target.b, backdrop.b) };
}

/**
 * The most transparent rgba() that composites back to `target` over `backdrop`.
 *
 * Per channel `target = color·a + backdrop·(1-a)`, so `color = backdrop + (target -
 * backdrop)/a`; the smallest `a` keeping every channel inside 0…255 is the largest
 * per-channel ratio. The backdrop matters: light scales composite over the page white,
 * but dark scales composite over their own step 10 (`#111`-ish), not pure black —
 * deriving those over black is what made every dark alpha token read ~8pp too heavy.
 */
function alphaOver(target: Rgb, backdrop: Rgb): string {
  const channels = ['r', 'g', 'b'] as const;
  let a = 0;
  for (const k of channels) {
    const delta = target[k] - backdrop[k];
    const headroom = delta > 0 ? 255 - backdrop[k] : backdrop[k];
    if (delta !== 0 && headroom > 0) a = Math.max(a, Math.abs(delta) / headroom);
  }
  const alphaByte = Math.min(255, Math.ceil(a * 255));
  if (alphaByte === 0) return rgbToHex(backdrop) + '00';
  const scale = 255 / alphaByte;
  const solve = (k: (typeof channels)[number]) => backdrop[k] + (target[k] - backdrop[k]) * scale;
  return rgbToHex({ r: solve('r'), g: solve('g'), b: solve('b') }) + toHexByte(alphaByte);
}

/** Below this contrast against white, the solid step takes dark text instead. */
const SOLID_DARK_TEXT_THRESHOLD = 2.16;
/** A bright palette's solid is the most chromatic color still under this contrast with white. */
const BRIGHT_SOLID_MAX_CONTRAST = 1.6;
/** Minimum OKLab lightness gap between adjacent steps, so no two roles render alike. */
const RAMP_MIN_LIGHTNESS_STEP = 0.008;
/**
 * Chroma multiplier for the light background/border steps (10…600). Radix's UI steps
 * are consistently less saturated than the Tailwind stops they map from; damping them
 * measurably improves the fit for both regular and bright palettes, and it is what
 * keeps a bright scale's borders from colliding with its (undamped) solid chip.
 */
const UI_STEP_CHROMA = 0.85;

/**
 * Contrast the text step (`--{scale}-900`) aims for against the app background
 * (`--{scale}-10`). Measured off the frosted-ui scales: chromatic ramps average
 * 5.1:1 in light and 9.8:1 in dark, grays sit slightly higher.
 */
const TEXT_STEP_CONTRAST = {
  chromatic: { light: 5.0, dark: 9.3 },
  gray: { light: 5.9, dark: 9.1 },
} as const;

interface ComputeScaleOptions {
  /** Neutral palette — grays use their own step tables and text-contrast targets. */
  gray?: boolean;
  /**
   * A "bright" palette, whose vivid form is too light to carry white text (Radix's
   * `sky`/`mint`/`yellow`/`amber`/`lime` group). Detected from the palette when omitted,
   * which is what custom `<Theme accentColor>` colors rely on.
   */
  bright?: boolean;
}

/**
 * Expand an 11-stop palette into the light and dark 12-step scales, with
 * alpha steps, solid-step contrast color and translucent surfaces.
 */
function computeScale(palette: TailwindPalette, options: ComputeScaleOptions = {}): ScaleColors {
  const ok = {} as Record<TailwindPaletteStop, Oklab>;
  for (const stop of tailwindPaletteStops) {
    const value = palette[stop];
    if (typeof value !== 'string') throw new Error(`Palette is missing stop ${stop}.`);
    ok[stop] = parseColor(value);
  }

  /** The OKLab midpoint of two stops. */
  const mid = (a: TailwindPaletteStop, b: TailwindPaletteStop, t = 0.5) => mix(ok[a], ok[b], t);
  const toWhite = (stop: TailwindPaletteStop, t: number) => mix(ok[stop], WHITE, t);
  const toBlack = (stop: TailwindPaletteStop, t: number) => mix(ok[stop], BLACK, t);

  // Every stop plus every adjacent midpoint — the search space for the solved steps.
  const candidates: Oklab[] = [
    ...tailwindPaletteStops.map((stop) => ok[stop]),
    ...tailwindPaletteStops.slice(0, -1).map((stop, i) => mid(stop, tailwindPaletteStops[i + 1])),
  ];
  const mostChromatic = (pool: Oklab[]) =>
    pool.reduce((best, c) => (oklabChroma(c) > oklabChroma(best) ? c : best), pool[0]);

  const bright = options.bright ?? contrastWithWhite(oklabToRgb(mostChromatic(candidates))) < SOLID_DARK_TEXT_THRESHOLD;

  // The solid step. Radix's step 9 is the same color in light and dark — verified
  // across every frosted-ui scale — so chromatic palettes compute it once and share it.
  // A bright solid is the vivid form of the hue at the lightest level that still takes
  // dark text; without the gamut push it would come out identical to a border step.
  const brightPool = candidates.filter((c) => contrastWithWhite(oklabToRgb(c)) <= BRIGHT_SOLID_MAX_CONTRAST);
  const solid = bright ? saturateToGamut(mostChromatic(brightPool.length ? brightPool : candidates)) : mid(500, 600);

  /**
   * The candidate whose contrast against `background` lands closest to `target`, from
   * those that sit strictly between the two steps that bracket it (the hovered solid
   * and the high-contrast text step). Unconstrained, the solver returns a step *lighter*
   * than the solid for hues whose vivid form is already dark — violet's text step came
   * back equal to its own solid — or one identical to the step after it.
   */
  const textStep = (background: Oklab, target: number, bracket: [Oklab, Oklab]): Oklab => {
    const bg = oklabToRgb(background);
    const lo = Math.min(bracket[0].L, bracket[1].L) + RAMP_MIN_LIGHTNESS_STEP;
    const hi = Math.max(bracket[0].L, bracket[1].L) - RAMP_MIN_LIGHTNESS_STEP;
    const bracketed = candidates.filter((c) => c.L >= lo && c.L <= hi);
    const pool = bracketed.length ? bracketed : candidates;
    let best = pool[0];
    let bestDelta = Infinity;
    for (const c of pool) {
      const delta = Math.abs(contrastRatio(oklabToRgb(c), bg) - target);
      if (delta < bestDelta) {
        bestDelta = delta;
        best = c;
      }
    }
    return best;
  };

  const targets = TEXT_STEP_CONTRAST[options.gray ? 'gray' : 'chromatic'];

  // Steps 10…600 (the backgrounds, fills and borders). The solid, hover, text and
  // high-contrast steps are appended per mode below.
  // Grays are already untinted, so only the chromatic ramp is damped.
  const damp = (c: Oklab): Oklab => ({ L: c.L, a: c.a * UI_STEP_CHROMA, b: c.b * UI_STEP_CHROMA });
  const grayLightBase = [toWhite(50, 0.4), toWhite(100, 0.4), toWhite(200, 0.4), ok[200], mid(200, 300, 0.35), mid(200, 300, 0.7), ok[300], mid(300, 400)]; // prettier-ignore
  const chromaticLightBase = [toWhite(50, 0.7), toWhite(50, 0.35), toWhite(100, 0.45), toWhite(200, 0.35), ok[200], mid(200, 300), ok[300], mid(300, 400)].map(damp); // prettier-ignore
  const lightBase = options.gray ? grayLightBase : chromaticLightBase;
  const darkBase = options.gray
    ? [mid(900, 950), ok[900], mid(800, 900), ok[800], mid(700, 800), ok[700], mid(600, 700), mid(500, 600)]
    : [toBlack(900, 0.55), toBlack(900, 0.45), toBlack(900, 0.35), toBlack(900, 0.25), mid(900, 950), ok[900], mid(800, 900), mid(700, 800, 0.2)]; // prettier-ignore

  // Grays have no vivid form, so their solid and hover come from the ramp itself.
  const lightSolid = options.gray ? mid(400, 500) : solid;
  const darkSolid = options.gray ? mid(500, 600, 0.3) : solid;

  const lightHover = mix(lightSolid, BLACK, 0.06);
  const darkHover = options.gray ? ok[500] : mix(darkSolid, WHITE, 0.08);
  const lightHighContrast = options.gray ? mid(800, 900) : mid(900, 950);
  const darkHighContrast = options.gray ? mid(100, 200) : ok[200];

  const lightSteps = [
    ...lightBase,
    lightSolid,
    lightHover,
    textStep(lightBase[0], targets.light, [lightHover, lightHighContrast]),
    lightHighContrast,
  ];
  const darkSteps = [
    ...darkBase,
    darkSolid,
    darkHover,
    textStep(darkBase[0], targets.dark, [darkHover, darkHighContrast]),
    darkHighContrast,
  ];

  // Solid-step text: white, or a near-black palette tint when the solid is too light.
  const darkText = rgbToHex(oklabToRgb(mix(ok[900], ok[950], 0.6)));
  const contrastFor = (s: Rgb) => (contrastWithWhite(s) >= SOLID_DARK_TEXT_THRESHOLD ? 'white' : darkText);

  const build = (steps: Oklab[], mode: 'light' | 'dark'): ModeScale => {
    const stepsRgb = steps.map(oklabToRgb);
    // Light scales composite over the page white; dark ones over their own step 10.
    const backdrop = mode === 'light' ? { r: 255, g: 255, b: 255 } : stepsRgb[0];
    const step50 = stepsRgb[scaleStops.indexOf(SURFACE_STOP)];
    // The translucent surface and panel are step 50 un-composited against the page, so
    // they land back on step 50 once painted. Dark mode has to un-composite against the
    // page (step 10), not black — against black the ×2 lands a saturated dark step way
    // past its target (blue's surface came out #0c2678 against frosted's #0e1d3d).
    const surfaceAlpha = mode === 'light' ? 0.8 : 0.5;
    return {
      steps: stepsRgb.map(rgbToHex),
      stepsRgb,
      alphas: stepsRgb.map((c) => alphaOver(c, backdrop)),
      contrast: contrastFor(stepsRgb[scaleStops.indexOf(SOLID_STOP)]),
      surface: rgbToHex(colorAtAlphaOver(step50, backdrop, surfaceAlpha)) + (mode === 'light' ? 'cc' : '80'),
      translucent: rgbToHex(colorAtAlphaOver(step50, backdrop, 0.85)) + 'd9',
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

interface CreatePaletteCssOptions extends ComputeScaleOptions {
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

  const colors = computeScale(palette, options);
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
  // One contrast var covers both modes. Chromatic scales share a solid so the two
  // agree; where they don't (grays), take whichever mode wants dark text — white text
  // on a too-light solid is unreadable, the reverse is merely lower contrast.
  vars[`--${prefix}-contrast`] = colors.light.contrast === 'white' ? colors.dark.contrast : colors.light.contrast;
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
  return customScaleStyle('fui-cg', computeScale(createPaletteFromColor(color), { gray: true }));
}

/**
 * The dark-mode page background (scale step 10) for an arbitrary gray color, as a hex
 * string. theme.tsx applies this to `<body>`, which no CSS scale scope reaches.
 * Reads the generated scale so it can never drift from the gray step table.
 */
function darkPageBackgroundFromColor(color: string): string {
  return computeScale(createPaletteFromColor(color), { gray: true }).dark.steps[0];
}

/**
 * Pick the gray scale that pairs best with an arbitrary accent color, mirroring
 * `tailwindGetMatchingGrayScale`'s hue groupings. Falls back to `neutral` for
 * achromatic or unparseable colors.
 */
function matchingGrayFromColor(color: string): 'slate' | 'stone' | 'neutral' | 'zinc' {
  try {
    const c = parseColor(color);
    if (oklabChroma(c) < 0.02) return 'neutral';
    const hue = ((oklabHueDeg(c) % 360) + 360) % 360;
    if (hue >= 35 && hue < 115) return 'stone'; // warm: orange/amber/yellow
    if (hue >= 115 && hue < 190) return 'neutral'; // greens
    if (hue >= 190 && hue < 285) return 'slate'; // cool: cyan/sky/blue/indigo
    return 'zinc'; // reds, purples and pinks
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
