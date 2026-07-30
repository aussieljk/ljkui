'use client';

import classNames from 'classnames';
import * as React from 'react';

import { InfoCircledIcon, ThickCheckIcon, XIcon } from '../../icons';
import {
  Actions as EmptyActions,
  Description as EmptyDescription,
  Header as EmptyHeader,
  Media as EmptyMedia,
  Root as EmptyRoot,
  Title as EmptyTitle,
  type ActionsProps as EmptyActionsProps,
  type DescriptionProps as EmptyDescriptionProps,
  type HeaderProps as EmptyHeaderProps,
  type MediaColor as EmptyMediaColor,
  type MediaProps as EmptyMediaProps,
  type RootProps as EmptyRootProps,
  type TitleProps as EmptyTitleProps,
} from '../empty/empty';
import { resultRootPropDefs, type ResultStatus } from './result.props';

// ============================================================================
// Status → color + default icon
// ============================================================================

const WarningIcon = (props: React.ComponentProps<'svg'>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    <path
      d="M12 9v4m0 3h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const STATUS_META: Record<ResultStatus, { color: EmptyMediaColor; Icon: React.ComponentType<{ className?: string }> }> =
  {
    success: { color: 'success', Icon: ThickCheckIcon },
    error: { color: 'danger', Icon: XIcon },
    warning: { color: 'warning', Icon: WarningIcon },
    info: { color: 'info', Icon: InfoCircledIcon },
  };

// ============================================================================
// Context — Root shares its status with Icon
// ============================================================================

const ResultContext = React.createContext<ResultStatus>(resultRootPropDefs.status.default);

// ============================================================================
// Root
// ============================================================================

interface ResultRootProps extends EmptyRootProps {
  /**
   * The outcome being communicated, which sets the media color and default icon.
   * @default 'info'
   */
  status?: ResultStatus;
}

/**
 * A centered outcome state (success / error / warning / info) — the standard slot for the
 * result of an action or the terminal state of a page (404, payment failed, all done).
 *
 * Built on `Empty`, so it shares its layout and parts; the `status` drives the default icon and
 * accent color. Renders a `<div>` element.
 *
 * @example
 * ```tsx
 * <Result.Root status="success">
 *   <Result.Icon />
 *   <Result.Title>Payment complete</Result.Title>
 *   <Result.Description>We emailed you a receipt.</Result.Description>
 *   <Result.Actions>
 *     <Button>Back to dashboard</Button>
 *   </Result.Actions>
 * </Result.Root>
 * ```
 */
const ResultRoot = React.forwardRef<HTMLDivElement, ResultRootProps>((props, forwardedRef) => {
  const { className, status = resultRootPropDefs.status.default, ...rootProps } = props;
  return (
    <ResultContext.Provider value={status}>
      <EmptyRoot
        ref={forwardedRef}
        data-status={status}
        {...rootProps}
        className={classNames('fui-ResultRoot', className)}
      />
    </ResultContext.Provider>
  );
});
ResultRoot.displayName = 'ResultRoot';

// ============================================================================
// Icon
// ============================================================================

interface ResultIconProps extends Omit<EmptyMediaProps, 'color'> {
  /** Overrides the accent color derived from the Root's `status`. */
  color?: EmptyMediaColor;
}

/**
 * The status icon. Colored from the Root's `status` and, when given no children, renders that
 * status's default glyph (check / cross / triangle / info). Renders a `<div>` (via `Empty.Media`).
 *
 * @example
 * ```tsx
 * <Result.Icon /> // default glyph for the status
 * <Result.Icon><MyIcon /></Result.Icon> // custom glyph
 * ```
 */
const ResultIcon = React.forwardRef<HTMLDivElement, ResultIconProps>((props, forwardedRef) => {
  const { children, color, className, ...iconProps } = props;
  const status = React.useContext(ResultContext);
  const { color: statusColor, Icon } = STATUS_META[status];
  return (
    <EmptyMedia
      ref={forwardedRef}
      color={color ?? statusColor}
      {...iconProps}
      className={classNames('fui-ResultIcon', className)}
    >
      {children ?? <Icon />}
    </EmptyMedia>
  );
});
ResultIcon.displayName = 'ResultIcon';

// ============================================================================
// Passthrough parts — reuse Empty's Header / Title / Description / Actions
// ============================================================================

type ResultHeaderProps = EmptyHeaderProps;
/** Optional wrapper grouping the icon, title, and description. Renders a `<div>`. */
const ResultHeader = EmptyHeader;

type ResultTitleProps = EmptyTitleProps;
/** The result headline. Renders a `<div>` styled with `<Text>`. */
const ResultTitle = EmptyTitle;

type ResultDescriptionProps = EmptyDescriptionProps;
/** Supporting copy under the title. Renders a `<p>` styled with `<Text>`. */
const ResultDescription = EmptyDescription;

type ResultActionsProps = EmptyActionsProps;
/** A container for the buttons/links that follow up on the result. Renders a `<div>`. */
const ResultActions = EmptyActions;

// ============================================================================
// Exports
// ============================================================================

export {
  ResultActions as Actions,
  ResultDescription as Description,
  ResultHeader as Header,
  ResultIcon as Icon,
  ResultRoot as Root,
  ResultTitle as Title,
};

export type {
  ResultActionsProps as ActionsProps,
  ResultDescriptionProps as DescriptionProps,
  ResultHeaderProps as HeaderProps,
  ResultIconProps as IconProps,
  ResultRootProps as RootProps,
  ResultTitleProps as TitleProps,
};
