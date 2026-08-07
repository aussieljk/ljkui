---
name: forms
description: >
  Build forms with ljkui: the Field.Root / Field.Label / Field.Error wrapper, the value and change-callback contract each input type uses, native constraint validation, controlled vs uncontrolled inputs, and binding a form library such as TanStack Form. Load when writing any form, adding validation or error messages, or wiring ljkui inputs to form state.
metadata:
  type: framework
  library: ljkui
  library_version: '0.0.1'
  framework: react
requires:
  - getting-started
  - components
sources:
  - 'aussieljk/ljkui:packages/ljkui/guides/forms.mdx'
  - 'aussieljk/ljkui:packages/ljkui/examples/field.examples.tsx'
---

ljkui inputs are styled wrappers over native controls. The library owns the look, you
own the state. It ships no form library — bring your own, or use none.

## The shape of a field

Wrap every input in `Field.Root`. The wrapper owns the label, the helper text and the
error, and wires up the accessibility attributes.

```tsx
import { Field, Input } from 'ljkui';

<Field.Root name="username">
  <Field.Label>Username</Field.Label>
  <Field.Description>At least 3 characters</Field.Description>
  <Input.Root>
    <Input.Control placeholder="johndoe" required minLength={3} />
  </Input.Root>
  <Field.Error match="valueMissing">Username is required</Field.Error>
  <Field.Error match="tooShort">Username must be at least 3 characters</Field.Error>
</Field.Root>;
```

A text input is always two parts: `Input.Root` wraps, `Input.Control` is the real
`<input>` and takes every native prop.

## Which props an input takes

| | Text inputs | Checkbox, Switch | Select, RadioGroup |
| --- | --- | --- | --- |
| Controlled value | `value` | `checked` | `value` |
| Uncontrolled default | `defaultValue` | `defaultChecked` | `defaultValue` |
| Change callback | native `onChange` | `onCheckedChange` | `onValueChange` |
| Submit key | `name` | `name` | `name` |

`Input.Control` forwards native DOM props, so `value` + `onChange(event)` behave exactly
like a plain `<input>`. The higher-level controls give you the value directly:
`onValueChange(value)`, `onCheckedChange(checked)`.

## Errors

Validation state lives on the wrapper, never on the input.

- `<Field.Error match="valueMissing">` — shows when that native validity state is set.
  Other matches: `typeMismatch`, `tooShort`, `tooLong`, `patternMismatch`, `rangeUnderflow`,
  `rangeOverflow`.
- `<Field.Error match={true}>` — always shows while the field is invalid. Use this for a
  message string that came from a form library or the server.
- `<Field.Root invalid>` — marks the field invalid from outside. This is the escape hatch
  when you are not using native validation.

## Uncontrolled first

Uncontrolled is the default and the least code. Native `required` / `minLength` /
`pattern` plus `Field.Error` covers most forms with no state at all. Wrap in `<Form>`
and `onFormSubmit` hands you a plain object of values.

```tsx
<Form onFormSubmit={(values) => save(values)}>
  <Field.Root name="name">
    <Field.Label>Name</Field.Label>
    <Input.Root>
      <Input.Control placeholder="Jane Smith" />
    </Input.Root>
  </Field.Root>
  <Button type="submit">Submit</Button>
</Form>
```

Reach for controlled state only when the value drives other UI — conditional fields,
live previews, auto-save — or when a form library owns it.

## With a form library

Any library binds, because the contract is only value + change callback + `invalid`.
TanStack Form:

```tsx
<form.Field name="username">
  {(field) => (
    <Field.Root name={field.name} invalid={field.state.meta.errors.length > 0}>
      <Field.Label>Username</Field.Label>
      <Input.Root>
        <Input.Control
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </Input.Root>
      {field.state.meta.errors.length > 0 && (
        <Field.Error match={true}>{field.state.meta.errors[0]}</Field.Error>
      )}
    </Field.Root>
  )}
</form.Field>
```

The same three lines work for react-hook-form or Formik — only the source of
`value` / `onChange` / `errors` changes.

## Mistakes that cost time

- Putting `invalid` or an error message on the input. Both belong on `Field.Root`.
- Using `<Input>` on its own. It is `Input.Root` + `Input.Control`.
- Expecting `onChange(value)` from `Input.Control`. It is a native event —
  `e.target.value`. Only the higher-level controls pass the value directly.
- Adding controlled state for a form that just submits. Use `<Form onFormSubmit>`.
