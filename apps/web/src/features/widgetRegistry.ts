import type { ReactNode } from "react";

export interface WidgetProps {
  id: string;
  title: string;
  render: () => ReactNode;
  refresh?: () => void | Promise<void>;
}

const registry: WidgetProps[] = [];

export const registerWidget = (widget: WidgetProps) => {
  registry.push(widget);
};

export const getRegisteredWidgets = () => registry;
