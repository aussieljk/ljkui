import type { PropDef } from '../../helpers';

const morphTargets = ['active', 'origin', 'closest'] as const;

// Props for the primary part, `Lightbox.Root`.
const lightboxRootPropDefs = {
  /** Controlled open state. Pair with `onOpenChange`. */
  open: { type: 'boolean', default: undefined },
  /**
   * Uncontrolled initial open state.
   * @default false
   */
  defaultOpen: { type: 'boolean', default: false },
  /** Controlled active item index. Pair with `onValueChange`. */
  value: { type: 'string | number', default: undefined },
  /**
   * Uncontrolled initial active item index.
   * @default 0
   */
  defaultValue: { type: 'string | number', default: 0 },
  /**
   * Wrap navigation at the first and last items.
   * @default false
   */
  loop: { type: 'boolean', default: false },
  /**
   * Enable the View Transitions morph animation between trigger and lightbox item. Falls back to a
   * fade when unsupported or when `prefers-reduced-motion` is set.
   * @default false
   */
  viewTransition: { type: 'boolean', default: false },
  /**
   * Which trigger receives the morph on close: `'active'` (the current item), `'origin'` (the trigger
   * that opened the lightbox), or `'closest'` (the nearest registered trigger).
   * @default 'active'
   */
  morphTo: { type: 'enum', values: morphTargets, default: 'active' },
  /**
   * Whether the open morph waits for the destination image to decode before starting. Only relevant
   * when `viewTransition` is enabled.
   * @default true
   */
  awaitImageDecode: { type: 'boolean', default: true },
} satisfies {
  open: PropDef<boolean>;
  defaultOpen: PropDef<boolean>;
  value: PropDef<string | number>;
  defaultValue: PropDef<string | number>;
  loop: PropDef<boolean>;
  viewTransition: PropDef<boolean>;
  morphTo: PropDef<(typeof morphTargets)[number]>;
  awaitImageDecode: PropDef<boolean>;
};

export { lightboxRootPropDefs };
