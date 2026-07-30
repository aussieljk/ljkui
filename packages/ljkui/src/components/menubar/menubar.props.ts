import type { PropDef } from '../../helpers';

const orientations = ['horizontal', 'vertical'] as const;

// Props for the primary part, `Menubar.Root` (Base UI Menubar).
const menubarRootPropDefs = {
  /**
   * The orientation of the menubar.
   * @default 'horizontal'
   */
  orientation: { type: 'enum', values: orientations, default: 'horizontal' },
  /**
   * Whether the open menu traps focus and blocks interaction with the rest of the page.
   * @default true
   */
  modal: { type: 'boolean', default: true },
  /**
   * Whether arrow-key focus loops back to the first item when it reaches the end.
   * @default true
   */
  loopFocus: { type: 'boolean', default: true },
} satisfies {
  orientation: PropDef<(typeof orientations)[number]>;
  modal: PropDef<boolean>;
  loopFocus: PropDef<boolean>;
};

export { menubarRootPropDefs };
