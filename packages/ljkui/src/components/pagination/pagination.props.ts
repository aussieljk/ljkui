import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3'] as const;

const paginationPropDefs = {
  /**
   * The size of the pagination controls.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { paginationPropDefs };
