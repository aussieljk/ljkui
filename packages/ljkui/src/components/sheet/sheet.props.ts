import type { PropDef } from '../../helpers';

// Props for the primary part, `Sheet.Root` (a Base UI Drawer, always modal).
const sheetRootPropDefs = {
  /** Whether the sheet is open (controlled). Pair with `onOpenChange`. */
  open: { type: 'boolean', default: undefined },
  /**
   * Whether the sheet is initially open (uncontrolled). To render a controlled sheet, use `open`.
   * @default false
   */
  defaultOpen: { type: 'boolean', default: false },
  /**
   * When `false`, swiping, clicking outside and pressing Escape will not close the sheet.
   * @default true
   */
  dismissible: { type: 'boolean', default: true },
} satisfies {
  open: PropDef<boolean>;
  defaultOpen: PropDef<boolean>;
  dismissible: PropDef<boolean>;
};

export { sheetRootPropDefs };
