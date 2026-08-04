'use client';

import * as React from 'react';

import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';
import { rootClassName } from '../../helpers';
import { stepperPropDefs } from './stepper.props';

type StepStatus = 'complete' | 'current' | 'upcoming';

interface StepItem {
  /** A stable identity for the step, used as its React key. Falls back to the array index — pass
   * one if the steps can be reordered or inserted, so state stays attached to the right step. */
  id?: string;
  /** The step's title. */
  label: React.ReactNode;
  /** Optional secondary line beneath the label. */
  description?: React.ReactNode;
  /** Override the auto-derived status (otherwise inferred from `activeStep`). */
  status?: StepStatus;
}

type StepperOwnProps = GetPropDefTypes<typeof stepperPropDefs>;
interface StepperProps extends Omit<PropsWithoutColor<'ol'>, 'children'>, StepperOwnProps {
  /** The ordered steps to render. */
  steps: StepItem[];
  /** Index (0-based) of the current step. Earlier steps are `complete`, later ones `upcoming`. @default 0 */
  activeStep?: number;
}

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" aria-hidden focusable="false">
    <path d="M13 4.5 6.5 11 3 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * A horizontal or vertical sequence of steps showing progress through a multi-stage process.
 * Renders an ordered list; the active step carries `aria-current="step"`. Completed steps show
 * a check, the current and upcoming steps show their number.
 *
 * @example
 * ```tsx
 * <Stepper
 *   activeStep={1}
 *   steps={[
 *     { label: 'Cart' },
 *     { label: 'Shipping', description: 'Address & method' },
 *     { label: 'Payment' },
 *   ]}
 * />
 * ```
 */
const Stepper = (props: StepperProps) => {
  const {
    className,
    size = stepperPropDefs.size.default,
    orientation = stepperPropDefs.orientation.default,
    color = stepperPropDefs.color.default,
    highContrast = stepperPropDefs.highContrast.default,
    steps,
    activeStep = 0,
    ref,
    ...rootProps
  } = props;

  return (
    <ol
      ref={ref}
      data-accent-color={color}
      {...rootProps}
      className={rootClassName('fui-StepperRoot', className, { size, orientation, highContrast })}
    >
      {steps.map((step, index) => {
        const status: StepStatus =
          step.status ?? (index < activeStep ? 'complete' : index === activeStep ? 'current' : 'upcoming');
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.id ?? index}
            className="fui-StepperItem"
            data-status={status}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            <div className="fui-StepperMarkerColumn">
              <span className="fui-StepperMarker">
                {status === 'complete' ? <CheckIcon /> : <span className="fui-StepperNumber">{index + 1}</span>}
              </span>
              {!isLast && <span className="fui-StepperConnector" aria-hidden />}
            </div>
            <div className="fui-StepperContent">
              <span className="fui-StepperLabel">{step.label}</span>
              {step.description != null && <span className="fui-StepperDescription">{step.description}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
Stepper.displayName = 'Stepper';

export { Stepper };
export type { StepperProps, StepItem, StepStatus };
