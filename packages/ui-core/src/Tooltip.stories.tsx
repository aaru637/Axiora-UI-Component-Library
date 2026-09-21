import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipWrapper,
} from "./Tooltip";

const meta = {
  title: "Core/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

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

export const Placements: Story = {
  render: () => (
    <TooltipProvider>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="secondary">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={700}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">700ms delay</Button>
        </TooltipTrigger>
        <TooltipContent>Appears after a longer delay.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const DisabledTrigger: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>
            <Button disabled>Disabled button</Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          Tooltip on disabled control via wrapper.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const LongContent: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover for details</Button>
        </TooltipTrigger>
        <TooltipContent style={{ maxWidth: 240 }}>
          This tooltip contains multiple lines of helpful context about the
          action you are about to take.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
