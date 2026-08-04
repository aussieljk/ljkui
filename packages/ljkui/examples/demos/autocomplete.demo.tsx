import React from 'react';
import { Autocomplete, ScrollArea, Input } from 'ljkui';

const tags = ['feature', 'fix', 'bug', 'docs', 'internal', 'performance', 'accessibility'];

export default function AutocompleteDemo() {
  return (
    <div className="w-75">
      <Autocomplete.Root items={tags}>
        <Input.Root>
          <Autocomplete.Input render={<Input.Control placeholder="Search tags..." />} />
        </Input.Root>
        <Autocomplete.Content>
          <ScrollArea type="auto">
            <Autocomplete.Empty>No tags found.</Autocomplete.Empty>
            <Autocomplete.List>
              {(tag) => (
                <Autocomplete.Item key={tag as string} value={tag}>
                  {tag as string}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </ScrollArea>
        </Autocomplete.Content>
      </Autocomplete.Root>
    </div>
  );
}
