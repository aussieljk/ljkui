import LayoutOverview from './demos/layout.demo';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Layout', layout: 'padded' } as const;

/*
 * `layout` is not a component — it is the composition the Layout guide points `<Demo>` at,
 * showing the stack primitives working together. It had no examples module because it was
 * demo-only; folding demos into examples is what gave it one.
 */
export const examples = {
  /** The canonical usage — was `demos/layout.demo.tsx` before demos folded into examples. */
  Overview: LayoutOverview,
};
