import React from 'react';
import { Field, Input } from 'ljkui';

export default function FieldDemo() {
  return (
    <div className="w-75">
      <Field.Root name="username">
        <Field.Label>Username</Field.Label>
        <Field.Description>Must be at least 3 characters</Field.Description>
        <Input.Root>
          <Input.Control placeholder="johndoe" required minLength={3} />
        </Input.Root>
        <Field.Error match="valueMissing">Username is required</Field.Error>
        <Field.Error match="tooShort">Username must be at least 3 characters</Field.Error>
      </Field.Root>
    </div>
  );
}
