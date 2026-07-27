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

const tailwindGrayScales = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const;

const tailwindColorScales = [...tailwindColorScalesChromatic, ...tailwindGrayScales] as const;

type TailwindColorScale = (typeof tailwindColorScales)[number];
type TailwindGrayScale = (typeof tailwindGrayScales)[number];

function isTailwindColorScale(color: string): color is TailwindColorScale {
  return (tailwindColorScales as readonly string[]).includes(color);
}

function tailwindGetMatchingGrayScale(colorScale: TailwindColorScale): TailwindGrayScale {
  switch (colorScale) {
    // Warm hues pair with the warm gray.
    case 'red':
    case 'orange':
    case 'amber':
    case 'yellow':
      return 'stone';
    // Greens pair with the pure gray.
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
    // Purples/pinks pair with the slightly cool gray.
    case 'violet':
    case 'purple':
    case 'fuchsia':
    case 'pink':
    case 'rose':
      return 'zinc';
    case 'slate':
    case 'gray':
    case 'zinc':
    case 'neutral':
    case 'stone':
      return colorScale;
  }
}

export {
  isTailwindColorScale,
  tailwindColorScales,
  tailwindColorScalesChromatic,
  tailwindGetMatchingGrayScale,
  tailwindGrayScales,
};
export type { TailwindColorScale, TailwindGrayScale };
