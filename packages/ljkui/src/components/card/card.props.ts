import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4', '5'] as const;
const variants = ['surface', 'outline', 'ghost', 'soft'] as const;

const cardPropDefs = {
  /**
   * The size of the card: controls its padding and border radius.
   * @default '1'
   */
  size: { type: 'enum', values: sizes, default: '1' },
  /**
   * The visual style of the card.
   * @default 'surface'
   */
  variant: { type: 'enum', values: variants, default: 'surface' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { cardPropDefs };
