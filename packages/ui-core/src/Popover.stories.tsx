import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "./Button";
import { Input } from "./Input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./Popover";

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

export const PlacementTop: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open above</Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="center">
        <p style={{ margin: 0, fontSize: 14 }}>Popover opens on top.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="secondary">Controlled popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p style={{ margin: 0, fontSize: 14 }}>Open state is controlled.</p>
          </PopoverContent>
        </Popover>
        <Button onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Open"} externally
        </Button>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Set width</Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 280 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <strong style={{ fontSize: 14 }}>Dimensions</strong>
          <Input label="Width" defaultValue="100%" />
          <Input label="Height" defaultValue="auto" />
          <Button>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithAnchor: Story = {
  render: () => (
    <Popover>
      <PopoverAnchor asChild>
        <span
          style={{
            display: "inline-block",
            padding: "4px 8px",
            border: "1px dashed var(--color-border)",
            borderRadius: 4,
            fontSize: 13,
          }}
        >
          Anchor element
        </span>
      </PopoverAnchor>
      <PopoverTrigger asChild>
        <Button variant="secondary" style={{ marginLeft: 8 }}>
          Open anchored
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p style={{ margin: 0, fontSize: 14 }}>
          Positioned relative to anchor.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
