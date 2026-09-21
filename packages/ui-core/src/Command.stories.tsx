import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

import { Button } from "./Button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./Command";

const meta = {
  title: "Core/Command",
  component: Command,
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj;

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open command palette (Ctrl+K)
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search commands…" />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="profile" onSelect={() => setOpen(false)}>
              Profile
            </CommandItem>
            <CommandItem value="settings" onSelect={() => setOpen(false)}>
              Settings
            </CommandItem>
            <CommandItem value="billing" onSelect={() => setOpen(false)}>
              Billing
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="new-project" onSelect={() => setOpen(false)}>
              New project
            </CommandItem>
            <CommandItem value="invite-team" onSelect={() => setOpen(false)}>
              Invite team
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export const CommandPalette: Story = {
  render: () => <CommandPaletteDemo />,
};

export const Inline: Story = {
  render: () => (
    <div
      style={{
        width: 360,
        border: "1px solid var(--color-border, #e5e7eb)",
        borderRadius: 8,
      }}
    >
      <Command>
        <CommandInput placeholder="Filter items…" />
        <CommandList>
          <CommandGroup heading="Items">
            <CommandItem value="dashboard">Dashboard</CommandItem>
            <CommandItem value="reports">Reports</CommandItem>
            <CommandItem value="analytics">Analytics</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
