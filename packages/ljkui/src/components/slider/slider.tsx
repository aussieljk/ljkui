'use client';

import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import * as React from 'react';

import { sliderPropDefs } from './slider.props';

import { rootClassName } from '../../helpers';
import type { GetPropDefTypes, PropsWithoutColor } from '../../helpers';

type SliderOwnProps = GetPropDefTypes<typeof sliderPropDefs>;
type SliderProps = Omit<PropsWithoutColor<typeof SliderPrimitive.Root>, 'children' | 'className' | 'render'> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'defaultValue'> &
  SliderOwnProps & {
    /** Ref to access the first thumb's hidden input element */
    inputRef?: React.Ref<HTMLInputElement>;
  };

/**
 * A control for selecting a value — or a range — by dragging thumbs along a
 * track. Wraps the Base UI Slider primitive.
 *
 * Pass a number as `value`/`defaultValue` for a single thumb, or an array to
 * render one thumb per entry. Supports controlled and uncontrolled usage.
 *
 * @example
 * <Slider defaultValue={50} onValueChange={handleChange} />
 */
const Slider = (props: SliderProps) => {
  const {
    className,
    size = sliderPropDefs.size.default,
    color = sliderPropDefs.color.default,
    highContrast = sliderPropDefs.highContrast.default,
    thumbCollisionBehavior = 'swap',
    inputRef,
    ...sliderProps
  } = props;

  // Normalize value to array for thumb rendering
  const values = React.useMemo(() => {
    const val = sliderProps.value ?? sliderProps.defaultValue;
    if (val === undefined) return [0];
    return Array.isArray(val) ? val : [val];
  }, [sliderProps.value, sliderProps.defaultValue]);

  return (
    <SliderPrimitive.Root
      {...sliderProps}
      data-accent-color={color}
      thumbCollisionBehavior={thumbCollisionBehavior}
      className={rootClassName('fui-SliderRoot', className, { size, highContrast })}
    >
      <SliderPrimitive.Control className="fui-SliderControl">
        <SliderPrimitive.Track className="fui-SliderTrack">
          <SliderPrimitive.Indicator
            className={rootClassName('fui-SliderRange', undefined, {
              highContrast,
            })}
          />
          {values.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              index={index}
              className="fui-SliderThumb"
              inputRef={index === 0 ? inputRef : undefined}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
};
Slider.displayName = 'Slider';

export { Slider };
export type { SliderProps };
