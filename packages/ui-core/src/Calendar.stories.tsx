import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Calendar } from "./Calendar";

const meta = {
  title: "Core/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  render: () => {
    const [selected, setSelected] = useState(new Date(2026, 8, 21));
    return (
      <Calendar selected={selected} onSelect={setSelected} month={selected} />
    );
  },
};

export const WithDisabledWeekends: Story = {
  render: () => (
    <Calendar
      selected={new Date(2026, 8, 21)}
      disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
    />
  ),
};
