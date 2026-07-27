import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp, weightProp } from '../../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const variants = ['solid', 'soft', 'outline', 'ghost'] as const;

const codePropDefs = {
  /** The size of the code text. Inherits the surrounding text size when not set. */
  size: { type: 'enum', values: sizes, default: undefined },
  /**
   * The visual style of the code snippet.
   * @default 'soft'
   */
  variant: { type: 'enum', values: variants, default: 'soft' },
  /** The font weight of the code text. */
  weight: weightProp,
  /** The color of the code snippet. Inherits the theme accent color when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  weight: typeof weightProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { codePropDefs };
