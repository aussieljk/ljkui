import React from 'react';
import { InputOTP } from 'ljkui';

export default function InputOTPDemo() {
  return (
    <InputOTP.Root
      maxLength={6}
      render={({ slots }) => (
        <>
          <InputOTP.Group>
            {slots.slice(0, 3).map((slot, index) => (
              <InputOTP.Slot key={index} {...slot} />
            ))}
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            {slots.slice(3).map((slot, index) => (
              <InputOTP.Slot key={index} {...slot} />
            ))}
          </InputOTP.Group>
        </>
      )}
    />
  );
}
