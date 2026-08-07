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

const tailwindColorScales = [...tailwindColorScalesChromatic, ...tailwindNeutralScales] as const;

type TailwindColorScale = (typeof tailwindColorScales)[number];

function isTailwindColorScale(color: string): color is TailwindColorScale {
  return (tailwindColorScales as readonly string[]).includes(color);
}

export {
  isTailwindColorScale,
  tailwindBrightScales,
  tailwindColorScales,
  tailwindColorScalesChromatic,
  tailwindNeutralScales,
};
export type { TailwindColorScale };
