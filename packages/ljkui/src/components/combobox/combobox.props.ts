import { colorProp, highContrastProp } from '../../helpers';

import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;

const contentSizes = ['1', '2', '3', '4'] as const;
const contentVariants = ['solid', 'translucent'] as const;

const comboboxRootPropDefs = {
  /**
   * The size shared with the combobox parts (`Input`, `Chips`, `Content`) via context.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

const comboboxContentPropDefs = {
  /**
   * The size of the popup and its items. Inherits the `Root` size when not set.
   * @default '2'
   */
  size: { type: 'enum', values: contentSizes, default: '2' },
  /**
   * The visual style of the popup background.
   * @default 'translucent'
   */
  variant: { type: 'enum', values: contentVariants, default: 'translucent' },
  /** The accent color used for highlighted items. Inherits the theme accent color when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof contentVariants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

const comboboxItemPropDefs = {
  /** The accent color of this item, overriding the popup's color. */
  color: colorProp,
} satisfies {
  color: typeof colorProp;
};

const chipVariants = ['solid', 'soft'] as const;

const comboboxChipPropDefs = {
  /**
   * The visual style of the chip.
   * @default 'soft'
   */
  variant: { type: 'enum', values: chipVariants, default: 'soft' },
  /** The color of the chip. Inherits the theme accent color when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
} satisfies {
  variant: PropDef<(typeof chipVariants)[number]>;
  color: typeof colorProp;
  highContrast: typeof highContrastProp;
};

export { comboboxChipPropDefs, comboboxContentPropDefs, comboboxItemPropDefs, comboboxRootPropDefs };
