'use client';

import classNames from 'classnames';
import * as React from 'react';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { colorProp } from '../../helpers';
import { timelinePropDefs } from './timeline.props';

// ============================================================================
// Root
// ============================================================================

type TimelineOwnProps = GetPropDefTypes<typeof timelinePropDefs>;
interface TimelineRootProps extends React.ComponentProps<'ol'>, TimelineOwnProps {}

/**
 * A vertical, ordered list of dated events connected by a line. Compose it from
 * `Timeline.Item`s.
 *
 * @example
 * ```tsx
 * <Timeline.Root>
 *   <Timeline.Item time="09:00" title="Order placed" />
 *   <Timeline.Item time="12:30" title="Shipped" color="grass">
 *     Left the warehouse.
 *   </Timeline.Item>
 * </Timeline.Root>
 * ```
 */
const TimelineRoot = React.forwardRef<HTMLOListElement, TimelineRootProps>((props, forwardedRef) => {
  const { className, size = timelinePropDefs.size.default, ...rootProps } = props;
  return (
    <ol ref={forwardedRef} {...rootProps} className={classNames('fui-TimelineRoot', className, `fui-r-size-${size}`)} />
  );
});
TimelineRoot.displayName = 'TimelineRoot';

// ============================================================================
// Item
// ============================================================================

type ItemColor = NonNullable<GetPropDefTypes<{ color: typeof colorProp }>['color']>;

interface TimelineItemProps extends Omit<PropsWithoutColor<'li'>, 'title'> {
  /** The event's title. */
  title?: React.ReactNode;
  /** A timestamp or date label shown above the title. */
  time?: React.ReactNode;
  /** Accent color of the dot marker. Inherits the theme accent when not set. */
  color?: ItemColor;
  /** Renders a higher-contrast dot marker. */
  highContrast?: boolean;
}

/**
 * A single event in a `Timeline.Root` — a dot marker, an optional time and title, and
 * free-form body content as children.
 */
const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>((props, forwardedRef) => {
  const { className, title, time, color, highContrast, children, ...itemProps } = props;
  return (
    <li
      ref={forwardedRef}
      data-accent-color={color}
      {...itemProps}
      className={classNames('fui-TimelineItem', className, { 'fui-high-contrast': highContrast })}
    >
      <div className="fui-TimelineMarkerColumn">
        <span className="fui-TimelineDot" aria-hidden />
        <span className="fui-TimelineConnector" aria-hidden />
      </div>
      <div className="fui-TimelineContent">
        {time != null && <span className="fui-TimelineTime">{time}</span>}
        {title != null && <span className="fui-TimelineTitle">{title}</span>}
        {children != null && <div className="fui-TimelineBody">{children}</div>}
      </div>
    </li>
  );
});
TimelineItem.displayName = 'TimelineItem';

export { TimelineItem as Item, TimelineRoot as Root };
export type { TimelineItemProps as ItemProps, TimelineRootProps as RootProps };
