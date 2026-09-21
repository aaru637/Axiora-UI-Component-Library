import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./Skeleton";

const meta = {
  title: "Core/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { width: 200, height: 20 },
};

export const Circle: Story = {
  args: { width: 48, height: 48, style: { borderRadius: "50%" } },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}
    >
      <Skeleton width="100%" height={120} />
      <Skeleton width="80%" height={16} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
};
