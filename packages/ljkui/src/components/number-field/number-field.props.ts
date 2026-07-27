import { PropDef, colorProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['surface', 'soft'] as const;
const buttonLayouts = ['split', 'trailing', 'none'] as const;

const numberFieldPropDefs = {
  /**
   * Controls the overall size (height, padding and typography) of the field.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Controls the visual style of the field.
   * @default 'surface'
   */
  variant: { type: 'enum', values: variants, default: 'surface' },
  /**
   * Overrides the theme accent color for the field and its stepper buttons.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
  /**
   * Controls where the increment/decrement buttons are placed: on either side of the input,
   * grouped after it, or hidden entirely.
   * @default 'trailing'
   */
  buttonLayout: { type: 'enum', values: buttonLayouts, default: 'trailing' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
  buttonLayout: PropDef<(typeof buttonLayouts)[number]>;
};

const numberFieldSlotPropDefs = {
  /**
   * Overrides the theme accent color for content rendered inside the slot
   * (default undefined = inherit the theme accent).
   */
  color: colorProp,
} satisfies {
  color: typeof colorProp;
};

export { numberFieldPropDefs, numberFieldSlotPropDefs };
