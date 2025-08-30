"use client";
import React from 'react';
import { Button } from '@automation/ui';

export function HomeClient({ status }: { status: string }) {
  return (
    <div style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>Automation Dashboard</h1>
      <p>API Health: {status}</p>
      <Button onClick={() => location.reload()}>Refresh</Button>
    </div>
  );
}

