import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const circularProgressPropDefs = {
  /**
   * The diameter of the progress ring.
   * @default '3'
   */
  size: { type: 'enum', values: sizes, default: '3' },
  /** The color of the progress indicator. Inherits the theme accent color when not set. */
  color: { ...colorProp, default: undefined },
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { circularProgressPropDefs };
