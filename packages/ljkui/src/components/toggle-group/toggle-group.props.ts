import type { PropDef } from '../../helpers';

// Props for the primary part, `ToggleGroup.Root` (a Base UI Tabs.Root). Selection is a string value
// matching each `Trigger`/`Content` pair.
const toggleGroupRootPropDefs = {
  /** The value of the selected segment (controlled). Pair with `onValueChange`. */
  value: { type: 'string', default: undefined },
  /** The value of the initially selected segment (uncontrolled). */
  defaultValue: { type: 'string', default: undefined },
} satisfies {
  value: PropDef<string>;
  defaultValue: PropDef<string>;
};

export { toggleGroupRootPropDefs };
