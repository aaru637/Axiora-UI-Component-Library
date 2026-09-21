import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";
import { Button } from "./Button";

const meta = {
  title: "Core/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="danger">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="danger">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Confirm: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Save changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Your profile will be updated with the new information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Open alert
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Controlled dialog</AlertDialogTitle>
              <AlertDialogDescription>
                Open state is managed externally.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setOpen(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
};
