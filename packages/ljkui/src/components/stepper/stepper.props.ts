import type { PropDef } from '../../helpers';
import { colorProp } from '../../helpers';

const sizes = ['1', '2', '3'] as const;
const orientations = ['horizontal', 'vertical'] as const;

const stepperPropDefs = {
  /**
   * The size of the step markers and labels.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Whether the steps are laid out in a row or a column.
   * @default 'horizontal'
   */
  orientation: { type: 'enum', values: orientations, default: 'horizontal' },
  /** Overrides the theme accent color for completed / current markers. */
  color: { ...colorProp, default: undefined },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  orientation: PropDef<(typeof orientations)[number]>;
  color: typeof colorProp;
};

export { stepperPropDefs };
