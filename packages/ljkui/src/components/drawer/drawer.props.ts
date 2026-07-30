import type { PropDef } from '../../helpers';

// Props for the primary part, `Drawer.Root`. Always modal (the `modal` prop is fixed on). Open state
// is `open`/`onOpenChange` (controlled) or `defaultOpen` (uncontrolled).
const drawerRootPropDefs = {
  /**
   * Whether the drawer is open (controlled). Pair with `onOpenChange`.
   */
  open: { type: 'boolean' },
  /**
   * Whether the drawer is initially open (uncontrolled). To render a controlled drawer, use `open`
   * instead.
   * @default false
   */
  defaultOpen: { type: 'boolean', default: false },
  /**
   * Whether to prevent the drawer from closing on outside presses.
   * @default false
   */
  disablePointerDismissal: { type: 'boolean', default: false },
} satisfies {
  open: PropDef<boolean>;
  defaultOpen: PropDef<boolean>;
  disablePointerDismissal: PropDef<boolean>;
};

export { drawerRootPropDefs };
