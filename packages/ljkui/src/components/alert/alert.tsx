'use client';

import { Button } from '@base-ui/react/button';
import classNames from 'classnames';
import * as React from 'react';

import { Spinner } from '../spinner';
import { Text, type TextProps } from '../typography/text';
import { VisuallyHidden } from '../visually-hidden';
import { alertRootPropDefs } from './alert.props';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type AlertRootOwnProps = GetPropDefTypes<typeof alertRootPropDefs>;

type AlertContextValue = AlertRootOwnProps;
const AlertContext = React.createContext<AlertContextValue>({});

interface AlertRootProps extends PropsWithoutColor<'div'>, AlertContextValue {}

/**
 * A short attention-drawing message, e.g. a warning or info banner. Compose with `Alert.Icon`,
 * `Alert.Title`, `Alert.Description` and `Alert.Actions`; the root's `color` is shared with all parts.
 *
 * @example
 * ```tsx
 * <Alert.Root color="warning">
 *   <Alert.Icon>
 *     <ExclamationTriangleIcon />
 *   </Alert.Icon>
 *   <Alert.Title>Your trial ends soon</Alert.Title>
 *   <Alert.Description>Upgrade to keep access to premium features.</Alert.Description>
 * </Alert.Root>
 * ```
 */
const AlertRoot = (props: AlertRootProps) => {
  const { children, className, color = alertRootPropDefs.color.default, ...rootProps } = props;
  return (
    <div data-accent-color={color} {...rootProps} className={classNames('fui-AlertRoot', className)}>
      <AlertContext.Provider value={React.useMemo(() => ({ color }), [color])}>{children}</AlertContext.Provider>
    </div>
  );
};
AlertRoot.displayName = 'AlertRoot';

interface AlertIconProps extends PropsWithoutColor<'div'> {}

/** A slot for the alert's leading icon, colored to match the alert. */
const AlertIcon = (props: AlertIconProps) => {
  const { color } = React.useContext(AlertContext);
  return (
    <Text render={<div />} color={color} size="2" {...props} className={classNames('fui-AlertIcon', props.className)} />
  );
};
AlertIcon.displayName = 'AlertIcon';

type AlertTitleProps = TextProps;

/** The alert's title, rendered as semi-bold high-contrast text. */
const AlertTitle = (props: AlertTitleProps) => {
  const { color } = React.useContext(AlertContext);
  return (
    <Text
      render={<p />}
      size="2"
      color={color}
      weight="semi-bold"
      highContrast
      {...props}
      className={classNames('fui-AlertTitle', props.className)}
    />
  );
};
AlertTitle.displayName = 'AlertTitle';

type AlertDescriptionProps = TextProps;

/** The alert's supporting text, rendered as a paragraph in the alert color. */
const AlertDescription = (props: AlertDescriptionProps) => {
  const { color } = React.useContext(AlertContext);
  return (
    <Text
      render={<p />}
      size="2"
      color={color}
      {...props}
      className={classNames('fui-AlertDescription', props.className)}
    />
  );
};
AlertDescription.displayName = 'AlertDescription';

interface AlertActionsProps extends PropsWithoutColor<'div'> {}

/** A layout container for one or more `Alert.Action` buttons. */
const AlertActions = (props: AlertActionsProps) => {
  return <div {...props} className={classNames('fui-AlertActions', props.className)} />;
};
AlertActions.displayName = 'AlertActions';

type AlertActionVariant = 'primary' | 'secondary';

type AlertActionProps = Omit<PropsWithoutColor<typeof Button>, 'className'> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'disabled'> & {
    /**
     * The visual prominence of the action.
     * @default 'primary'
     */
    variant?: AlertActionVariant;
    /**
     * Shows a centered spinner and hides the button content (kept accessible via a visually hidden copy).
     * Also disables the button unless `disabled` is set explicitly.
     * @default false
     */
    loading?: boolean;
    className?: string;
  };

/**
 * An action button inside `Alert.Actions`, with a built-in `loading` state. Use `render` to compose
 * it with another element, e.g. `render={<a href="..." />}`.
 */
const AlertAction = (props: AlertActionProps) => {
  const { children, variant = 'primary', loading, disabled = props.loading, className, render, ...actionProps } = props;

  const actionClassName = classNames('fui-reset', 'fui-AlertAction', `fui-variant-${variant}`, className);

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
        <Spinner size="2" />
      </span>
    </>
  ) : (
    children
  );

  return (
    <Button
      render={render}
      {...actionProps}
      className={actionClassName}
      aria-busy={loading || undefined}
      // The `data-disabled` attribute enables correct styles when doing `<Alert.Action render={<a />} disabled>`
      data-disabled={disabled || undefined}
      disabled={disabled}
    >
      {content}
    </Button>
  );
};
AlertAction.displayName = 'AlertAction';

export {
  AlertAction as Action,
  AlertActions as Actions,
  AlertDescription as Description,
  AlertIcon as Icon,
  AlertRoot as Root,
  AlertTitle as Title,
};
export type {
  AlertActionProps as ActionProps,
  AlertActionsProps as ActionsProps,
  AlertActionVariant as ActionVariant,
  AlertDescriptionProps as DescriptionProps,
  AlertIconProps as IconProps,
  AlertRootProps as RootProps,
  AlertTitleProps as TitleProps,
};
