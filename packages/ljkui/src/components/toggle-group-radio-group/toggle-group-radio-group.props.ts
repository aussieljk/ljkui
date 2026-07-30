import type { PropDef } from '../../helpers';

// Props for the primary part, `ToggleGroupRadioGroup.Root` (a Base UI RadioGroup). Behaves as a
// single form value chooser, so the selected value participates in forms.
const toggleGroupRadioGroupRootPropDefs = {
  /** The value of the selected item (controlled). Pair with `onValueChange`. */
  value: { type: 'string', default: undefined },
  /** The value of the initially selected item (uncontrolled). */
  defaultValue: { type: 'string', default: undefined },
  /**
   * Whether the group should ignore user interaction.
   * @default false
   */
  disabled: { type: 'boolean', default: false },
} satisfies {
  value: PropDef<string>;
  defaultValue: PropDef<string>;
  disabled: PropDef<boolean>;
};

const toggleGroupRadioGroupItemPropDefs = {
  /** The unique value of this item, compared against the group's selected value. */
  value: { type: 'string', required: true },
  /**
   * Whether this item should ignore user interaction.
   * @default false
   */
  disabled: { type: 'boolean', default: false },
} satisfies {
  value: PropDef<string>;
  disabled: PropDef<boolean>;
};

export { toggleGroupRadioGroupItemPropDefs, toggleGroupRadioGroupRootPropDefs };
