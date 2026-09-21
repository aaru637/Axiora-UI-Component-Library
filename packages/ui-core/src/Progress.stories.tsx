import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "./Progress";

const meta = {
  title: "Core/Progress",
  component: Progress,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { value: 0 },
};

export const Half: Story = {
  args: { value: 50 },
};

export const Complete: Story = {
  args: { value: 100 },
};
