import type * as React from 'react';

/**
 * Combine several refs — callback or object, possibly undefined — into one ref callback, so a
 * component can both forward a caller's ref and keep its own internal ref on the same node.
 *
 * @example
 * const localRef = React.useRef<HTMLUListElement>(null);
 * return <ul ref={mergeRefs(forwardedRef, localRef)} />;
 */
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value);
      else if (ref != null) (ref as React.MutableRefObject<T | null>).current = value;
    }
  };
}

export { mergeRefs };
