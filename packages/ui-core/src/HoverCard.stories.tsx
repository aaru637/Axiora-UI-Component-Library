import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

// AI-ASSISTED: Cursor
// PROMPT: Add HoverCard Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/HoverCard",
  tags: ["autodocs"],
} satisfies Meta;

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
