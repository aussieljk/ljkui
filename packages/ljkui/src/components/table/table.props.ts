import type { PropDef } from '../../helpers';

const sizes = ['1', '2'] as const;
const variants = ['surface', 'ghost'] as const;

const tableRootPropDefs = {
  /**
   * Controls cell padding and text size throughout the table.
   * @default '2'
   */
  size: { type: 'enum', values: sizes, default: '2' },
  /**
   * Controls the table's visual style ('surface' adds a card-like background and border).
   * @default 'surface'
   */
  variant: { type: 'enum', values: variants, default: 'surface' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

const rowAlign = ['start', 'center', 'end', 'baseline'] as const;

const tableRowPropDefs = {
  /** Vertical alignment of the cells in the row. */
  align: {
    type: 'enum',
    values: rowAlign,
    default: undefined,
  },
} satisfies {
  align: PropDef<(typeof rowAlign)[number]>;
};

const cellJustify = ['start', 'center', 'end'] as const;

const tableCellPropDefs = {
  /** Horizontal alignment of the cell's content. */
  justify: {
    type: 'enum',
    values: cellJustify,
    default: undefined,
  },
  /** Fixed width of the cell's column (any CSS width value; numbers are treated as pixels). */
  width: { type: 'string | number', default: undefined },
} satisfies {
  justify: PropDef<(typeof cellJustify)[number]>;
  width: PropDef<string | number>;
};

export { tableCellPropDefs, tableRootPropDefs, tableRowPropDefs };
