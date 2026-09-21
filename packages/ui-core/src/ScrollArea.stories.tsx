import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea } from "./ScrollArea";
import { Separator } from "./Separator";

// AI-ASSISTED: Cursor
// PROMPT: Add ScrollArea Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/ScrollArea",
  tags: ["autodocs"],
} satisfies Meta;

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
