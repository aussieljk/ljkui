import FieldsetOverview from './demos/fieldset.demo';
import { Field, Fieldset, Input } from 'ljkui';
import * as React from 'react';

function FieldsetFixture() {
  return (
    <Fieldset.Root style={{ width: 320 }}>
      <Fieldset.Legend>Billing Details</Fieldset.Legend>

      <Field.Root name="company">
        <Field.Label>Company</Field.Label>
        <Input.Root>
          <Input.Control placeholder="Acme Inc." />
        </Input.Root>
      </Field.Root>

      <Field.Root name="taxId">
        <Field.Label>Tax ID</Field.Label>
        <Input.Root>
          <Input.Control placeholder="XX-XXXXXXX" />
        </Input.Root>
        <Field.Description>Your company's tax identification number</Field.Description>
      </Field.Root>
    </Fieldset.Root>
  );
}

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Forms', layout: 'padded' } as const;

export const examples = { Overview: FieldsetOverview, Example: FieldsetFixture };
