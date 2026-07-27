import type { PropDef } from '../../helpers';

const sides = ['start', 'end'] as const;
const variants = ['sidebar', 'floating', 'inset'] as const;
const collapsibleModes = ['offcanvas', 'icon', 'none'] as const;

const sidebarPropDefs = {
  /**
   * Which edge the sidebar is docked to.
   * @default 'start'
   */
  side: { type: 'enum', values: sides, default: 'start' },
  /**
   * The visual treatment of the sidebar.
   * @default 'sidebar'
   */
  variant: { type: 'enum', values: variants, default: 'sidebar' },
  /**
   * What collapsing does: slide off screen, shrink to an icon rail, or nothing.
   * @default 'offcanvas'
   */
  collapsible: { type: 'enum', values: collapsibleModes, default: 'offcanvas' },
} satisfies {
  side: PropDef<(typeof sides)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  collapsible: PropDef<(typeof collapsibleModes)[number]>;
};

export { sidebarPropDefs };
