import { PropDef } from '../../helpers';

const orientationValues = ['horizontal', 'vertical'] as const;

const widgetStackRootPropDefs = {
  /**
   * Controls the scroll axis along which the stacked widgets are laid out and paged.
   * @default 'vertical'
   */
  orientation: {
    type: 'enum',
    values: orientationValues,
    default: 'vertical',
  },
} satisfies {
  orientation: PropDef<(typeof orientationValues)[number]>;
};

export { widgetStackRootPropDefs };
