import type { PropDef } from '../../helpers';

/**
 * The outcome a `Result` communicates. Each status maps to a semantic accent color
 * (`success`→green, `error`→red/danger, `warning`→amber, `info`→blue) and a default icon.
 */
const resultStatuses = ['success', 'error', 'warning', 'info'] as const;
type ResultStatus = (typeof resultStatuses)[number];

const resultRootPropDefs = {
  /**
   * The outcome being communicated, which sets the media color and default icon.
   * @default 'info'
   */
  status: { type: 'enum', values: resultStatuses, default: 'info' },
} satisfies {
  status: PropDef<ResultStatus>;
};

export { resultRootPropDefs, resultStatuses };
export type { ResultStatus };
