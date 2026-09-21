import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

// AI-ASSISTED: Cursor
// PROMPT: Add Popover Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Popover",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong style={{ fontSize: 14 }}>Dimensions</strong>
          <p style={{ margin: 0, fontSize: 14 }}>
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
