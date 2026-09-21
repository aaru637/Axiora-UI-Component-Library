import type { Meta, StoryObj } from "@storybook/react-vite";

import { useCounter } from "./useCounter";

function UseCounterDemo({
  initial = 0,
  min,
  max,
  step = 1,
}: {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
}) {
  const { count, increment, decrement, reset } = useCounter(initial, {
    min,
    max,
    step,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0, fontSize: "1.5rem" }}>
        Count: <strong>{count}</strong>
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={decrement}>
          −
        </button>
        <button type="button" onClick={increment}>
          +
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

const meta = {
  title: "Hooks/useCounter",
  component: UseCounterDemo,
  tags: ["autodocs"],
  args: {
    initial: 0,
    step: 1,
  },
} satisfies Meta<typeof UseCounterDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBounds: Story = {
  args: {
    initial: 5,
    min: 0,
    max: 10,
    step: 2,
  },
};
