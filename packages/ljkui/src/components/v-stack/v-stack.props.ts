import type { PropDef } from '../../helpers';

const alignments = ['leading', 'center', 'trailing'] as const;

const vStackPropDefs = {
  /**
   * Horizontal alignment of children within the stack, using SwiftUI-style values
   * (leading/trailing resolve against the writing direction).
   * @default 'center'
   */
  alignment: { type: 'enum', values: alignments, default: 'center' },
} satisfies {
  alignment: PropDef<(typeof alignments)[number]>;
};

export { vStackPropDefs };
