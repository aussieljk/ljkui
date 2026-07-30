import type { PropDef } from '../../helpers';

// Props for the primary part, `Command.Root`. The `filter` and `onValueChange` callbacks are
// documented in the source JSDoc; only the value prop is a plain data prop.
const commandRootPropDefs = {
  /** The search text, when controlling the filter yourself. Pair with `onValueChange`. */
  value: { type: 'string', default: undefined },
} satisfies {
  value: PropDef<string>;
};

const commandItemPropDefs = {
  /** The text matched against the search. Defaults to the item's text content. */
  value: { type: 'string', default: undefined },
  /**
   * Whether the item can be selected.
   * @default false
   */
  disabled: { type: 'boolean', default: false },
} satisfies {
  value: PropDef<string>;
  disabled: PropDef<boolean>;
};

const commandGroupPropDefs = {
  /** The label shown above the group. */
  heading: { type: 'ReactNode', default: undefined },
} satisfies {
  heading: PropDef;
};

export { commandGroupPropDefs, commandItemPropDefs, commandRootPropDefs };
