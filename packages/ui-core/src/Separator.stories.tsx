import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./Separator";

// AI-ASSISTED: Cursor
// PROMPT: Add Separator Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: 40, alignItems: "stretch" }}>
        <span style={{ padding: "0 8px" }}>Left</span>
        <Story />
        <span style={{ padding: "0 8px" }}>Right</span>
      </div>
    ),
  ],
};

export const InContent: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <p style={{ margin: "0 0 12px" }}>Section one</p>
      <Separator />
      <p style={{ margin: "12px 0 0" }}>Section two</p>
    </div>
  ),
};
