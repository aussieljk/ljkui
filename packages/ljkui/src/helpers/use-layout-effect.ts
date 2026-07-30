import * as React from 'react';

/**
 * SSR-safe `useLayoutEffect`. On the server React warns when `useLayoutEffect` is called (neither it
 * nor `useEffect` run there), so we fall back to a noop when there is no DOM. On the client this is
 * exactly `React.useLayoutEffect`.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
const useLayoutEffect = globalThis?.document ? React.useLayoutEffect : () => {};

/** Alias kept for call sites that prefer the "isomorphic" name. Identical behaviour. */
const useIsomorphicLayoutEffect = useLayoutEffect;

export { useLayoutEffect, useIsomorphicLayoutEffect };
