import type { Meta, StoryObj } from "@storybook/react-vite";

import { useToggle } from "./useToggle";

function UseToggleDemo({ initial = false }: { initial?: boolean }) {
  const { value, toggle, setOn, setOff } = useToggle(initial);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0 }}>
        State: <strong>{value ? "on" : "off"}</strong>
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setOn}>
          Set on
        </button>
        <button type="button" onClick={setOff}>
          Set off
        </button>
      </div>
    </div>
  );
}

const meta = {
  title: "Hooks/useToggle",
  component: UseToggleDemo,
  tags: ["autodocs"],
  args: {
    initial: false,
  },
} satisfies Meta<typeof UseToggleDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitiallyOn: Story = {
  args: { initial: true },
};
