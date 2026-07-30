import type { PropDef } from '../../helpers';

// Props for the primary part, `Field.Root` (Base UI Field.Root).
const fieldRootPropDefs = {
  /**
   * Identifies the field when a form is submitted. Takes precedence over the `name` prop on
   * `Field.Control`.
   */
  name: { type: 'string', default: undefined },
  /**
   * Whether the field should ignore user interaction. Takes precedence over the `disabled` prop on
   * `Field.Control`.
   * @default false
   */
  disabled: { type: 'boolean', default: false },
  /** Whether the field is invalid. Useful when the field state is controlled by an external library. */
  invalid: { type: 'boolean', default: undefined },
} satisfies {
  name: PropDef<string>;
  disabled: PropDef<boolean>;
  invalid: PropDef<boolean>;
};

export { fieldRootPropDefs };
