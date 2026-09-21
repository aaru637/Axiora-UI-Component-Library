import type { Meta, StoryObj } from "@storybook/react-vite";

import { NativeSelect } from "./NativeSelect";

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "in", label: "India" },
];

const meta = {
  title: "Core/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  args: {
    label: "Country",
    placeholder: "Select a country",
    options,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "Select your country of residence." },
};

export const WithError: Story = {
  args: { error: "Please select a country." },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: "", label: "Select a plan", disabled: true },
      { value: "free", label: "Free" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise", disabled: true },
    ],
    label: "Plan",
  },
};
