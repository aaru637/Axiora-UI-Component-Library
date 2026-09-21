import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { DatePicker } from "./DatePicker";

const meta = {
  title: "Core/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    label: "Start date",
    placeholder: "Pick a date",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(new Date(2026, 8, 21));
    return (
      <DatePicker
        {...args}
        value={value}
        onChange={setValue}
        helperText={value ? value.toDateString() : "No date selected"}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    error: "Date is required",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(2026, 8, 21),
  },
};
