import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toggle } from "./Toggle";

const meta = {
  title: "Core/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    children: "Bold",
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pressed: Story = {
  args: { defaultPressed: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Toggle defaultPressed>Bold</Toggle>
      <Toggle>Italic</Toggle>
      <Toggle>Underline</Toggle>
    </div>
  ),
};
