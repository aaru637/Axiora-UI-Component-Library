import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { MultiSelect, type MultiSelectOption } from "./MultiSelect";

const options: MultiSelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

const meta = {
  title: "Core/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  args: {
    label: "Skills",
    placeholder: "Select skills…",
    options,
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(["react", "vue"]);
    return (
      <MultiSelect
        {...args}
        value={value}
        onValueChange={setValue}
        helperText={`Selected: ${value.join(", ") || "none"}`}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    error: "Select at least one skill",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: ["react"],
  },
};
