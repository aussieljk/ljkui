import type { PropDef } from '../../helpers';

const tooltipPropDefs = {
  /** The content displayed inside the tooltip popup. */
  content: { type: 'ReactNode', default: undefined, required: true },
} satisfies {
  content: PropDef<React.ReactNode>;
};

export { tooltipPropDefs };
