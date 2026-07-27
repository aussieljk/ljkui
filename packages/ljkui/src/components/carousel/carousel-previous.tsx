'use client';

import { mergeProps, useRender } from '@base-ui/react';
import * as React from 'react';

import { useScrollButton } from './use-scroll-button';

interface CarouselPreviousState extends Record<string, unknown> {
  disabled: boolean;
}

interface CarouselPreviousProps extends useRender.ComponentProps<'button', CarouselPreviousState> {
  /**
   * How many items to scroll by. When set to a number, the button scrolls
   * to bring the item N positions before the current active item into view.
   * When omitted, scrolls by ~85% of the viewport ("one page") per the
   * CSS Overflow 5 §3.2 spec.
   */
  step?: number;
}

/**
 * Button that scrolls the gallery backward — by ~one page, or by `step` items.
 * Automatically disabled at the start of the scroll range unless the Root has
 * `loop`, in which case it wraps around to the last item.
 */
const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  function CarouselPrevious(props, forwardedRef) {
    const { render, step, ...elementProps } = props;

    const { disabled, handleClick } = useScrollButton({ direction: 'previous', step });

    const state = React.useMemo<CarouselPreviousState>(() => ({ disabled }), [disabled]);

    return useRender({
      render,
      ref: forwardedRef,
      state,
      props: mergeProps<'button'>(
        {
          className: 'fui-CarouselPrevious',
          type: 'button',
          disabled,
          onClick: handleClick,
          ...(disabled ? { 'data-disabled': '' } : undefined),
        } as React.ComponentPropsWithRef<'button'>,
        elementProps as React.ComponentPropsWithRef<'button'>,
      ),
      defaultTagName: 'button',
    });
  },
);

CarouselPrevious.displayName = 'CarouselPrevious';

export { CarouselPrevious };
export type { CarouselPreviousProps, CarouselPreviousState };
