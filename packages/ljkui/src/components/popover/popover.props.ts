import type { PropDef } from '../../helpers';

const contentSizes = ['1', '2', '3', '4'] as const;

const variants = ['solid', 'translucent'] as const;

const popoverContentPropDefs = {
  /**
   * Controls the padding and border radius scale of the popover panel.
   * @default '2'
   */
  size: { type: 'enum', values: contentSizes, default: '2' },
  /**
   * Controls the panel's background treatment (opaque vs. blurred translucent).
   * @default 'translucent'
   */
  variant: { type: 'enum', values: variants, default: 'translucent' },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

export { popoverContentPropDefs };
