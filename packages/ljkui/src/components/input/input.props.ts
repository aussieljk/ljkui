import { PropDef, colorProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['surface', 'soft'] as const;

const inputPropDefs = {
  /**
   * Controls the height, text size and padding of the field.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Controls the visual style of the field.
   * @default 'surface'
   */
  variant: { type: 'enum', values: variants, default: 'surface' },
  /**
   * Overrides the accent color used for the field's background tint and focus ring.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
};

const inputSlotPropDefs = {
  /** Overrides the accent color of the slot's content (e.g. icons). Inherits from the field when not set. */
  color: colorProp,
} satisfies {
  color: typeof colorProp;
};

export { inputPropDefs, inputSlotPropDefs };
