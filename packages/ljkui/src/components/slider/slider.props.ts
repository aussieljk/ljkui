import type { PropDef } from '../../helpers';
import { colorProp, highContrastProp } from '../../helpers';

const sizes = ['1', '2', '3'] as const;

const sliderPropDefs = {
  /**
   * The size of the slider's track and thumbs.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /** Overrides the theme accent color for this slider. Inherits the theme accent when omitted. */
  color: colorProp,
  /** Renders a higher-contrast slider. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { sliderPropDefs };
