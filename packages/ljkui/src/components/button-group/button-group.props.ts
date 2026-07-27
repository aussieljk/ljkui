import type { PropDef } from '../../helpers';

const orientations = ['horizontal', 'vertical'] as const;

const buttonGroupPropDefs = {
  /**
   * The direction the buttons are stacked in.
   * @default 'horizontal'
   */
  orientation: { type: 'enum', values: orientations, default: 'horizontal' },
} satisfies {
  orientation: PropDef<(typeof orientations)[number]>;
};

export { buttonGroupPropDefs };
