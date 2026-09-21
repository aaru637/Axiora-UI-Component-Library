import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Combobox, type ComboboxOption } from "./Combobox";

const options: ComboboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

const meta = {
  title: "Core/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  args: {
    label: "Framework",
    placeholder: "Select framework…",
    options,
  },
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("react");
    return (
      <Combobox
        {...args}
        value={value}
        onValueChange={setValue}
        helperText={`Selected: ${value}`}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    error: "Please select a framework",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "react",
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue", disabled: true },
      { value: "angular", label: "Angular" },
    ],
  },
};
