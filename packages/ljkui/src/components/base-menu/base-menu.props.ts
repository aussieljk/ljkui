import type { PropDef } from '../../helpers';
import { colorProp } from '../../helpers';

const contentSizes = ['1', '2', '3'] as const;

const variants = ['solid', 'translucent'] as const;

const baseMenuContentPropDefs = {
  /**
   * The size of the menu popup and its items.
   * @default '2'
   */
  size: { type: 'enum', values: contentSizes, default: '2' },
  /** The accent color used for highlighted items. Inherits the theme accent color when not set. */
  color: colorProp,
  /**
   * The visual style of the menu popup background.
   * @default 'translucent'
   */
  variant: { type: 'enum', values: variants, default: 'translucent' },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  color: typeof colorProp;
  variant: PropDef<(typeof variants)[number]>;
};

const baseMenuItemPropDefs = {
  /** The accent color of this item, overriding the menu's color. Useful for destructive actions. */
  color: colorProp,
  /** A keyboard shortcut hint displayed at the end of the item (display only, not a key binding). */
  shortcut: { type: 'string', default: undefined },
} satisfies {
  color: typeof colorProp;
  shortcut: PropDef<string>;
};

const baseMenuCheckboxItemPropDefs = {
  /** A keyboard shortcut hint displayed at the end of the item (display only, not a key binding). */
  shortcut: { type: 'string', default: undefined },
} satisfies {
  shortcut: PropDef<string>;
};

export { baseMenuCheckboxItemPropDefs, baseMenuContentPropDefs, baseMenuItemPropDefs };
