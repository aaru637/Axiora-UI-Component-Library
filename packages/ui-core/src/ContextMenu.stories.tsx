import type { Meta, StoryObj } from "@storybook/react-vite";

import { useState } from "react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

const meta = {
  title: "Core/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 280,
          height: 120,
          border: "1px dashed var(--color-border)",
          borderRadius: "var(--radius-base, 8px)",
          fontSize: 14,
          color: "var(--color-secondary)",
        }}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem disabled>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Save as…</ContextMenuItem>
        <ContextMenuItem>Print…</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 280,
          height: 120,
          border: "1px dashed var(--color-border)",
          borderRadius: "var(--radius-base, 8px)",
          fontSize: 14,
        }}
      >
        Right click for submenu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New tab</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page as…</ContextMenuItem>
            <ContextMenuItem>Create shortcut</ContextMenuItem>
            <ContextMenuItem>Developer tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Settings</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxAndRadio: Story = {
  render: function Render() {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [person, setPerson] = useState("pedro");

    return (
      <ContextMenu>
        <ContextMenuTrigger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            height: 120,
            border: "1px dashed var(--color-border)",
            borderRadius: "var(--radius-base, 8px)",
            fontSize: 14,
          }}
        >
          Right click for options
        </ContextMenuTrigger>
        <ContextMenuContent style={{ width: 220 }}>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={showBookmarks}
            onCheckedChange={(checked) => setShowBookmarks(checked === true)}
          >
            Show bookmarks bar
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
            <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
};
