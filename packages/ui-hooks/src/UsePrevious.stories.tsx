import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { usePrevious } from "./usePrevious";

function UsePreviousDemo() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0 }}>
        Current: <strong>{count}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Previous: <strong>{previousCount ?? "—"}</strong>
      </p>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increment
      </button>
    </div>
  );
}

const meta = {
  title: "Hooks/usePrevious",
  component: UsePreviousDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UsePreviousDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
