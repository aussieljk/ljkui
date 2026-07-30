import type { PropDef } from '../../helpers';
import { colorProp } from '../../helpers';

const sizes = ['1', '2', '3'] as const;

const treeViewPropDefs = {
  /**
   * The size of the rows and text.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /** Overrides the theme accent color for the selected row. */
  color: { ...colorProp, default: undefined },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
};

export { treeViewPropDefs };
