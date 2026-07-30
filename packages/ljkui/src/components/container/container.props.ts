import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const aligns = ['left', 'center', 'right'] as const;

const containerPropDefs = {
  /**
   * The maximum width of the container: 1=448px, 2=688px, 3=880px, 4=1136px.
   * @default '4'
   */
  size: { type: 'enum', values: sizes, default: '4', responsive: true },
  /**
   * How the container is aligned within its parent when narrower than the available space.
   * @default 'center'
   */
  align: { type: 'enum', values: aligns, default: 'center' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  align: PropDef<(typeof aligns)[number]>;
};

export { containerPropDefs };
