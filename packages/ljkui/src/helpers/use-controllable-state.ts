import * as React from 'react';

import { useCallbackRef } from './use-callback-ref';

interface UseControllableStateParams<T> {
  /** The controlled value. When not `undefined`, the hook is in controlled mode and never stores state. */
  prop?: T | undefined;
  /** The initial value for uncontrolled mode. */
  defaultProp?: T | undefined;
  /** Called whenever the value changes, with the next value — in both controlled and uncontrolled mode. */
  onChange?: ((value: T) => void) | undefined;
}

/**
 * A single implementation of the controlled/uncontrolled pattern React components re-derive by hand:
 * a value is *controlled* when its `prop` is passed (`!== undefined`), otherwise the hook owns the
 * state seeded from `defaultProp`. `onChange` fires on every update regardless of mode; internal
 * state is only written when uncontrolled. The returned setter accepts a value or an updater
 * function, mirroring `useState`.
 *
 * @example
 * const [selected, setSelected] = useControllableState({
 *   prop: selectedId,
 *   defaultProp: defaultSelectedId ?? null,
 *   onChange: onSelect,
 * });
 */
function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>): [T | undefined, (next: React.SetStateAction<T>) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolled;
  const handleChange = useCallbackRef(onChange);

  const setValue = React.useCallback(
    (next: React.SetStateAction<T>) => {
      const resolved =
        typeof next === 'function' ? (next as (prev: T | undefined) => T)(isControlled ? prop : uncontrolled) : next;
      if (!isControlled) setUncontrolled(resolved);
      if (resolved !== value) handleChange?.(resolved);
    },
    [isControlled, prop, uncontrolled, value, handleChange],
  );

  return [value, setValue];
}

export { useControllableState };
export type { UseControllableStateParams };
