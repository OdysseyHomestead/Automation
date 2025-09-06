"use client";
import React from "react";
import { DashboardGrid, WidgetContainer } from "../components";
import { BitcoinWidget } from "../../bitcoin/BitcoinWidget";
import { TaskListWidget } from "../../task-list/TaskListWidget";
import {
  getRegisteredWidgets,
  registerWidget,
  WidgetProps,
} from "../../widgetRegistry";
import styles from "./index.module.css";

registerWidget({
  id: "bitcoin-price",
  title: "Bitcoin Price",
  render: () => <BitcoinWidget />,
});

registerWidget({
  id: "task-list",
  title: "Task List",
  render: () => <TaskListWidget />,
});

export function HomeClient({ status }: { status: string }) {
  const widgets: WidgetProps[] = [
    {
      id: "api-health",
      title: "API Health",
      render: () => <p>API Health: {status}</p>,
      refresh: () => location.reload(),
    },
    ...getRegisteredWidgets(),
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
