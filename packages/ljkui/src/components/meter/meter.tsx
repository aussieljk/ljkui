'use client';

import * as React from 'react';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { rootClassName, useAccessibleNameWarning } from '../../helpers';
import { meterPropDefs } from './meter.props';

type MeterOwnProps = GetPropDefTypes<typeof meterPropDefs>;
interface MeterProps extends Omit<PropsWithoutColor<'div'>, 'children'>, MeterOwnProps {
  /** The current measured value. @default 0 */
  value?: number;
  /** The lower bound of the measured range. @default 0 */
  min?: number;
  /** The upper bound of the measured range. @default 100 */
  max?: number;
  /** The upper bound of the low (sub-optimal) end of the range. */
  low?: number;
  /** The lower bound of the high (sub-optimal) end of the range. */
  high?: number;
  /** The value at which the gauge is considered optimal — drives the automatic optimum/sub-optimum/worst coloring. */
  optimum?: number;
}

/**
 * A gauge that visualizes a scalar measurement within a known range — disk usage, a score,
 * remaining quota. Unlike `Progress` (task completion), this carries `role="meter"` semantics.
 * When `low`, `high`, and `optimum` are supplied, the bar auto-colors green / amber / red
 * following the HTML `<meter>` candidate algorithm, unless `color` is set explicitly.
 *
 * The gauge has no visible label of its own — pass an `aria-label` (or `aria-labelledby`) so it is
 * named to assistive tech. `aria-valuetext` defaults to the filled percentage; override it for a
 * unit-bearing readout (e.g. `"5.5 of 8 GB"`).
 *
 * @example
 * ```tsx
 * <Meter aria-label="Disk usage" value={72} min={0} max={100} low={20} high={80} optimum={90} />
 * ```
 */
const Meter = (props: MeterProps) => {
  const {
    className,
    size = meterPropDefs.size.default,
    color = meterPropDefs.color.default,
    highContrast = meterPropDefs.highContrast.default,
    value = 0,
    min = 0,
    max = 100,
    low,
    high,
    optimum,
    ref,
    ...rootProps
  } = props;

  useAccessibleNameWarning('Meter', rootProps);

  const span = max - min || 1;
  const fraction = Math.max(0, Math.min((value - min) / span, 1));

  // Auto color from the HTML <meter> candidate algorithm when the gauge regions are defined.
  const autoColor = React.useMemo(() => {
    if (color !== undefined || low === undefined || high === undefined || optimum === undefined) return undefined;
    // Which region does `optimum` sit in?
    const inLow = optimum <= low;
    const inHigh = optimum >= high;
    if (inLow) {
      if (value <= low) return 'success';
      if (value <= high) return 'warning';
      return 'danger';
    }
    if (inHigh) {
      if (value >= high) return 'success';
      if (value >= low) return 'warning';
      return 'danger';
    }
    // optimum in the medium region
    if (value >= low && value <= high) return 'success';
    return 'warning';
  }, [color, low, high, optimum, value]);

  return (
    <div
      ref={ref}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={`${Math.round(fraction * 100)}%`}
      data-accent-color={color ?? autoColor}
      {...rootProps}
      className={rootClassName('fui-MeterRoot', className, { size, highContrast })}
    >
      <div className="fui-MeterIndicator" style={{ width: `${fraction * 100}%` }} />
    </div>
  );
};
Meter.displayName = 'Meter';

export { Meter };
export type { MeterProps };
