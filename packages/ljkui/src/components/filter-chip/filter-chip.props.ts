import type { PropDef } from '../../helpers';
import { colorProp } from '../../helpers';

const sizes = ['1', '2', '3'] as const;

const filterChipPropDefs = {
  /**
   * The size of the chip.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /** The color of the chip when checked. Inherits the theme accent color when not set. */
  color: colorProp,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
};

export { filterChipPropDefs };
