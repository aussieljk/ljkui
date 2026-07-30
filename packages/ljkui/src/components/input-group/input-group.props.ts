import type { PropDef } from '../../helpers';
import { colorProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['surface', 'soft'] as const;

// `InputGroup.Root` is an `Input.Root`, so it carries the same field props.
const inputGroupRootPropDefs = {
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

const buttonSizes = ['1', '2', '3', '4'] as const;
const buttonVariants = ['classic', 'solid', 'soft', 'surface', 'ghost'] as const;

// `InputGroup.Button` is an `IconButton`, defaulting to a small ghost button so it sits inside the field.
const inputGroupButtonPropDefs = {
  /**
   * The size of the button.
   * @default '1'
   */
  size: { type: 'enum', values: buttonSizes, default: '1' },
  /**
   * The visual style of the button.
   * @default 'ghost'
   */
  variant: { type: 'enum', values: buttonVariants, default: 'ghost' },
} satisfies {
  size: PropDef<(typeof buttonSizes)[number]>;
  variant: PropDef<(typeof buttonVariants)[number]>;
};

export { inputGroupButtonPropDefs, inputGroupRootPropDefs };
