import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3'] as const;

const checkboxPropDefs = {
  /**
   * The size of the checkbox.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /** The color of the checkbox when checked. Inherits the theme accent color when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { checkboxPropDefs };
