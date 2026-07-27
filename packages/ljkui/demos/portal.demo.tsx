import React from 'react';
import { Button, Portal, Typography } from 'ljkui';

export default function PortalDemo() {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <Button variant="soft" onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'} portaled content
      </Button>
      {show && (
        <Portal className="fixed right-5 bottom-5 z-[1000] rounded-md bg-panel-solid p-4 shadow-[var(--shadow-5)]">
          <Typography.Text size="2" weight="medium">
            Rendered at the end of document.body
          </Typography.Text>
        </Portal>
      )}
    </div>
  );
}
