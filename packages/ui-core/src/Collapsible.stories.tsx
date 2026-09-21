import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "./Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

const meta = {
  title: "Core/Collapsible",
  component: Collapsible,
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

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <Button variant="secondary">Toggle section</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p style={{ margin: "12px 0 0", fontSize: 14 }}>
          Starts expanded via defaultOpen.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Nested: Story = {
  render: function Render() {
    const [outer, setOuter] = useState(true);
    const [inner, setInner] = useState(false);

    return (
      <Collapsible open={outer} onOpenChange={setOuter}>
        <CollapsibleTrigger asChild>
          <Button variant="secondary">Outer section</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p style={{ margin: "12px 0 8px", fontSize: 14 }}>Outer content</p>
          <Collapsible open={inner} onOpenChange={setInner}>
            <CollapsibleTrigger asChild>
              <Button variant="secondary">Inner section</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p style={{ margin: "8px 0 0", fontSize: 14 }}>Nested content</p>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
