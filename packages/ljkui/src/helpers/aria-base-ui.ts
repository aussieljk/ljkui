import type * as React from 'react';

/** Widen every `on*` handler in `T` to a plain React handler, leaving all other props unchanged. */
type WidenHandlers<T> = {
  [K in keyof T]: K extends `on${string}` ? React.ReactEventHandler : T[K];
};

/**
 * Bridge a react-aria / react-stately button-props bundle onto a Base UI button.
 *
 * react-aria types its handlers for its own event (which carries `continuePropagation`); Base UI
 * types its handlers for `BaseUIEvent`. Neither is assignable to the other, so spreading react-aria
 * button props onto a Base UI component fails to typecheck. The handlers are runtime-compatible —
 * Base UI passes a richer event that satisfies a plain React handler — so this widens just the
 * handler types while keeping every structural prop (`id`, `aria-*`, `disabled`, …) fully checked.
 * That's the point over an `@ts-expect-error` on the spread, which would also hide real mistakes.
 *
 * @example
 * <IconButton {...baseUIButtonProps(otherButtonProps)} onClick={pressToClick(onPress)} />
 */
function baseUIButtonProps<T extends object>(props: T): WidenHandlers<T> {
  return props as WidenHandlers<T>;
}

/** Widen a react-aria `onPress` handler to a DOM `onClick` for a Base UI button (see above). */
function pressToClick(onPress: ((event: never) => void) | undefined): React.MouseEventHandler | undefined {
  return onPress as unknown as React.MouseEventHandler | undefined;
}

export { baseUIButtonProps, pressToClick };
