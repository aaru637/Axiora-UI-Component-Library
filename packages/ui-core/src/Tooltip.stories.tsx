import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipWrapper,
} from "./Tooltip";

// AI-ASSISTED: Cursor
// PROMPT: Add Tooltip Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Tooltip",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const Wrapper: Story = {
  render: () => (
    <TooltipWrapper content="Quick tooltip via wrapper">
      <Button>Wrapper API</Button>
    </TooltipWrapper>
  ),
};
