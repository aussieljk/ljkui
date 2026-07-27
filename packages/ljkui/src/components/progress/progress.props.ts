import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3', '4', '5', '6'] as const;

const progressPropDefs = {
  /**
   * Controls the height of the progress bar.
   * @default '6'
   */
  size: { type: 'enum', values: sizes, default: '6' },
  /** Overrides the theme accent color for the indicator (default undefined = inherit the theme accent). */
  color: { ...colorProp, default: undefined },
  /** Renders a higher-contrast indicator color. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { progressPropDefs };
