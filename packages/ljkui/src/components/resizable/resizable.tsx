'use client';

import classNames from 'classnames';
import * as React from 'react';

type Direction = 'horizontal' | 'vertical';

type ResizableContextValue = {
  direction: Direction;
  registerPanel: (defaultSize: number, minSize: number) => number;
  getSize: (index: number) => number;
  startDrag: (handleIndex: number, event: React.PointerEvent) => void;
  resizeBy: (handleIndex: number, deltaPercent: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const ResizableContext = React.createContext<ResizableContextValue | null>(null);

function useResizable(part: string) {
  const context = React.useContext(ResizableContext);
  if (!context) throw new Error(`Resizable.${part} must be rendered inside Resizable.Root`);
  return context;
}

interface ResizableRootProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The axis the panels are laid out along.
   * @default 'horizontal'
   */
  direction?: Direction;
  /** Called with every panel's size, as percentages, while dragging. */
  onLayout?: (sizes: number[]) => void;
}

/**
 * A group of panels the reader can resize by dragging the handles between them.
 *
 * Sizes are percentages of the group and always total 100, so the layout survives the container
 * changing width.
 *
 * @example
 * ```tsx
 * <Resizable.Root direction="horizontal">
 *   <Resizable.Panel defaultSize={30}>Sidebar</Resizable.Panel>
 *   <Resizable.Handle />
 *   <Resizable.Panel>Editor</Resizable.Panel>
 * </Resizable.Root>
 * ```
 */
const ResizableRoot = (props: ResizableRootProps) => {
  const { className, direction = 'horizontal', onLayout, children, ...rootProps } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  // null until the first drag — sizes are derived from the declared defaults up to that point, so a
  // panel added or removed between renders is picked up without an effect.
  const [sizes, setSizes] = React.useState<number[] | null>(null);
  const specs = React.useRef<Array<{ defaultSize: number; minSize: number }>>([]);
  const nextIndex = React.useRef(0);

  // Panels register during render; reset the counter each pass so indices stay stable.
  nextIndex.current = 0;

  const registerPanel = React.useCallback((defaultSize: number, minSize: number) => {
    const index = nextIndex.current++;
    specs.current[index] = { defaultSize, minSize };
    return index;
  }, []);

  /** The declared sizes normalised to total 100%. */
  const declaredSizes = React.useCallback(() => {
    const declared = specs.current.slice(0, nextIndex.current);
    const total = declared.reduce((sum, spec) => sum + spec.defaultSize, 0) || 1;
    return declared.map((spec) => (spec.defaultSize / total) * 100);
  }, []);

  const getSize = (index: number) => (sizes ?? declaredSizes())[index] ?? 0;

  const startDrag = React.useCallback(
    (handleIndex: number, event: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      event.preventDefault();
      (event.target as Element).setPointerCapture?.(event.pointerId);

      const isHorizontal = direction === 'horizontal';
      const rect = container.getBoundingClientRect();
      const total = isHorizontal ? rect.width : rect.height;
      const start = isHorizontal ? event.clientX : event.clientY;
      const startSizes = sizes ?? declaredSizes();

      const onPointerMove = (moveEvent: PointerEvent) => {
        const current = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
        const deltaPercent = ((current - start) / total) * 100;

        const before = handleIndex;
        const after = handleIndex + 1;
        const minBefore = specs.current[before]?.minSize ?? 0;
        const minAfter = specs.current[after]?.minSize ?? 0;

        // Clamp so neither neighbour is pushed below its minimum.
        const clamped = Math.max(minBefore - startSizes[before], Math.min(startSizes[after] - minAfter, deltaPercent));

        const next = [...startSizes];
        next[before] = startSizes[before] + clamped;
        next[after] = startSizes[after] - clamped;
        setSizes(next);
        onLayout?.(next);
      };

      const onPointerUp = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    },
    [direction, sizes, declaredSizes, onLayout],
  );

  /** Shift the boundary at `handleIndex` by a percentage, clamped to both neighbours' minimums. */
  const resizeBy = React.useCallback(
    (handleIndex: number, deltaPercent: number) => {
      const current = sizes ?? declaredSizes();
      const before = handleIndex;
      const after = handleIndex + 1;
      if (current[before] === undefined || current[after] === undefined) return;

      const minBefore = specs.current[before]?.minSize ?? 0;
      const minAfter = specs.current[after]?.minSize ?? 0;
      const clamped = Math.max(minBefore - current[before], Math.min(current[after] - minAfter, deltaPercent));

      const next = [...current];
      next[before] = current[before] + clamped;
      next[after] = current[after] - clamped;
      setSizes(next);
      onLayout?.(next);
    },
    [sizes, declaredSizes, onLayout],
  );

  const context: ResizableContextValue = { direction, registerPanel, getSize, startDrag, resizeBy, containerRef };

  return (
    <ResizableContext.Provider value={context}>
      <div
        data-direction={direction}
        {...rootProps}
        ref={containerRef}
        className={classNames('fui-ResizableRoot', className)}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
};
ResizableRoot.displayName = 'ResizableRoot';

interface ResizablePanelProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The panel's starting size, relative to its siblings. Normalised so the group totals 100.
   * @default 50
   */
  defaultSize?: number;
  /**
   * The smallest size, as a percentage of the group, the panel can be dragged to.
   * @default 10
   */
  minSize?: number;
}

/** One region of the group. */
const ResizablePanel = (props: ResizablePanelProps) => {
  const { className, defaultSize = 50, minSize = 10, style, ...panelProps } = props;
  const { registerPanel, getSize } = useResizable('Panel');
  const index = registerPanel(defaultSize, minSize);
  return (
    <div
      {...panelProps}
      style={{ ...style, flexBasis: `${getSize(index)}%` }}
      className={classNames('fui-ResizablePanel', className)}
    />
  );
};
ResizablePanel.displayName = 'ResizablePanel';

interface ResizableHandleProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Shows a grip so the handle is discoverable without hovering. */
  withHandle?: boolean;
}

/**
 * The draggable divider between two panels.
 *
 * Focusable, and movable from the keyboard with the arrow keys — hold Shift for larger steps.
 */
const ResizableHandle = (props: ResizableHandleProps) => {
  const { className, withHandle, ...handleProps } = props;
  const { direction, startDrag, resizeBy } = useResizable('Handle');
  const ref = React.useRef<HTMLDivElement>(null);

  // The handle's index is its position among its siblings, halved: panel, handle, panel, handle…
  const handleIndex = () => {
    const node = ref.current;
    if (!node?.parentElement) return 0;
    return Math.floor(Array.from(node.parentElement.children).indexOf(node) / 2);
  };

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
      data-direction={direction}
      {...handleProps}
      ref={ref}
      onPointerDown={(event) => {
        handleProps.onPointerDown?.(event);
        startDrag(handleIndex(), event);
      }}
      onKeyDown={(event) => {
        handleProps.onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const decrease = direction === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
        const increase = direction === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
        const step = event.shiftKey ? 10 : 2;
        if (event.key === decrease) {
          event.preventDefault();
          resizeBy(handleIndex(), -step);
        } else if (event.key === increase) {
          event.preventDefault();
          resizeBy(handleIndex(), step);
        }
      }}
      className={classNames('fui-ResizableHandle', className)}
    >
      {withHandle && <div className="fui-ResizableHandleGrip" />}
    </div>
  );
};
ResizableHandle.displayName = 'ResizableHandle';

export { ResizableHandle as Handle, ResizablePanel as Panel, ResizableRoot as Root };
export type { ResizableHandleProps as HandleProps, ResizablePanelProps as PanelProps, ResizableRootProps as RootProps };
