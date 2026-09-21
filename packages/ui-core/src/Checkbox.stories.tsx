import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

// AI-ASSISTED: Cursor
// PROMPT: Add Checkbox Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept terms and conditions",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithHelperText: Story = {
  args: { helperText: "You must accept to continue." },
};

export const WithError: Story = {
  args: { error: "You must accept the terms." },
};

export const Disabled: Story = {
  args: { disabled: true },
};
