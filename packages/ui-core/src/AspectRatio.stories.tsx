import type { Meta, StoryObj } from "@storybook/react-vite";

import { AspectRatio } from "./AspectRatio";

// AI-ASSISTED: Cursor
// PROMPT: Add AspectRatio Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/AspectRatio",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Video: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-base, 8px)",
          color: "var(--color-foreground)",
          fontSize: 14,
        }}
      >
        16:9 content area
      </div>
    </AspectRatio>
  ),
};

export const Square: Story = {
  render: () => (
    <AspectRatio ratio={1}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-text-on-primary)",
          borderRadius: "var(--radius-base, 8px)",
          fontSize: 14,
        }}
      >
        1:1
      </div>
    </AspectRatio>
  ),
};
