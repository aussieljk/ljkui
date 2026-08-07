// Forked from https://github.com/needim/ljkui-themes-with-tailwind
import plugin, { type PluginAPI } from 'tailwindcss/plugin';
import { tailwindNeutralScales } from './helpers/tailwind-colors';
import { scaleStops } from './helpers/tailwind-palette';
import { semanticColors, themeAccentColorsGrouped } from './theme-options';

export const accentColorNames: string[] = [];
/** The neutral palettes. Only these carry a `-50-translucent` step. */
const neutralColorNames: string[] = [...tailwindNeutralScales];

type LJKUIColorScales = (typeof scaleStops)[number];

themeAccentColorsGrouped.map((group) => {
  accentColorNames.push(...group.values.filter((color) => color !== 'gray'));
});

export function getColorTokenName(stop: LJKUIColorScales, alpha?: boolean): number | string {
  return alpha ? 'alpha-' + stop : stop;
}

/** `{ 'white-alpha-10': 'var(--white-alpha-10)', … }` — the 12 alpha steps of a ladder. */
const alphaLadderColors = (keyPrefix: string, varPrefix: string): Record<string, string> =>
  Object.fromEntries(scaleStops.map((stop) => [`${keyPrefix}alpha-${stop}`, `var(--${varPrefix}alpha-${stop})`]));

export const getColorDefinitions = (color: string, alpha?: boolean) => {
  const colors = scaleStops.reduce(
    (acc, stop) => {
      acc[getColorTokenName(stop, alpha)] = `var(--${color}-${alpha ? 'alpha-' : ''}${stop})`;
      return acc;
    },
    {} as Record<string, string>,
  );

  if (!alpha) {
    colors[`${getColorTokenName(700, alpha)}-contrast`] = `var(--${color}-700-contrast)`;
    colors['surface'] = `var(--${color}-surface)`;
    colors['DEFAULT'] = `var(--${color}-700)`;
    if (color === 'accent') {
      colors['surface'] = `var(--color-surface-accent)`;
    }
  }

  return colors;
};

export const ljkuiThemePlugin: ReturnType<typeof plugin.withOptions> = plugin.withOptions(
  () => {
    // TODO: make sure font styles are in sync with Text and Heading style
    return ({ addBase }: PluginAPI) => {
      addBase({
        '*': {
          outlineColor: 'currentColor',
        },
        'html, body': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      });
    };
  },
  () => {
    function generateTailwindColors(colorName: string) {
      const c = {
        ...getColorDefinitions(colorName, false),
        ...getColorDefinitions(colorName, true),
      };

      if (neutralColorNames.includes(colorName)) {
        c[`${getColorTokenName(50, false)}-translucent`] = `var(--${colorName}-50-translucent)`;
      }

      return c;
    }

    const allLJKUIColors = [...accentColorNames, ...semanticColors, ...neutralColorNames].reduce<
      Record<string, Record<string, string>>
    >((acc, colorName) => {
      acc[colorName] = { ...generateTailwindColors(colorName) };
      return acc;
    }, {});

    return {
      darkMode: 'class',
      theme: {
        screens: {
          xs: '520px',
          sm: '768px',
          md: '1024px',
          lg: '1280px',
          xl: '1640px',
        },
        fontSize: {
          0: 'var(--font-size-0)',
          1: 'var(--font-size-1)',
          2: 'var(--font-size-2)',
          3: 'var(--font-size-3)',
          4: 'var(--font-size-4)',
          5: 'var(--font-size-5)',
          6: 'var(--font-size-6)',
          7: 'var(--font-size-7)',
          8: 'var(--font-size-8)',
          9: 'var(--font-size-9)',
        },
        lineHeight: {
          0: 'var(--line-height-0)',
          1: 'var(--line-height-1)',
          2: 'var(--line-height-2)',
          3: 'var(--line-height-3)',
          4: 'var(--line-height-4)',
          5: 'var(--line-height-5)',
          6: 'var(--line-height-6)',
          7: 'var(--line-height-7)',
          8: 'var(--line-height-8)',
          9: 'var(--line-height-9)',
          none: '1',
          tight: '1.25',
          snug: '1.375',
          normal: '1.5',
          relaxed: '1.625',
          loose: '2',
        },
        // fontFamily is omitted: ljkui ships no font stacks, so `font-sans` and
        // friends keep whatever the host page's Tailwind theme defines.
        letterSpacing: {
          tighter: '-0.05em',
          tight: '-0.025em',
          normal: '0',
          wide: '0.025em',
          wider: '0.05em',
          widest: '0.1em',
        },
        fontWeight: {
          thin: '100',
          extralight: '200',
          light: 'var(--font-weight-light)',
          normal: 'var(--font-weight-regular)',
          medium: 'var(--font-weight-medium)',
          semibold: '600',
          bold: 'var(--font-weight-bold)',
          extrabold: '800',
          black: '900',
        },
        colors: {
          inherit: 'inherit',
          transparent: 'transparent',
          current: 'currentColor',
          white: '#FFFFFF',
          black: '#000000',
          background: 'var(--color-background)',
          surface: {
            DEFAULT: 'var(--color-surface)',
            accent: 'var(--color-surface-accent)',
          },
          stroke: 'var(--color-stroke)',
          overlay: 'var(--color-overlay)',
          panel: {
            solid: 'var(--color-panel-solid)',
            translucent: 'var(--color-panel-translucent)',
            // panel-elevation
            ...alphaLadderColors('elevation-', 'color-panel-elevation-'),
          },
          ...alphaLadderColors('white-', 'white-'),
          ...alphaLadderColors('black-', 'black-'),
          selection: 'var(--color-selection-root)',
          ...allLJKUIColors,
          accent: generateTailwindColors('accent'),
          gray: generateTailwindColors('gray'),
        },
      },
    };
  },
);
