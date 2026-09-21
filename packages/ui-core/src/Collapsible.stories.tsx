import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "./Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

// AI-ASSISTED: Cursor
// PROMPT: Add Collapsible Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Collapsible",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="secondary">
            {open ? "Hide details" : "Show details"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p style={{ margin: "12px 0 0", fontSize: 14 }}>
            Hidden content revealed when expanded.
          </p>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
