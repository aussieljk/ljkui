import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3'] as const;

const radioGroupPropDefs = {
  /**
   * Controls the size of the radio buttons and their labels.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Overrides the theme accent color for the selected radio buttons
   * (default undefined = inherit the theme accent).
   */
  color: colorProp,
  /** Renders a higher-contrast selected state. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { radioGroupPropDefs };
