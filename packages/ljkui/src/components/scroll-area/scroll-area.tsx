'use client';

import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import classNames from 'classnames';
import * as React from 'react';

import { scrollAreaPropDefs } from './scroll-area.props';

import { mergeRefs, rootClassName } from '../../helpers';
import type { GetPropDefTypes } from '../../helpers';

type ScrollAreaOwnProps = GetPropDefTypes<typeof scrollAreaPropDefs>;

interface ScrollAreaProps
  extends
    Omit<React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>, 'className' | 'style' | 'ref'>,
    ScrollAreaOwnProps {
  /** The content to scroll. */
  children?: React.ReactNode;
  /** Class applied to the root element (not the viewport). */
  className?: string;
  /** Styles applied to the root element (not the viewport). */
  style?: React.CSSProperties;
  /** Ref to the scrollable viewport element — use it for programmatic scrolling. */
  ref?: React.Ref<HTMLDivElement>;
}

const viewportOverflowStyle = {
  both: 'scroll',
  vertical: 'hidden scroll',
  horizontal: 'scroll hidden',
} as const;

/**
 * A scrollable container with themed overlay scrollbars, built on the Base UI
 * ScrollArea primitive.
 *
 * Unlike the primitive, the viewport is not forced into the tab order — modern
 * browsers make it keyboard-focusable automatically only when it has no
 * focusable children.
 *
 * @example
 * <ScrollArea scrollbars="vertical" type="always" style={{ height: 200 }}>
 *   <Text>Long content…</Text>
 * </ScrollArea>
 */
function ScrollArea(props: ScrollAreaProps) {
  const {
    className,
    style,
    children,
    ref,
    size = scrollAreaPropDefs.size.default,
    scrollbars = scrollAreaPropDefs.scrollbars.default,
    type = scrollAreaPropDefs.type.default,
    fadeEdges = scrollAreaPropDefs.fadeEdges.default,
    ...rootProps
  } = props;

  // Normalize `fadeEdges` to which axis (if any) should render fade masks.
  const fadeAxis = fadeEdges === true ? 'vertical' : fadeEdges === false ? undefined : fadeEdges;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  // Merge our internal viewport ref with the forwarded one.
  const mergedViewportRef = React.useMemo(() => mergeRefs(viewportRef, ref), [ref]);

  React.useEffect(() => {
    if (!fadeAxis) return;
    if (typeof window === 'undefined') return;

    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root) return;

    const update = () => {
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = viewport;
      const setFlag = (name: string, on: boolean) => {
        if (on) root.setAttribute(name, '');
        else root.removeAttribute(name);
      };
      // Allow a 1px tolerance for sub-pixel rounding.
      setFlag('data-can-scroll-up', scrollTop > 1);
      setFlag('data-can-scroll-down', scrollTop + clientHeight < scrollHeight - 1);
      setFlag('data-can-scroll-left', scrollLeft > 1);
      setFlag('data-can-scroll-right', scrollLeft + clientWidth < scrollWidth - 1);
    };

    update();
    viewport.addEventListener('scroll', update, { passive: true });

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update);
      observer.observe(viewport);
      const content = viewport.firstElementChild;
      if (content) observer.observe(content);
    }

    return () => {
      viewport.removeEventListener('scroll', update);
      observer?.disconnect();
      root.removeAttribute('data-can-scroll-up');
      root.removeAttribute('data-can-scroll-down');
      root.removeAttribute('data-can-scroll-left');
      root.removeAttribute('data-can-scroll-right');
    };
  }, [fadeAxis]);

  return (
    <ScrollAreaPrimitive.Root
      {...rootProps}
      ref={rootRef}
      className={classNames('fui-ScrollAreaRoot', className)}
      style={style}
      data-fade-edges={fadeAxis}
    >
      <ScrollAreaPrimitive.Viewport
        ref={mergedViewportRef}
        className="fui-ScrollAreaViewport"
        style={{ overflow: viewportOverflowStyle[scrollbars] }}
        // Base UI sets tabIndex={0} on the viewport, but we override it to restore default
        // browser behavior. Modern browsers (Chrome 130+) automatically make scrollable
        // containers focusable only when they have no focusable children. When focusable
        // children exist, Tab navigates directly to them instead of the scroll container.
        // Base UI's explicit tabIndex={0} forces the container into the tab order even
        // when it has focusable children, which is not ideal UX.
        // See: https://developer.chrome.com/blog/keyboard-focusable-scrollers
        tabIndex={undefined}
      >
        <ScrollAreaPrimitive.Content style={scrollbars === 'vertical' ? { minWidth: 0, width: '100%' } : undefined}>
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>

      {scrollbars !== 'vertical' && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          className={rootClassName('fui-ScrollAreaScrollbar', undefined, { size })}
          data-type={type}
        >
          <ScrollAreaPrimitive.Thumb className="fui-ScrollAreaThumb" />
        </ScrollAreaPrimitive.Scrollbar>
      )}

      {scrollbars !== 'horizontal' && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className={rootClassName('fui-ScrollAreaScrollbar', undefined, { size })}
          data-type={type}
        >
          <ScrollAreaPrimitive.Thumb className="fui-ScrollAreaThumb" />
        </ScrollAreaPrimitive.Scrollbar>
      )}

      {scrollbars === 'both' && <ScrollAreaPrimitive.Corner className="fui-ScrollAreaCorner" />}
    </ScrollAreaPrimitive.Root>
  );
}

export { ScrollArea };
export type { ScrollAreaProps };
