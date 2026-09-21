import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select";

// AI-ASSISTED: Cursor
// PROMPT: Center Select stories; remove Validate button from error demo
// ACCEPTED-BY: dhinesh

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "in", label: "India" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const meta = {
  title: "Core/Select",
  component: Select,
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
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "Select your country of residence." },
};

/** Error clears automatically when you pick an option — no extra button needed. */
export const WithError: Story = {
  args: { error: "Please select a country." },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CompoundAPI: Story = {
  render: () => (
    <SelectRoot defaultValue="apple">
      <SelectTrigger style={{ width: 280 }}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  ),
};
