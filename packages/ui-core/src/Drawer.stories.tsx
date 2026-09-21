import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "./Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";
import { Input } from "./Input";
import { Separator } from "./Separator";

const meta = {
  title: "Core/Drawer",
  component: Drawer,
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when done.
          </DrawerDescription>
        </DrawerHeader>
        <Input label="Name" defaultValue="Jane Doe" />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open left</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>
            Browse sections from the side panel.
          </DrawerDescription>
        </DrawerHeader>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Button variant="secondary">Dashboard</Button>
          <Button variant="secondary">Settings</Button>
          <Button variant="secondary">Help</Button>
        </nav>
      </DrawerContent>
    </Drawer>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open bottom sheet</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom">
        <DrawerHeader>
          <DrawerTitle>Share link</DrawerTitle>
          <DrawerDescription>
            Anyone with this link can view the page.
          </DrawerDescription>
        </DrawerHeader>
        <Input
          label="URL"
          defaultValue="https://example.com/share/abc123"
          readOnly
        />
      </DrawerContent>
    </Drawer>
  ),
};

export const Top: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open top</Button>
      </DrawerTrigger>
      <DrawerContent side="top">
        <DrawerHeader>
          <DrawerTitle>Announcement</DrawerTitle>
          <DrawerDescription>
            A new version of the app is available.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Update now</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button onClick={() => setOpen(true)}>Open controlled</Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled drawer</DrawerTitle>
              <DrawerDescription>
                Visibility is managed externally.
              </DrawerDescription>
            </DrawerHeader>
            <Separator />
            <p style={{ margin: 0, fontSize: 14 }}>Drawer body content.</p>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">No close icon</Button>
      </DrawerTrigger>
      <DrawerContent showClose={false}>
        <DrawerHeader>
          <DrawerTitle>Minimal drawer</DrawerTitle>
          <DrawerDescription>
            Close via overlay click or Escape.
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
};
