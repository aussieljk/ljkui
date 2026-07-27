import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['solid', 'soft', 'surface', 'ghost'] as const;

const togglePropDefs = {
  /**
   * The size of the toggle.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * The visual style of the toggle when pressed. Unpressed toggles always render as `ghost`.
   * @default 'soft'
   */
  variant: { type: 'enum', values: variants, default: 'soft' },
  /** The color of the toggle when pressed. Inherits the theme accent color when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { togglePropDefs };
