import type { PropDef } from '../../helpers';
import { colorProp } from '../../helpers';

// Content props (same as BaseMenu)
const contentSizes = ['1', '2', '3'] as const;
const contentVariants = ['solid', 'translucent'] as const;

const autocompleteContentPropDefs = {
  /**
   * The size of the popup and its items.
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
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof contentVariants)[number]>;
  color: typeof colorProp;
};

const autocompleteItemPropDefs = {
  /** The accent color of this item, overriding the popup's color. */
  color: colorProp,
} satisfies {
  color: typeof colorProp;
};

export { autocompleteContentPropDefs, autocompleteItemPropDefs };
