import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { useThrottle } from "./useThrottle";

function UseThrottleDemo({ delay = 500 }: { delay?: number }) {
  const [value, setValue] = useState("");
  const throttledValue = useThrottle(value, delay);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        Type quickly
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Move mouse or type..."
          style={{ padding: 8, minWidth: 280 }}
        />
      </label>
      <p style={{ margin: 0 }}>
        Live: <strong>{value || "—"}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Throttled ({delay}ms): <strong>{throttledValue || "—"}</strong>
      </p>
    </div>
  );
}

const meta = {
  title: "Hooks/useThrottle",
  component: UseThrottleDemo,
  tags: ["autodocs"],
  args: { delay: 500 },
} satisfies Meta<typeof UseThrottleDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FastDelay: Story = {
  args: { delay: 200 },
};
