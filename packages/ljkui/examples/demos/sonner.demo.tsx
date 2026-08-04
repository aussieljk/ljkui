import React from 'react';
import { Button, toast } from 'ljkui';

// Requires a single <Toaster /> rendered once at the root of your app.
export default function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast.success('Changes saved successfully')}>Success</Button>
      <Button variant="soft" color="red" onClick={() => toast.error('Something went wrong')}>
        Error
      </Button>
      <Button variant="soft" onClick={() => toast('A new notification has arrived')}>
        Default
      </Button>
    </div>
  );
}
