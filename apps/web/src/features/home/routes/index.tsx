"use client";
import React from 'react';
import { DashboardGrid, WidgetContainer } from '../components';
import styles from './index.module.css';

type Widget = {
  id: string;
  title: string;
  render: () => React.ReactNode;
  refresh?: () => void | Promise<void>;
};

const widgetRegistry: Widget[] = [];

export const registerWidget = (widget: Widget) => {
  widgetRegistry.push(widget);
};

export function HomeClient({ status }: { status: string }) {
  const widgets: Widget[] = [
    {
      id: 'api-health',
      title: 'API Health',
      render: () => <p>API Health: {status}</p>,
      refresh: () => location.reload(),
    },
    ...widgetRegistry,
  ];

  return (
    <div className={styles.container}>
      <h1>Automation Dashboard</h1>
      <DashboardGrid>
        {widgets.map(({ id, title, render, refresh }) => (
          <WidgetContainer key={id} title={title} onRefresh={refresh}>
            {render()}
          </WidgetContainer>
        ))}
      </DashboardGrid>
    </div>
  );
}

