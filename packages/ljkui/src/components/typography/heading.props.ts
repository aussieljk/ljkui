import type { PropDef } from '../../helpers';
import { alignProp, colorProp, highContrastProp, trimProp, weightProp } from '../../helpers';

const sizes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
type Weight = (typeof weightProp.values)[number];

const headingPropDefs = {
  /**
   * The size of the heading.
   * @default '6'
   */
  size: { type: 'enum', values: sizes, default: '6' },
  /**
   * The font weight of the heading.
   * @default 'bold'
   */
  weight: { ...weightProp, default: 'bold' },
  /** The horizontal text alignment. */
  align: alignProp,
  /** Trims the leading (whitespace above/below the text box) from the start, end, or both sides. */
  trim: trimProp,
  /** The color of the heading. Inherits the surrounding text color when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: PropDef<Weight>;
  align: typeof alignProp;
  trim: typeof trimProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { headingPropDefs };
