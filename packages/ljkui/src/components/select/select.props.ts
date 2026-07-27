import { colorProp, highContrastProp } from '../../helpers';

import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;

const selectRootPropDefs = {
  /**
   * Controls the overall size of the trigger and dropdown content.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const triggerVariants = ['classic', 'surface', 'soft', 'ghost'] as const;

const selectTriggerPropDefs = {
  /**
   * Controls the visual style of the trigger button.
   * @default 'surface'
   */
  variant: { type: 'enum', values: triggerVariants, default: 'surface' },
  /**
   * Overrides the theme accent color for the trigger. When omitted, the theme
   * accent color is inherited (the 'surface' variant falls back to gray).
   */
  color: colorProp,
} satisfies {
  variant: PropDef<(typeof triggerVariants)[number]>;
  color: typeof colorProp;
};

const selectContentPropDefs = {
  /**
   * Renders the dropdown items in a higher-contrast color variant.
   */
  highContrast: highContrastProp,
} satisfies {
  highContrast: typeof highContrastProp;
};

export { selectContentPropDefs, selectRootPropDefs, selectTriggerPropDefs };
