import type { Meta, StoryObj } from "@storybook/react-vite";

import { Alert, AlertDescription, AlertTitle } from "./Alert";
import { Button } from "./Button";
import { Progress } from "./Progress";
import { Skeleton } from "./Skeleton";
import { Spinner } from "./Spinner";
import { Toaster } from "./Toast";
import { toast } from "./useToast";

const meta = {
  title: "Core/Feedback",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllFeedback: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 480,
      }}
    >
      <Alert>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Inline alerts for persistent context on the page.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>

      <Progress value={65} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Skeleton style={{ height: 16, width: "100%" }} />
        <Skeleton style={{ height: 16, width: "80%" }} />
        <Skeleton style={{ height: 40, width: "60%" }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Button
          onClick={() =>
            toast({
              title: "Saved",
              description: "Your draft was saved.",
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
              title: "Upload failed",
              description: "The file exceeds the size limit.",
            })
          }
        >
          Show error toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: "Undo available",
              description: "Your last action can be reversed.",
              actionLabel: "Undo",
              onAction: () =>
                toast({ title: "Undone", description: "Action reversed." }),
            })
          }
        >
          Toast with action
        </Button>
      </div>

      <Toaster />
    </div>
  ),
};
