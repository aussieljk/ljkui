import * as React from 'react';

type ExampleValue = React.ReactNode | (() => React.ReactNode);

/**
 * Examples are authored either as a component (`Size() { return <…/> }`) or as a bare
 * element, so both forms have to render. Components are rendered as elements rather
 * than called, so they keep their own hook state — several examples are stateful.
 */
export function render(example: ExampleValue): React.ReactNode {
  if (typeof example === 'function') {
    const Example = example as React.ComponentType;
    return <Example />;
  }
  return example;
}
