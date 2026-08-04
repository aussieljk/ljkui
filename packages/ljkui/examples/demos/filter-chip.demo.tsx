import React from 'react';
import { FilterChip } from 'ljkui';

export default function FilterChipDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip defaultChecked>In stock</FilterChip>
      <FilterChip>On sale</FilterChip>
      <FilterChip defaultChecked color="orange">
        Free shipping
      </FilterChip>
      <FilterChip disabled>Disabled</FilterChip>
    </div>
  );
}
