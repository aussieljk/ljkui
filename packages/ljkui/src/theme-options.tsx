import type { GetPropDefTypes, PropDef } from './helpers';
import {
  isTailwindColorScale,
  tailwindColorScales,
  tailwindColorScalesChromatic,
  tailwindGetMatchingGrayScale,
  tailwindGrayScales,
} from './helpers/tailwind-colors';
import { matchingGrayFromColor } from './helpers/tailwind-palette';

const colorPanelElevationColors = ['color-panel-elevation'] as const;
const semanticColors = ['danger', 'warning', 'success', 'info'] as const;
const appearances = ['inherit', 'light', 'dark'] as const;
const accentColors = tailwindColorScales;
const grayColors = [...tailwindGrayScales, 'auto'] as const;
const dangerColors = ['red', 'rose'] as const;
const warningColors = ['amber', 'yellow', 'orange'] as const;
const successColors = ['green', 'emerald', 'teal'] as const;
const infoColors = ['sky', 'blue', 'cyan'] as const;

const themePropDefs = {
  hasBackground: { type: 'boolean', default: true },
  appearance: { type: 'enum', values: appearances, default: 'inherit' },
  accentColor: { type: 'enum', values: accentColors, default: 'blue' },
  grayColor: { type: 'enum', values: grayColors, default: 'neutral' },
  dangerColor: { type: 'enum', values: dangerColors, default: 'red' },
  warningColor: { type: 'enum', values: warningColors, default: 'amber' },
  successColor: { type: 'enum', values: successColors, default: 'green' },
  infoColor: { type: 'enum', values: infoColors, default: 'sky' },
} satisfies {
  hasBackground: PropDef<boolean>;
  appearance: PropDef<(typeof appearances)[number]>;
  accentColor: PropDef<(typeof accentColors)[number]>;
  grayColor: PropDef<(typeof grayColors)[number]>;
  dangerColor: PropDef<(typeof dangerColors)[number]>;
  warningColor: PropDef<(typeof warningColors)[number]>;
  successColor: PropDef<(typeof successColors)[number]>;
  infoColor: PropDef<(typeof infoColors)[number]>;
};

type ThemeProps = GetPropDefTypes<typeof themePropDefs>;

type ThemeAppearance = NonNullable<ThemeProps['appearance']>;
/** A named scale, or any CSS color string (`#hex`, `rgb()`, `oklch()`) for a custom accent. */
type ThemeAccentColor = NonNullable<ThemeProps['accentColor']> | (string & {});
/** A named gray scale, `'auto'`, or any CSS color string for a custom gray. */
type ThemeGrayColor = NonNullable<ThemeProps['grayColor']> | (string & {});
type ThemeDangerColor = NonNullable<ThemeProps['dangerColor']>;
type ThemeWarningColor = NonNullable<ThemeProps['warningColor']>;
type ThemeSuccessColor = NonNullable<ThemeProps['successColor']>;
type ThemeInfoColor = NonNullable<ThemeProps['infoColor']>;

type ThemeOptions = {
  appearance: ThemeAppearance;
  accentColor: ThemeAccentColor;
  grayColor: ThemeGrayColor;
  dangerColor: ThemeDangerColor;
  warningColor: ThemeWarningColor;
  successColor: ThemeSuccessColor;
  infoColor: ThemeInfoColor;
};

const themeAccentColorsGrouped = [
  { label: 'Colors', values: [...tailwindColorScalesChromatic] as ThemeAccentColor[] },
  { label: 'Grays', values: [...tailwindGrayScales] as ThemeAccentColor[] },
];

const themeAccentColorsOrdered = [...tailwindColorScales] as ThemeAccentColor[];

const themeGrayColorsGrouped = [{ label: 'Grays', values: ['auto', ...tailwindGrayScales] as ThemeGrayColor[] }];

/** `true` when the value is not one of the named accent scales, i.e. a custom CSS color. */
function isCustomAccentColor(accentColor: ThemeAccentColor): boolean {
  return !(accentColors as readonly string[]).includes(accentColor);
}

/** `true` when the value is not `'auto'` or a named gray scale, i.e. a custom CSS color. */
function isCustomGrayColor(grayColor: ThemeGrayColor): boolean {
  return !(grayColors as readonly string[]).includes(grayColor);
}

function getMatchingGrayColor(accentColor: ThemeAccentColor): (typeof tailwindGrayScales)[number] {
  if (isTailwindColorScale(accentColor)) return tailwindGetMatchingGrayScale(accentColor);
  return matchingGrayFromColor(accentColor);
}

export {
  colorPanelElevationColors,
  dangerColors,
  getMatchingGrayColor,
  infoColors,
  isCustomAccentColor,
  isCustomGrayColor,
  semanticColors,
  successColors,
  //
  themeAccentColorsGrouped,
  themeAccentColorsOrdered,
  themeGrayColorsGrouped,
  themePropDefs,
  warningColors,
};
export type { ThemeOptions };
