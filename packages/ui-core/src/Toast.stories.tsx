import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import { Toaster } from "./Toast";
import { toast } from "./useToast";

const meta = {
  title: "Core/Toast",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

function ToastDemo() {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Button
          onClick={() =>
            toast({
              title: "Saved",
              description: "Your changes have been saved successfully.",
            })
          }
        >
          Show toast
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong. Please try again.",
            })
          }
        >
          Show error
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: "Scheduled",
              description: "Meeting added to your calendar.",
              duration: 10000,
            })
          }
        >
          Long duration
        </Button>
      </div>
      <Toaster />
    </>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const TitleOnly: Story = {
  render: () => (
    <>
      <Button onClick={() => toast({ title: "Profile updated" })}>
        Show title only
      </Button>
      <Toaster />
    </>
  ),
};

export const Destructive: Story = {
  render: () => (
    <>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            variant: "destructive",
            title: "Delete failed",
            description: "You do not have permission to delete this item.",
          })
        }
      >
        Show destructive toast
      </Button>
      <Toaster />
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Email archived",
            description: "You can undo this action.",
            actionLabel: "Undo",
            onAction: () =>
              toast({
                title: "Restored",
                description: "Email moved back to inbox.",
              }),
          })
        }
      >
        Show toast with action
      </Button>
      <Toaster />
    </>
  ),
};
