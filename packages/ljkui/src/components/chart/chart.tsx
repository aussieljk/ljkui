'use client';

import classNames from 'classnames';
import * as React from 'react';

import { colorProp } from '../../helpers';
import { Tooltip } from '../tooltip';

type ChartData = {
  /**
   * Tooltip label for the segment: a plain string (the computed percentage is appended for
   * the aria-label), or a function of `(value, percent)` returning the full label.
   */
  label: string | ((value: number, percent: string) => string);
  /** Numeric value of the segment; its share of the total across all segments sets the bar width. */
  value: number;
  /** Theme accent color used to fill the segment. */
  color: (typeof colorProp.values)[number];
};

interface ChartOwnProps extends React.ComponentProps<'div'> {}

interface ChartProps extends React.ComponentProps<'div'>, ChartOwnProps {
  /**
   * Segments to render, in order. Each segment's width is its `value` as a percentage of the
   * sum of all segment values (rounded to 2 decimal places).
   */
  data: ChartData[];
}

/**
 * A single horizontal bar divided into colored segments proportional to their values.
 * Hovering a segment shows a tooltip with its label; each segment also carries an
 * `aria-label` combining the label and percentage.
 *
 * @example
 * ```tsx
 * <Chart
 *   data={[
 *     { label: 'Completed', value: 60, color: 'green' },
 *     { label: 'In progress', value: 25, color: 'blue' },
 *     { label: 'Failed', value: 15, color: 'red' },
 *   ]}
 * />
 * ```
 */
const Chart = (props: ChartProps) => {
  const { className, data, ...rootProps } = props;

  const sum = data.reduce((acc, dataPoint) => acc + dataPoint.value, 0);

  return (
    <div {...rootProps} className={classNames('fui-Chart', className)}>
      {data.map((dataPoint, i) => {
        // Round to max 2 decimal places
        const percent = `${Math.round((dataPoint.value / sum) * 100 * 100) / 100}%`;
        const label = typeof dataPoint.label === 'string' ? dataPoint.label : dataPoint.label(dataPoint.value, percent);

        const ariaLabel = typeof dataPoint.label === 'string' ? `${dataPoint.label} ${percent}` : label;

        return (
          <Tooltip content={label} key={i} delay={150} className="fui-ChartTooltip" data-accent-color={dataPoint.color}>
            <div
              data-accent-color={dataPoint.color}
              aria-label={ariaLabel}
              className="fui-ChartBar"
              style={{ width: percent }}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

Chart.displayName = 'Chart';

export { Chart };
export type { ChartProps };
