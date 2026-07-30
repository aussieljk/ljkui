import type { PropDef } from '../../helpers';

const directions = ['horizontal', 'vertical'] as const;

// Props for the primary part, `Resizable.Root`.
const resizableRootPropDefs = {
  /**
   * The axis the panels are laid out along.
   * @default 'horizontal'
   */
  direction: { type: 'enum', values: directions, default: 'horizontal' },
} satisfies {
  direction: PropDef<(typeof directions)[number]>;
};

const resizablePanelPropDefs = {
  /**
   * The panel's starting size, relative to its siblings. Normalised so the group totals 100.
   * @default 50
   */
  defaultSize: { type: 'string | number', default: 50 },
  /**
   * The smallest size, as a percentage of the group, the panel can be dragged to.
   * @default 10
   */
  minSize: { type: 'string | number', default: 10 },
} satisfies {
  defaultSize: PropDef<string | number>;
  minSize: PropDef<string | number>;
};

const resizableHandlePropDefs = {
  /** Shows a grip so the handle is discoverable without hovering. */
  withHandle: { type: 'boolean', default: undefined },
} satisfies {
  withHandle: PropDef<boolean>;
};

export { resizableHandlePropDefs, resizablePanelPropDefs, resizableRootPropDefs };
