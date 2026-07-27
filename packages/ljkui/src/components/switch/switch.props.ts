import { PropDef, colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3'] as const;

const switchPropDefs = {
  /**
   * Controls the size of the switch control.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Overrides the theme accent color for the checked state
   * (default undefined = inherit the theme accent).
   */
  color: colorProp,
  /** Renders a higher-contrast checked state. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { switchPropDefs };
