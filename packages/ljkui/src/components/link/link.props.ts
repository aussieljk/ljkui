import type { PropDef } from '../../helpers';
import { textPropDefs } from '../typography/text.props';

const underline = ['auto', 'hover', 'always'] as const;

const linkPropDefs = {
  /**
   * Sets the text size on the theme's typographic scale.
   * When unset, the link inherits the size of the surrounding text.
   */
  size: textPropDefs.size,
  /** Sets the font weight of the link text. */
  weight: textPropDefs.weight,
  /** Trims the leading (whitespace above and below the text) from the start, end, or both sides. */
  trim: textPropDefs.trim,
  /**
   * Controls when the link's underline is shown.
   * @default 'auto'
   */
  underline: { type: 'enum', values: underline, default: 'auto' },
  /** Overrides the theme accent color for this link. Inherits the theme accent color when unset. */
  color: textPropDefs.color,
  /** Renders a higher-contrast color variant for improved accessibility. */
  highContrast: textPropDefs.highContrast,
} satisfies {
  size: typeof textPropDefs.size;
  weight: typeof textPropDefs.weight;
  trim: typeof textPropDefs.trim;
  underline: PropDef<(typeof underline)[number]>;
  color: typeof textPropDefs.color;
  highContrast: typeof textPropDefs.highContrast;
};

export { linkPropDefs };
