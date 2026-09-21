import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./Label";

// AI-ASSISTED: Cursor
// PROMPT: Add Label Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Email address",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const Error: Story = {
  args: { error: true, children: "Email address" },
};
