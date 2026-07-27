import type { PropDef } from '../../helpers';

const contentSizes = ['1', '2', '3'] as const;

const variants = ['solid', 'translucent'] as const;

const hoverCardContentPropDefs = {
  /**
   * The size of the card: controls its padding and border radius.
   * @default '2'
   */
  size: { type: 'enum', values: contentSizes, default: '2' },
  /**
   * The visual style of the card background.
   * @default 'translucent'
   */
  variant: { type: 'enum', values: variants, default: 'translucent' },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { hoverCardContentPropDefs };
