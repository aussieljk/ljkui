import { Button } from '@base-ui/react/button';
import * as React from 'react';

import { baseButtonPropDefs } from './base-button.props';

import { rootClassName } from '../../helpers';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { mapButtonSizeToSpinnerSize } from '../../helpers/map-prop-values';
import { Spinner } from '../spinner';
import { VisuallyHidden } from '../visually-hidden';

type BaseButtonOwnProps = GetPropDefTypes<typeof baseButtonPropDefs>;
type BaseButtonProps = Omit<PropsWithoutColor<typeof Button>, 'className'> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'disabled'> &
  BaseButtonOwnProps & {
    /**
     * Shows a centered spinner and hides the button content (kept accessible via a visually hidden copy).
     * Also disables the button unless `disabled` is set explicitly.
     * @default false
     */
    loading?: boolean;
  };

/**
 * The unstyled-markup base shared by `Button` and `IconButton`: renders a Base UI button with the
 * ljkui size, variant and color classes, plus loading-state handling.
 */
const BaseButton = (props: BaseButtonProps) => {
  const {
    children,
    loading,
    disabled = props.loading,
    className,
    render,
    size = baseButtonPropDefs.size.default,
    variant = baseButtonPropDefs.variant.default,
    color = baseButtonPropDefs.color.default,
    highContrast = baseButtonPropDefs.highContrast.default,
    ...baseButtonProps
  } = props;

  const buttonClassName = rootClassName('fui-BaseButton', className, { size, variant, highContrast }, 'fui-reset');

  const content = loading ? (
    <>
      {/**
       * We need a wrapper to set `visibility: hidden` to hide the button content whilst we show the `Spinner`.
       * The button is a flex container with a `gap`, so we use `display: contents` to ensure the correct flex layout.
       *
       * However, `display: contents` removes the content from the accessibility tree in some browsers,
       * so we force remove it with `aria-hidden` and re-add it in the tree with `VisuallyHidden`
       */}
      <span style={{ display: 'contents', visibility: 'hidden' }} aria-hidden>
        {children}
      </span>
      <VisuallyHidden>{children}</VisuallyHidden>

      <span
        style={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          inset: '0',
        }}
      >
        <Spinner size={mapButtonSizeToSpinnerSize(size)} />
      </span>
    </>
  ) : (
    children
  );

  return (
    <Button
      render={render}
      {...baseButtonProps}
      data-accent-color={color || (variant === 'surface' ? 'gray' : color)}
      className={buttonClassName}
      aria-busy={loading || undefined}
      // The `data-disabled` attribute enables correct styles when doing `<Button render={<a />} disabled>`
      data-disabled={disabled || undefined}
      disabled={disabled}
    >
      {content}
    </Button>
  );
};
BaseButton.displayName = 'BaseButton';

export { BaseButton };
export type { BaseButtonProps };
