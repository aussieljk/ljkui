import type { PropDef } from '../../helpers';

const types = ['single', 'multiple'] as const;
const orientations = ['horizontal', 'vertical'] as const;

// Props for the primary part, `Accordion.Root`.
const accordionRootPropDefs = {
  /**
   * Whether multiple items can be open at the same time. When omitted, falls back to the deprecated
   * `type` prop (`type="multiple"`).
   * @default false
   */
  multiple: { type: 'boolean', default: false },
  /**
   * Deprecated radix-ui-style API for `multiple`. Kept for backwards compatibility — use `multiple`
   * instead.
   */
  type: { type: 'enum', values: types },
  /**
   * Whether the accordion should ignore user interaction.
   * @default false
   */
  disabled: { type: 'boolean', default: false },
  /**
   * Whether to keep the panel in the DOM while it is closed.
   * @default false
   */
  keepMounted: { type: 'boolean', default: false },
  /**
   * The component orientation.
   * @default 'vertical'
   */
  orientation: { type: 'enum', values: orientations, default: 'vertical' },
} satisfies {
  multiple: PropDef<boolean>;
  type: PropDef<(typeof types)[number]>;
  disabled: PropDef<boolean>;
  keepMounted: PropDef<boolean>;
  orientation: PropDef<(typeof orientations)[number]>;
};

export { accordionRootPropDefs };
