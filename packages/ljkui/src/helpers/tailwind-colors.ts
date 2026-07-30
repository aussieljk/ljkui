/**
 * The Tailwind CSS v4 palettes exposed as ljkui scales. The 12-step
 * light/dark scales are generated from the installed `tailwindcss` package
 * into src/styles/tokens/palettes.css (see scripts/generate-palettes.ts).
 */

// prettier-ignore
const tailwindColorScalesChromatic = [
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

/**
 * The palettes whose vivid form is too light to carry white text, so their solid step
 * is a light chip with dark text — Radix's "bright" group (`sky`, `mint`, `yellow`,
 * `amber`, `lime`), mapped onto the Tailwind names that have a twin. Reading these
 * straight off Tailwind's 500/600 instead turns an amber button from a bright chip
 * into brown, so `generate-palettes.ts` passes the flag to `computeScale`.
 */
const tailwindBrightScales = ['amber', 'yellow', 'lime', 'sky'] as const;

/** Tailwind's five neutral palettes. All are usable as an accent. */
const tailwindNeutralScales = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const;

/**
 * The neutrals offered as the theme's gray scale. `gray` is left out: `--gray-*`
 * already *is* the tailwind gray scale, so picking it does nothing.
 *
 * `slate` is the blue-tinted one. Radix pairs its cool accents with a cool gray
 * (blue/sky/cyan → slate) and its reds and purples with the mauve one, and that
 * tinting is a visible part of the look this library forked from — dropping slate
 * flattened every cool theme onto zinc.
 */
const tailwindGrayScales = ['slate', 'zinc', 'neutral', 'stone'] as const;

const tailwindColorScales = [...tailwindColorScalesChromatic, ...tailwindNeutralScales] as const;

type TailwindColorScale = (typeof tailwindColorScales)[number];
type TailwindGrayScale = (typeof tailwindGrayScales)[number];

function isTailwindColorScale(color: string): color is TailwindColorScale {
  return (tailwindColorScales as readonly string[]).includes(color);
}

/** Mirrors Radix's accent→gray pairings, mapped onto Tailwind's four offered neutrals. */
function tailwindGetMatchingGrayScale(colorScale: TailwindColorScale): TailwindGrayScale {
  switch (colorScale) {
    // Warm hues pair with the warm gray (Radix: amber/yellow/orange → sand).
    case 'orange':
    case 'amber':
    case 'yellow':
      return 'stone';
    // Greens pair with the pure gray (Radix: green/teal → sage, lime → olive; Tailwind
    // has no green-tinted neutral, so the untinted one is the closest available).
    case 'lime':
    case 'green':
    case 'emerald':
    case 'teal':
      return 'neutral';
    // Cool hues pair with the blue-tinted gray (Radix: blue/sky/cyan → slate).
    case 'cyan':
    case 'sky':
    case 'blue':
    case 'indigo':
      return 'slate';
    // Reds, purples and pinks pair with the mauve-ish gray (Radix: → mauve).
    case 'red':
    case 'violet':
    case 'purple':
    case 'fuchsia':
    case 'pink':
    case 'rose':
      return 'zinc';
    // A neutral accent pairs with itself, or with its nearest offered gray.
    case 'gray':
      return 'neutral';
    case 'slate':
    case 'zinc':
    case 'neutral':
    case 'stone':
      return colorScale;
  }
}

export {
  isTailwindColorScale,
  tailwindBrightScales,
  tailwindColorScales,
  tailwindColorScalesChromatic,
  tailwindGetMatchingGrayScale,
  tailwindGrayScales,
  tailwindNeutralScales,
};
export type { TailwindColorScale, TailwindGrayScale };
