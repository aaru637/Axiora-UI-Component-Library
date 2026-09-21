import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider } from "./Slider";

const meta = {
  title: "Core/Slider",
  component: Slider,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: "16px 0" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: [50], max: 100, step: 1 },
};

export const Range: Story = {
  args: { defaultValue: [25, 75], max: 100, step: 1 },
};

export const Disabled: Story = {
  args: { defaultValue: [40], max: 100, disabled: true },
};
