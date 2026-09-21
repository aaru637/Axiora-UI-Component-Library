import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";

import { useResizeObserver } from "./useResizeObserver";

function UseResizeObserverDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver(ref);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div
        ref={ref}
        style={{
          width: "100%",
          minHeight: 120,
          resize: "both",
          overflow: "auto",
          padding: 16,
          border: "1px dashed var(--color-border, #e5e7eb)",
          borderRadius: 8,
          background: "var(--color-surface, #f9fafb)",
        }}
      >
        Drag the resize handle on this box.
      </div>
      <p style={{ margin: 0 }}>
        Observed size:{" "}
        <strong>
          {Math.round(width)} × {Math.round(height)} px
        </strong>
      </p>
    </div>
  );
}

const meta = {
  title: "Hooks/useResizeObserver",
  component: UseResizeObserverDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseResizeObserverDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
