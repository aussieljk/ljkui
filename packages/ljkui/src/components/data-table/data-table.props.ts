import { PropDef, colorProp, highContrastProp, trimProp } from '../../helpers';

const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const orientationValues = ['horizontal', 'vertical'] as const;
const sizes = ['1', '2', '3'] as const;

const dataTableRootPropDefs = {
  /**
   * Whether labels and values are laid out side by side or stacked.
   * @default 'horizontal'
   */
  orientation: {
    type: 'enum',
    values: orientationValues,
    default: 'horizontal',
  },
  /**
   * The size of the list text and spacing.
   * @default '2'
   */
  size: {
    type: 'enum',
    values: sizes,
    default: '2',
  },
  /** Trims the leading (whitespace above/below the text box) from the start, end, or both sides. */
  trim: {
    ...trimProp,
  },
} satisfies {
  orientation: PropDef<(typeof orientationValues)[number]>;
  size: PropDef<(typeof sizes)[number]>;
  trim: typeof trimProp;
};

const dataTableItemPropDefs = {
  /** How the label and value are vertically aligned within the row. */
  align: {
    type: 'enum',
    values: alignValues,
    default: undefined,
  },
} satisfies {
  align: PropDef<(typeof alignValues)[number]>;
};

const dataTableLabelPropDefs = {
  /** The color of the label text. Inherits the low-contrast gray label styling when not set. */
  color: colorProp,
  /** Increases color contrast with the background for better legibility. */
  highContrast: highContrastProp,
};

export { dataTableItemPropDefs, dataTableLabelPropDefs, dataTableRootPropDefs };
