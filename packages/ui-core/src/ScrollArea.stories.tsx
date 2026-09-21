import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea, ScrollBar } from "./ScrollArea";
import { Separator } from "./Separator";

const meta = {
  title: "Core/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj;

const tags = Array.from({ length: 20 }, (_, i) => `Tag ${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea
      style={{
        height: 200,
        width: 240,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
      }}
    >
      <div style={{ padding: 16 }}>
        {tags.map((tag) => (
          <div key={tag}>
            <div style={{ padding: "8px 0", fontSize: 14 }}>{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea
      style={{
        width: 320,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
      }}
    >
      <div style={{ display: "flex", width: 800, padding: 16, gap: 16 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            style={{
              minWidth: 120,
              padding: 16,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              fontSize: 14,
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea
      style={{
        height: 200,
        width: 280,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
      }}
    >
      <div style={{ width: 480, padding: 16 }}>
        {tags.map((tag) => (
          <div key={tag} style={{ whiteSpace: "nowrap" }}>
            <span
              style={{
                padding: "8px 0",
                fontSize: 14,
                display: "inline-block",
              }}
            >
              {tag} — extra wide content that overflows horizontally
            </span>
            <Separator />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
