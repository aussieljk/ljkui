import type { PropDef } from '../../helpers';

const sides = ['all', 'x', 'y', 'top', 'bottom', 'left', 'right'] as const;
const sizes = ['1', '2', '3', '4'] as const;

const bleedPropDefs = {
  /**
   * Which side(s) the content bleeds out of the parent's padding.
   * @default 'all'
   */
  side: { type: 'enum', values: sides, default: 'all' },
  /**
   * The amount of negative margin: 1=--space-2, 2=--space-3, 3=--space-4, 4=--space-5.
   * @default '3'
   */
  size: { type: 'enum', values: sizes, default: '3', responsive: true },
} satisfies {
  side: PropDef<(typeof sides)[number]>;
  size: PropDef<(typeof sizes)[number]>;
};

export { bleedPropDefs };
