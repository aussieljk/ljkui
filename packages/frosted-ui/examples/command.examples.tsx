import React from 'react';
import { Button, Command, Typography, VStack } from '@aussieljk/frosted';

const items = {
  Actions: [
    { label: 'Create invoice', shortcut: '⌘N' },
    { label: 'Add customer', shortcut: '⌘⇧C' },
    { label: 'Export report', shortcut: '⌘E' },
  ],
  Navigation: [
    { label: 'Go to dashboard', shortcut: 'G D' },
    { label: 'Go to settings', shortcut: 'G S' },
  ],
};

const Palette = ({ onSelect }: { onSelect?: (label: string) => void }) => (
  <Command.Root style={{ width: 420, boxShadow: 'var(--shadow-3)' }}>
    <Command.Input placeholder="Type a command or search…" />
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>
      {Object.entries(items).map(([heading, group], i) => (
        <React.Fragment key={heading}>
          {i > 0 && <Command.Separator />}
          <Command.Group heading={heading}>
            {group.map((item) => (
              <Command.Item key={item.label} onSelect={() => onSelect?.(item.label)}>
                {item.label}
                <Command.Shortcut>{item.shortcut}</Command.Shortcut>
              </Command.Item>
            ))}
          </Command.Group>
        </React.Fragment>
      ))}
    </Command.List>
  </Command.Root>
);

const WithSelection = () => {
  const [last, setLast] = React.useState<string | null>(null);
  return (
    <VStack spacing={12} alignment="leading">
      <Palette onSelect={setLast} />
      <Typography.Text size="2" color="gray">
        {last ? `Ran: ${last}` : 'Nothing run yet'}
      </Typography.Text>
    </VStack>
  );
};

const InDialog = () => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <VStack spacing={12} alignment="leading">
      <Button onClick={() => setOpen(true)}>Open palette (⌘K)</Button>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Palette onSelect={() => setOpen(false)} />
      </Command.Dialog>
    </VStack>
  );
};

export const examples = {
  Default: <Palette />,
  'With selection': <WithSelection />,
  'In a dialog': <InDialog />,
};
