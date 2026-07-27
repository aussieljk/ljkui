'use client';

import { mergeProps, useRender } from '@base-ui/react';
import * as React from 'react';

import { useScrollGalleryContext } from './carousel-context';

interface CarouselItemState extends Record<string, unknown> {
  active: boolean;
  index: number;
}

interface CarouselItemProps extends useRender.ComponentProps<'div', CarouselItemState> {}

const itemStateAttributesMapping = {
  active: (value: unknown) => (value ? { 'data-active': '' } : null),
  index: (value: unknown) => ({ 'data-index': String(value) }),
};

/**
 * Individual gallery item. Self-registers with the Root context on mount.
 *
 * Deliberately does NOT set `role="group"` or `aria-roledescription="slide"`.
 * The CSS Overflow 5 spec treats scroll items as plain elements — they have
 * no special semantic role. Consumers can add ARIA attributes via props if
 * their specific use case requires it.
 *
 * Provides `data-active` and `data-in-view` attributes for consumer styling.
 * The `data-in-view` attribute is managed by the Viewport's IntersectionObserver.
 */
const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(props, forwardedRef) {
  const { render, ...elementProps } = props;

  const { activeIndex, registerItem, getItemElements, itemsVersion } = useScrollGalleryContext();

  const internalRef = React.useRef<HTMLDivElement | null>(null);

  const mergedRefCallback = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  React.useLayoutEffect(() => {
    const element = internalRef.current;
    if (!element) return;
    return registerItem(element);
  }, [registerItem]);

  const index = React.useMemo(() => {
    const element = internalRef.current;
    if (!element) return -1;
    return getItemElements().indexOf(element);
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- itemsVersion invalidates when items are added/removed
  }, [getItemElements, itemsVersion]);

  const isActive = index === activeIndex;

  const state = React.useMemo<CarouselItemState>(() => ({ active: isActive, index }), [isActive, index]);

  return useRender({
    render,
    ref: mergedRefCallback,
    state,
    stateAttributesMapping: itemStateAttributesMapping,
    props: mergeProps<'div'>(
      {
        className: 'fui-CarouselItem',
      } as React.ComponentPropsWithRef<'div'>,
      elementProps as React.ComponentPropsWithRef<'div'>,
    ),
    defaultTagName: 'div',
  });
});

CarouselItem.displayName = 'CarouselItem';

export { CarouselItem };
export type { CarouselItemProps, CarouselItemState };
