import type { PropDef } from '../../helpers';

const faces = ['front', 'back'] as const;

// Props for the primary part, `CreditCard.Root`.
const creditCardRootPropDefs = {
  /** The active face in controlled mode. Pair with `onFaceChange` to keep state in sync. */
  face: { type: 'enum', values: faces },
  /**
   * The initial face in uncontrolled mode.
   * @default 'front'
   */
  defaultFace: { type: 'enum', values: faces, default: 'front' },
} satisfies {
  face: PropDef<(typeof faces)[number]>;
  defaultFace: PropDef<(typeof faces)[number]>;
};

export { creditCardRootPropDefs };
