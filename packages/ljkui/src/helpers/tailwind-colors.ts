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
 * is a light chip with dark text. Reading these
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
 * `slate` is the blue-tinted one. Cool accents (blue/sky/cyan) pair with a cool gray
 * and reds and purples with a warmer one; that tinting is a visible part of the look,
 * and dropping slate flattened every cool theme onto zinc.
 */
const tailwindGrayScales = ['slate', 'zinc', 'neutral', 'stone'] as const;

const tailwindColorScales = [...tailwindColorScalesChromatic, ...tailwindNeutralScales] as const;

type TailwindColorScale = (typeof tailwindColorScales)[number];
type TailwindGrayScale = (typeof tailwindGrayScales)[number];

function isTailwindColorScale(color: string): color is TailwindColorScale {
  return (tailwindColorScales as readonly string[]).includes(color);
}

/** Pairs each accent with a neutral of matching temperature, from Tailwind's four offered grays. */
function tailwindGetMatchingGrayScale(colorScale: TailwindColorScale): TailwindGrayScale {
  switch (colorScale) {
    // Warm hues pair with the warm gray.
    case 'orange':
    case 'amber':
    case 'yellow':
      return 'stone';
    // Greens pair with the pure gray: Tailwind has no green-tinted neutral, so the
    // untinted one is the closest available.
    case 'lime':
    case 'green':
    case 'emerald':
    case 'teal':
      return 'neutral';
    // Cool hues pair with the blue-tinted gray.
    case 'cyan':
    case 'sky':
    case 'blue':
    case 'indigo':
      return 'slate';
    // Reds, purples and pinks pair with the mauve-ish gray.
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
