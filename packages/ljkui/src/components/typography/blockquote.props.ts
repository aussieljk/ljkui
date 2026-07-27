import { textPropDefs } from './text.props';

const blockquotePropDefs = {
  /** The size of the quoted text. Inherits the surrounding text size when not set. */
  size: textPropDefs.size,
  /** The font weight of the quoted text. */
  weight: textPropDefs.weight,
  /** The color of the quoted text. Inherits the surrounding text color when not set. */
  color: textPropDefs.color,
  /** Increases color contrast with the background for better legibility. */
  highContrast: textPropDefs.highContrast,
} satisfies {
  size: typeof textPropDefs.size;
  weight: typeof textPropDefs.weight;
  color: typeof textPropDefs.color;
  highContrast: typeof textPropDefs.highContrast;
};

export { blockquotePropDefs };
