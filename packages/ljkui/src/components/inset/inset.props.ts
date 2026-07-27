import type { PropDef } from '../../helpers';

const sides = ['all', 'x', 'y', 'top', 'bottom', 'left', 'right'] as const;
const clipValues = ['border-box', 'padding-box'] as const;
const paddingValues = ['current', '0'] as const;

const insetPropDefs = {
  /**
   * Which side(s) the inset bleeds into the parent's padding.
   * @default 'all'
   */
  side: { type: 'enum', values: sides, default: 'all' },
  /**
   * Whether content is clipped to the parent's border box or padding box.
   * @default 'border-box'
   */
  clip: {
    type: 'enum',
    values: clipValues,
    default: 'border-box',
  },
  /** Padding on all sides: 'current' keeps the parent's padding, '0' removes it. */
  p: {
    type: 'enum',
    values: paddingValues,
    default: undefined,
  },
  /** Horizontal padding: 'current' keeps the parent's padding, '0' removes it. */
  px: {
    type: 'enum',
    values: paddingValues,
    default: undefined,
  },
  /** Vertical padding: 'current' keeps the parent's padding, '0' removes it. */
  py: {
    type: 'enum',
    values: paddingValues,
    default: undefined,
  },
  /** Top padding: 'current' keeps the parent's padding, '0' removes it. */
  pt: {
    type: 'enum',
    values: paddingValues,
    default: undefined,
  },
  /** Right padding: 'current' keeps the parent's padding, '0' removes it. */
  pr: {
    type: 'enum',
    values: paddingValues,
    default: undefined,
  },
  /** Bottom padding: 'current' keeps the parent's padding, '0' removes it. */
  pb: {
    type: 'enum',
    values: paddingValues,
    default: undefined,
  },
  /** Left padding: 'current' keeps the parent's padding, '0' removes it. */
  pl: {
    type: 'enum',
    values: paddingValues,
    default: undefined,
  },
} satisfies {
  side: PropDef<(typeof sides)[number]>;
  clip: PropDef<(typeof clipValues)[number]>;
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

export { insetPropDefs };
