import type { PropDef } from '../../helpers';

const alignments = [
  'center',
  'leading',
  'trailing',
  'top',
  'bottom',
  'topLeading',
  'topTrailing',
  'bottomLeading',
  'bottomTrailing',
  'centerFirstTextBaseline',
  'centerLastTextBaseline',
  'leadingFirstTextBaseline',
  'leadingLastTextBaseline',
  'trailingFirstTextBaseline',
  'trailingLastTextBaseline',
] as const;

const zStackPropDefs = {
  /**
   * Two-dimensional alignment of children within the stack, using SwiftUI-style values
   * (leading/trailing resolve against the writing direction).
   * @default 'center'
   */
  alignment: { type: 'enum', values: alignments, default: 'center' },
} satisfies {
  alignment: PropDef<(typeof alignments)[number]>;
};

export { zStackPropDefs };
