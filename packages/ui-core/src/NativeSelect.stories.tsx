import type { Meta, StoryObj } from "@storybook/react-vite";

import { NativeSelect } from "./NativeSelect";

// AI-ASSISTED: Cursor
// PROMPT: Add NativeSelect Storybook stories
// ACCEPTED-BY: dhinesh

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

export const Disabled: Story = {
  args: { disabled: true },
};
