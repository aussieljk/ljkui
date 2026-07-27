import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2'] as const;
const variants = ['solid', 'soft', 'surface', 'outline'] as const;

const badgePropDefs = {
  /**
   * The size of the badge.
   * @default '1'
   */
  size: { type: 'enum', values: sizes, default: '1' },
  /**
   * The visual style of the badge.
   * @default 'soft'
   */
  variant: { type: 'enum', values: variants, default: 'soft' },
  /** The color of the badge. Inherits the theme accent color when not set. */
  color: { ...colorProp, default: undefined },
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { badgePropDefs };
