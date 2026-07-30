import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;

const sectionPropDefs = {
  /**
   * The vertical padding of the section: 1=24px, 2=40px, 3=64px, 4=96px.
   * @default '3'
   */
  size: { type: 'enum', values: sizes, default: '3', responsive: true },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { sectionPropDefs };
