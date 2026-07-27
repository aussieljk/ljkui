import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3'] as const;
const variants = ['plain', 'outline', 'muted'] as const;

const itemPropDefs = {
  /**
   * The size of the item.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * The visual style of the item.
   * @default 'plain'
   */
  variant: { type: 'enum', values: variants, default: 'plain' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { itemPropDefs };
