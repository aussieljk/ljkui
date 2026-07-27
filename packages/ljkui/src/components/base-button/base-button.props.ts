import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['classic', 'solid', 'soft', 'surface', 'ghost'] as const;

const baseButtonPropDefs = {
  /**
   * The size of the button.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * The visual style of the button.
   * @default 'surface'
   */
  variant: { type: 'enum', values: variants, default: 'surface' },
  /** The color of the button. Inherits the theme accent color when not set (gray for the `surface` variant). */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { baseButtonPropDefs };
