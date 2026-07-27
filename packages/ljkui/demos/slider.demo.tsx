import React from 'react';
import { Slider } from 'ljkui';

export default function SliderDemo() {
  return (
    <div className="flex w-75 flex-col gap-4">
      <Slider defaultValue={[50]} />
      <Slider defaultValue={[30]} size="1" color="orange" />
      <Slider defaultValue={[25, 75]} color="cyan" />
      <Slider defaultValue={[60]} disabled />
    </div>
  );
}
