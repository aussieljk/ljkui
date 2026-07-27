import type { PropDef } from '../../helpers';
import { colorProp } from '../../helpers';

const sizes = ['1', '2', '3', '4'] as const;

const separatorPropDefs = {
  /**
   * Controls the length of the separator line.
   * @default '1'
   */
  size: { type: 'enum', values: sizes, default: '1' },
  /**
   * Overrides the color of the separator line.
   * @default 'gray'
   */
  color: { ...colorProp, default: 'gray' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  color: typeof colorProp;
};

export { separatorPropDefs };
