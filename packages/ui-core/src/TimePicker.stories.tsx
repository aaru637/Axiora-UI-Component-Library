import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { TimePicker, type TimeValue } from "./TimePicker";

const meta = {
  title: "Core/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  args: {
    label: "Meeting time",
    placeholder: "Pick a time",
  },
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue>({ hours: 14, minutes: 30 });
    return (
      <TimePicker
        {...args}
        value={value}
        onChange={(next) => {
          if (next) setValue(next);
        }}
        helperText={
          value
            ? `${value.hours}:${value.minutes.toString().padStart(2, "0")}`
            : "No time selected"
        }
      />
    );
  },
};

export const TwentyFourHour: Story = {
  args: {
    use24Hour: true,
    defaultValue: { hours: 9, minutes: 0 },
  },
};

export const WithError: Story = {
  args: {
    error: "Time is required",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: { hours: 10, minutes: 15 },
  },
};
