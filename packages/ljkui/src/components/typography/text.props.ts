import type { PropDef } from '../../helpers';
import { alignProp, colorProp, highContrastProp, trimProp, weightProp } from '../../helpers';

const sizes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const textPropDefs = {
  /** Controls the font size on the type scale. Inherits from the surrounding text when not set. */
  size: { type: 'enum', values: sizes, default: undefined },
  /** Controls the font weight. Inherits from the surrounding text when not set. */
  weight: weightProp,
  /** Controls the horizontal text alignment. */
  align: alignProp,
  /** Trims the leading (whitespace above/below the text box) from the start, end, or both sides. */
  trim: trimProp,
  /** Overrides the theme accent color for this text. Inherits the theme accent color when not set. */
  color: colorProp,
  /** Renders the text in a higher-contrast color variant. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  weight: typeof weightProp;
  align: typeof alignProp;
  trim: typeof trimProp;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { textPropDefs };
