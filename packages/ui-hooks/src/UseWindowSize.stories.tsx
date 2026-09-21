import type { Meta, StoryObj } from "@storybook/react-vite";

import { useWindowSize } from "./useWindowSize";

function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <p style={{ margin: 0 }}>
        Width: <strong>{width}px</strong>
      </p>
      <p style={{ margin: 0 }}>
        Height: <strong>{height}px</strong>
      </p>
      <p style={{ margin: 0, color: "var(--color-secondary, #6b7280)" }}>
        Resize the browser window to see values update.
      </p>
    </div>
  );
}

const meta = {
  title: "Hooks/useWindowSize",
  component: UseWindowSizeDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseWindowSizeDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
