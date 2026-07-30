import type { PropDef } from '../../helpers';

// Props for the primary part, `Collapsible.Root` (Base UI Collapsible.Root).
const collapsibleRootPropDefs = {
  /** Whether the panel is open (controlled). To render an uncontrolled collapsible, use `defaultOpen`. */
  open: { type: 'boolean' },
  /**
   * Whether the panel is initially open (uncontrolled). To render a controlled collapsible, use `open`.
   * @default false
   */
  defaultOpen: { type: 'boolean', default: false },
  /**
   * Whether the collapsible should ignore user interaction.
   * @default false
   */
  disabled: { type: 'boolean', default: false },
} satisfies {
  open: PropDef<boolean>;
  defaultOpen: PropDef<boolean>;
  disabled: PropDef<boolean>;
};

export { collapsibleRootPropDefs };
