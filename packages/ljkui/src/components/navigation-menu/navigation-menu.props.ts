import type { PropDef } from '../../helpers';

const orientations = ['horizontal', 'vertical'] as const;

// Props for the primary part, `NavigationMenu.Root`.
const navigationMenuRootPropDefs = {
  /**
   * How long to wait before opening the navigation popup, in milliseconds.
   * @default 50
   */
  delay: { type: 'string | number', default: 50 },
  /**
   * How long to wait before closing the navigation popup, in milliseconds.
   * @default 50
   */
  closeDelay: { type: 'string | number', default: 50 },
  /**
   * The orientation of the navigation menu.
   * @default 'horizontal'
   */
  orientation: { type: 'enum', values: orientations, default: 'horizontal' },
} satisfies {
  delay: PropDef<number>;
  closeDelay: PropDef<number>;
  orientation: PropDef<(typeof orientations)[number]>;
};

export { navigationMenuRootPropDefs };
