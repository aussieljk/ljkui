import { PropDef, colorProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;

const dateFieldPropDefs = {
  /**
   * The size of the field.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /** The accent color of the field, used for focus and selection styling. */
  color: colorProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
};

export { dateFieldPropDefs };
