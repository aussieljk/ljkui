/**
 * Carousel — a headless, unstyled compound component for scrollable
 * navigation galleries. Inspired by the CSS Overflow Level 5 spec's
 * `::scroll-button()`, `::scroll-marker`, and `::scroll-marker-group`
 * pseudo-elements, implemented as a React primitive.
 *
 * Architecture follows Base UI patterns: compound components communicating
 * via React Context, `useRender` for flexible element rendering, and
 * `mergeProps` for combining consumer and internal props.
 *
 * Key design decisions:
 *
 * - **No scroll-snap enforcement**: The primitive uses native `overflow: auto`
 *   and `scrollBy`. Consumers optionally add `scroll-snap-type` via CSS.
 *
 * - **No ARIA assumptions**: No hardcoded `aria-label`, `aria-roledescription`,
 *   or `aria-live` — the consumer provides these in their language.
 *
 * - **Page-based scroll buttons**: Previous/Next scroll by ~85% of the
 *   viewport (CSS Overflow 5 §3.2), not by one item.
 *
 * - **CSS spec active marker algorithm**: Active marker is computed using
 *   the "Calculating the Active Scroll Marker" algorithm from CSS Overflow 5,
 *   with position redistribution for items at scroll boundaries and a
 *   "nearest" approach so the marker transitions at the midpoint.
 *
 * - **"Current scroll target" concept**: When a marker is clicked, its index
 *   is locked as the active marker through the smooth scroll animation
 *   (CSS Overflow 5 §2.1). User input (wheel/touch/pointer) cancels the lock.
 *
 * Sub-components:
 *   Root           — Context-only provider (no DOM element), active index state, imperative scrollTo
 *   Viewport       — Scrollable container, scroll event orchestration
 *   Item           — Individual gallery item, self-registering
 *   Previous/Next  — Scroll buttons (page-based, auto-disable at boundaries)
 *   ScrollMarkerGroup — Container for markers (role="tablist")
 *   ScrollMarker   — Individual marker button (role="tab")
 */
export { CarouselRoot as Root } from './carousel-root';
export { CarouselViewport as Viewport } from './carousel-viewport';
export { CarouselItem as Item } from './carousel-item';
export { CarouselPrevious as Previous } from './carousel-previous';
export { CarouselNext as Next } from './carousel-next';
export { CarouselScrollMarkerGroup as ScrollMarkerGroup } from './carousel-scroll-marker-group';
export { CarouselScrollMarker as ScrollMarker } from './carousel-scroll-marker';

export type { CarouselRootProps, CarouselRootRef } from './carousel-root';
export type { CarouselViewportProps, CarouselViewportState } from './carousel-viewport';
export type { CarouselItemProps, CarouselItemState } from './carousel-item';
export type { CarouselPreviousProps, CarouselPreviousState } from './carousel-previous';
export type { CarouselNextProps, CarouselNextState } from './carousel-next';
export type { CarouselScrollMarkerGroupProps, CarouselScrollMarkerGroupState } from './carousel-scroll-marker-group';
export type { CarouselScrollMarkerProps, CarouselScrollMarkerState } from './carousel-scroll-marker';
export type { ChangeSource } from './carousel-context';
