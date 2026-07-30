import type { PropDef } from '../../helpers';

const orientations = ['horizontal', 'vertical'] as const;
const scrollBehaviors = ['smooth', 'instant'] as const;

// Props for the primary part, `Carousel.Root`.
const carouselRootPropDefs = {
  /**
   * The initial active item index (uncontrolled mode).
   * @default 0
   */
  defaultValue: { type: 'string | number', default: 0 },
  /**
   * The active item index (controlled mode). When provided, the component is fully controlled —
   * external changes scroll the viewport to the corresponding item.
   */
  value: { type: 'string | number' },
  /**
   * When true, navigation wraps around at boundaries: previous/next buttons jump to the other end
   * instead of disabling, and marker arrow keys wrap instead of clamping.
   * @default false
   */
  loop: { type: 'boolean', default: false },
  /**
   * The scroll orientation of the gallery.
   * @default 'horizontal'
   */
  orientation: { type: 'enum', values: orientations, default: 'horizontal' },
  /**
   * Controls whether programmatic scrolls animate smoothly or jump instantly. Reduced motion always
   * forces `'instant'` regardless of this value.
   * @default 'smooth'
   */
  scrollBehavior: { type: 'enum', values: scrollBehaviors, default: 'smooth' },
} satisfies {
  defaultValue: PropDef<number>;
  value: PropDef<number>;
  loop: PropDef<boolean>;
  orientation: PropDef<(typeof orientations)[number]>;
  scrollBehavior: PropDef<(typeof scrollBehaviors)[number]>;
};

export { carouselRootPropDefs };
