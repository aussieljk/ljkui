import React from 'react';
import { InputGroup, VStack } from '@aussieljk/frosted';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const examples = {
  Default: (
    <InputGroup.Root style={{ maxWidth: 320 }}>
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>
      <InputGroup.Input placeholder="Search…" />
    </InputGroup.Root>
  ),

  'With unit': (
    <InputGroup.Root style={{ maxWidth: 240 }}>
      <InputGroup.Addon>
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="0.00" inputMode="decimal" />
      <InputGroup.Addon>
        <InputGroup.Text>USD</InputGroup.Text>
      </InputGroup.Addon>
    </InputGroup.Root>
  ),

  Sizes: (
    <VStack spacing={12} style={{ maxWidth: 320 }}>
      {(['1', '2', '3'] as const).map((size) => (
        <InputGroup.Root key={size} size={size}>
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
          <InputGroup.Input placeholder={`Size ${size}`} />
        </InputGroup.Root>
      ))}
    </VStack>
  ),
};
