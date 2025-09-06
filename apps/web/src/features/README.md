# Features

This directory houses dashboard widgets and related utilities.

## Widget registration

Widgets are small React components that can plug into the dashboard.
Each widget implements the `WidgetProps` interface and is registered at
runtime using `registerWidget` from `widgetRegistry.ts`.

```ts
import { registerWidget } from "./widgetRegistry";
import { MyWidget } from "./my-widget/MyWidget";

registerWidget({
  id: "my-widget",
  title: "My Widget",
  render: () => <MyWidget />,
});
```

The shared `WidgetProps` interface ensures a consistent API:

```ts
interface WidgetProps {
  id: string;
  title: string;
  render: () => React.ReactNode;
  refresh?: () => void | Promise<void>;
}
```

Registered widgets can be retrieved with `getRegisteredWidgets()` and
rendered by the dashboard grid.
