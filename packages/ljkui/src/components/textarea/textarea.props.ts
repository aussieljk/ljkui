import { PropDef, colorProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;
const variants = ['surface', 'soft'] as const;

const textareaPropDefs = {
  /**
   * Controls the text size and padding of the text area.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Controls the visual style of the text area.
   * @default 'surface'
   */
  variant: { type: 'enum', values: variants, default: 'surface' },
  /**
   * Overrides the accent color used for the text area's background tint and focus ring.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  color: typeof colorProp;
};

export { textareaPropDefs };
