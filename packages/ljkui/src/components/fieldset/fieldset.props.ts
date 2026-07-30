import type { PropDef } from '../../helpers';

const variants = ['legend', 'label'] as const;

// `Fieldset.Root` renders a plain `<fieldset>` with no design-system props; the styling knob lives on
// `Fieldset.Legend`.
const fieldsetLegendPropDefs = {
  /**
   * The visual variant of the legend. `'legend'` is a larger section heading (size 3, bold); `'label'`
   * matches a field label (size 2, medium).
   * @default 'legend'
   */
  variant: { type: 'enum', values: variants, default: 'legend' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
};

export { fieldsetLegendPropDefs };
