import type { PropDef } from '../../helpers';

const sizes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const kbdPropDefs = {
  /**
   * Sets the key cap size on the theme's typographic scale.
   * When unset, the Kbd scales relative to the surrounding text.
   */
  size: { type: 'enum', values: sizes, default: undefined },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export { kbdPropDefs };
