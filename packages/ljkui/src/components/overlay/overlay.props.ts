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

const overlayPropDefs = {
  /**
   * Where `Overlay.Content` is positioned over the base content, using SwiftUI-style alignment
   * (leading/trailing resolve against the writing direction).
   * @default 'center'
   */
  alignment: { type: 'enum', values: alignments, default: 'center' },
} satisfies {
  alignment: PropDef<(typeof alignments)[number]>;
};

export { overlayPropDefs };
