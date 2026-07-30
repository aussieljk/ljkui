import type { PropDef } from '../../helpers';

const validationModes = ['onSubmit', 'onBlur', 'onChange'] as const;

// Props for the `Form` component. Renders a native `<form>` with consolidated error handling.
const formPropDefs = {
  /**
   * Determines when the form should be validated:
   * - `'onSubmit'`: validate on submit, afterwards fields re-validate on change.
   * - `'onBlur'`: validate a field when it loses focus.
   * - `'onChange'`: validate the field on every change to its value.
   *
   * The `validationMode` prop on `<Field.Root>` takes precedence over this.
   * @default 'onSubmit'
   */
  validationMode: { type: 'enum', values: validationModes, default: 'onSubmit' },
} satisfies {
  validationMode: PropDef<(typeof validationModes)[number]>;
};

export { formPropDefs };
