'use client';

import { Meter } from '@base-ui/react/meter';
import classNames from 'classnames';
import * as React from 'react';
import { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { progressPropDefs } from './progress.props';

type ProgressOwnProps = GetPropDefTypes<typeof progressPropDefs>;
interface ProgressProps extends Omit<PropsWithoutColor<typeof Meter.Root>, 'children'>, ProgressOwnProps {}

/**
 * Horizontal bar that visualizes a value against a maximum. Built on Base UI's `Meter`
 * (rendered with meter/graphical semantics, not `role="progressbar"`); the indicator width
 * is clamped to 0-100% of `max`. `value` defaults to 0 and `max` to 100.
 *
 * @example
 * ```tsx
 * <Progress value={40} max={100} />
 * ```
 */
const Progress = (props: ProgressProps) => {
  const {
    className,
    size = progressPropDefs.size.default,
    color = progressPropDefs.color.default,
    highContrast = progressPropDefs.highContrast.default,
    value = 0,
    max = 100,
    ...progressProps
  } = props;

  const progress = Math.max(0, Math.min((value || 0) / max, 1));

  return (
    <Meter.Root
      data-accent-color={color}
      className={classNames(
        'fui-ProgressRoot',
        className,
        {
          'fui-high-contrast': highContrast,
        },
        `fui-r-size-${size}`,
      )}
      value={value}
      max={max}
      {...progressProps}
    >
      <Meter.Track className="fui-ProgressTrack">
        <Meter.Indicator className="fui-ProgressIndicator" style={{ width: `${progress * 100}%` }} />
      </Meter.Track>
    </Meter.Root>
  );
};

Progress.displayName = 'Progress';

export { Progress };
export type { ProgressProps };
