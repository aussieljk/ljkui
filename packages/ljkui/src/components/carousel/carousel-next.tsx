'use client';

import { mergeProps, useRender } from '@base-ui/react';
import * as React from 'react';

import { useScrollButton } from './use-scroll-button';

interface CarouselNextState extends Record<string, unknown> {
  disabled: boolean;
}

interface CarouselNextProps extends useRender.ComponentProps<'button', CarouselNextState> {
  /**
   * How many items to scroll by. When set to a number, the button scrolls
   * to bring the item N positions after the current active item into view.
   * When omitted, scrolls by ~85% of the viewport ("one page") per the
   * CSS Overflow 5 §3.2 spec.
   */
  step?: number;
}

/**
 * Button that scrolls the gallery forward — by ~one page, or by `step` items.
 * Automatically disabled at the end of the scroll range unless the Root has
 * `loop`, in which case it wraps back to the first item.
 */
const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(function CarouselNext(props, forwardedRef) {
  const { render, step, ...elementProps } = props;

  const { disabled, handleClick } = useScrollButton({ direction: 'next', step });

  const state = React.useMemo<CarouselNextState>(() => ({ disabled }), [disabled]);

  return useRender({
    render,
    ref: forwardedRef,
    state,
    props: mergeProps<'button'>(
      {
        className: 'fui-CarouselNext',
        type: 'button',
        disabled,
        onClick: handleClick,
        ...(disabled ? { 'data-disabled': '' } : undefined),
      } as React.ComponentPropsWithRef<'button'>,
      elementProps as React.ComponentPropsWithRef<'button'>,
    ),
    defaultTagName: 'button',
  });
});

CarouselNext.displayName = 'CarouselNext';

export { CarouselNext };
export type { CarouselNextProps, CarouselNextState };
