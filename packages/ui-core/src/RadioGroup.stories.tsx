import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Radio, RadioGroup } from "./RadioGroup";

// AI-ASSISTED: Cursor
// PROMPT: Fix RadioGroup Storybook story types for compound component
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/RadioGroup",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;
type RadioGroupArgs = Omit<ComponentProps<typeof RadioGroup>, "children">;

const radioOptions = (args: RadioGroupArgs) => (
  <RadioGroup {...args}>
    <Radio value="email" label="Email" />
    <Radio value="sms" label="SMS" />
    <Radio value="none" label="None" />
  </RadioGroup>
);

export const Default: Story = {
  render: () =>
    radioOptions({
      label: "Notification preference",
      defaultValue: "email",
    }),
};

export const WithHelperText: Story = {
  render: () =>
    radioOptions({
      label: "Notification preference",
      defaultValue: "email",
      helperText: "Choose how you'd like to be notified.",
    }),
};

export const WithError: Story = {
  render: () =>
    radioOptions({
      label: "Notification preference",
      error: "Please select a notification preference.",
    }),
};

export const Disabled: Story = {
  render: () =>
    radioOptions({
      label: "Notification preference",
      defaultValue: "email",
      disabled: true,
    }),
};
