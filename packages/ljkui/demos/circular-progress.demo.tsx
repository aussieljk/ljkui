import React from 'react';
import { CircularProgress } from 'ljkui';

export default function CircularProgressDemo() {
  return (
    <div className="flex items-center gap-4">
      <CircularProgress value={25} size="3" aria-label="25% complete" />
      <CircularProgress value={60} size="5" aria-label="60% complete" />
      <CircularProgress value={85} size="7" color="green" aria-label="85% complete" />
      <CircularProgress value={100} size="7" color="green" aria-label="Complete" />
    </div>
  );
}
