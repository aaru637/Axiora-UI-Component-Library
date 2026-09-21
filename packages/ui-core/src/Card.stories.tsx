import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

// AI-ASSISTED: Cursor
// PROMPT: Add Card Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>Update your profile and preferences.</p>
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card>
      <CardContent style={{ paddingTop: 24 }}>
        <p style={{ margin: 0 }}>A simple card with content only.</p>
      </CardContent>
    </Card>
  ),
};
