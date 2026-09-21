import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const meta = {
  title: "Core/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="secondary">@axiora</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: "flex", gap: 16 }}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Axiora" />
            <AvatarFallback>AX</AvatarFallback>
          </Avatar>
          <div>
            <strong style={{ fontSize: 14 }}>@axiora</strong>
            <p style={{ margin: "4px 0 0", fontSize: 14 }}>
              The Axiora UI component library.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const PlacementRight: Story = {
  render: () => (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="secondary">Hover (right)</Button>
      </HoverCardTrigger>
      <HoverCardContent side="right">
        <p style={{ margin: 0, fontSize: 14 }}>Opens to the right.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <HoverCard openDelay={500} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="secondary">Slow open (500ms)</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p style={{ margin: 0, fontSize: 14 }}>Custom open/close delays.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <HoverCard open={open} onOpenChange={setOpen}>
          <HoverCardTrigger asChild>
            <Button variant="secondary">@controlled</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <p style={{ margin: 0, fontSize: 14 }}>Controlled hover card.</p>
          </HoverCardContent>
        </HoverCard>
        <Button onClick={() => setOpen((v) => !v)}>
          {open ? "Hide" : "Show"}
        </Button>
      </div>
    );
  },
};
