// Props for the `Chart` component. `data` is the only design-system prop — an array of segments
// (`{ label, value, color }`), each rendered as a proportional bar segment.
const chartPropDefs = {
  /**
   * Segments to render, in order. Each segment's width is its `value` as a percentage of the sum of
   * all segment values. Every segment has a `label`, a numeric `value`, and a theme accent `color`.
   */
  data: { type: 'ChartData[]', required: true },
} as const;

export { chartPropDefs };
