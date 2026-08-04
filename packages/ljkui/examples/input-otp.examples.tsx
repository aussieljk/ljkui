import React from 'react';
import { InputOTP, Typography } from 'ljkui';

// Previously imported from 'input-otp'
const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]+$';

/**
 * Where this component sits in the explorer, and how its fixtures are framed.
 * Read by scripts/gen-fixtures.ts; `group` is the tree section, `layout` is the canvas.
 */
export const fileMeta = { group: 'Controls', layout: 'centered' } as const;

export const examples = {
  Default() {
    const otherArgs = {};
    return (
      <div>
        <InputOTP.Root
          {...otherArgs}
          maxLength={6}
          render={({ slots }) => (
            <>
              <InputOTP.Group>
                {slots.slice(0, 3).map((slot, index) => (
                  <InputOTP.Slot key={index} {...slot} />
                ))}{' '}
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
      </div>
    );
  },

  Pattern() {
    const otherArgs = {};
    return (
      <div>
        <InputOTP.Root
          {...otherArgs}
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          render={({ slots }) => (
            <InputOTP.Group>
              {slots.map((slot, index) => (
                <InputOTP.Slot key={index} {...slot} />
              ))}{' '}
            </InputOTP.Group>
          )}
        />
      </div>
    );
  },

  Separator() {
    const otherArgs = {};
    return (
      <div>
        <InputOTP.Root
          {...otherArgs}
          maxLength={6}
          render={({ slots }) => (
            <InputOTP.Group style={{ gap: 4 }}>
              {slots.map((slot, index) => (
                <React.Fragment key={index}>
                  <InputOTP.Slot style={{ borderRadius: 10 }} {...slot} />
                  {index !== slots.length - 1 && <InputOTP.Separator />}
                </React.Fragment>
              ))}{' '}
            </InputOTP.Group>
          )}
        />
      </div>
    );
  },

  Controlled() {
    const otherArgs = {};
    const [value, setValue] = React.useState('');

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <InputOTP.Root
            {...otherArgs}
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            render={({ slots }) => (
              <InputOTP.Group>
                {slots.map((slot, index) => (
                  <InputOTP.Slot key={index} {...slot} />
                ))}{' '}
              </InputOTP.Group>
            )}
          />
        </div>
        <Typography.Text align="center" color="gray" size="2" render={<div />}>
          {value === '' ? <>Enter your one-time password.</> : <>You entered: {value}</>}
        </Typography.Text>
      </div>
    );
  },
};
