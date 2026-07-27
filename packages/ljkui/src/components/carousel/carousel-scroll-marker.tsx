'use client';

import { mergeProps, useRender } from '@base-ui/react';
import * as React from 'react';

import { useScrollGalleryContext } from './carousel-context';

interface CarouselScrollMarkerState extends Record<string, unknown> {
  active: boolean;
  index: number;
}

const markerStateAttributesMapping = {
  active: (value: unknown) => (value ? { 'data-active': '' } : null),
  index: (value: unknown) => ({ 'data-index': String(value) }),
};

interface CarouselScrollMarkerProps extends useRender.ComponentProps<'button', CarouselScrollMarkerState> {
  /**
   * The index of the item this scroll marker controls.
   */
  index: number;
}

/**
 * Button that scrolls the gallery to the item at `index`, reflecting whether
 * that item is active via `data-active` and `aria-selected`.
 *
 * Rendered as a `role="tab"` with roving tabindex inside the marker group's
 * tablist. No `aria-label` is set — provide one for each marker.
 */
const CarouselScrollMarker = React.forwardRef<HTMLButtonElement, CarouselScrollMarkerProps>(
  function CarouselScrollMarker(props, forwardedRef) {
    const { render, index, ...elementProps } = props;

    const { activeIndex, scrollToItem } = useScrollGalleryContext();

    const isActive = index === activeIndex;

    /**
     * Scroll marker click handler — mirrors native `::scroll-marker` behavior
     * from CSS Overflow 5 §2.
     *
     * Per the spec, clicking a scroll marker:
     * 1. Sets the scroll container's "current scroll target" to the linked
     *    element, making that marker immediately active.
     * 2. Initiates a smooth scroll to bring the target element into view.
     *
     * Delegates to the shared `scrollToItem` which handles target-locking,
     * scroll animation, and immediate active-index update.
     */
    const handleClick = React.useCallback(() => {
      scrollToItem(index);
    }, [index, scrollToItem]);

    const state = React.useMemo<CarouselScrollMarkerState>(() => ({ active: isActive, index }), [isActive, index]);

    // ARIA: role="tab" + aria-selected follows the WAI-ARIA tablist pattern.
    // The marker group uses role="tablist", and each marker is a "tab".
    // Only the active marker has tabIndex=0 (roving tabindex pattern);
    // inactive markers have tabIndex=-1 so arrow keys move between them.
    //
    // We intentionally do NOT set aria-label or aria-roledescription here —
    // this is a headless primitive and we can't assume the consumer's language.
    // Consumers should provide their own aria-label via props.
    return useRender({
      render,
      ref: forwardedRef,
      state,
      stateAttributesMapping: markerStateAttributesMapping,
      props: mergeProps<'button'>(
        {
          className: 'fui-CarouselScrollMarker',
          type: 'button',
          role: 'tab',
          'aria-selected': isActive,
          tabIndex: isActive ? 0 : -1,
          onClick: handleClick,
        } as React.ComponentPropsWithRef<'button'>,
        elementProps as React.ComponentPropsWithRef<'button'>,
      ),
      defaultTagName: 'button',
    });
  },
);

CarouselScrollMarker.displayName = 'CarouselScrollMarker';

export { CarouselScrollMarker };
export type { CarouselScrollMarkerProps, CarouselScrollMarkerState };
