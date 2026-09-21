import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./Textarea";

// AI-ASSISTED: Cursor
// PROMPT: Add Textarea Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    label: "Message",
    placeholder: "Type your message here...",
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "Maximum 500 characters." },
};

export const WithError: Story = {
  args: { error: "Message is required." },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Cannot edit this." },
};
