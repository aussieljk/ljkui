import type { PropDef } from '../../helpers';

const contentSizes = ['1', '2', '3', '4'] as const;

const dialogContentPropDefs = {
  /**
   * The size of the dialog: controls its max width, padding and radius, and scales the default `Title`
   * and `Description` sizes.
   * @default '3'
   */
  size: { type: 'enum', values: contentSizes, default: '3' },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
};

export { dialogContentPropDefs };
