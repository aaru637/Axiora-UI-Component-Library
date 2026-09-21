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

export const HeaderOnly: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const FooterActions: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Confirm action</CardTitle>
        <CardDescription>Review before continuing.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0 }}>This will update your subscription.</p>
      </CardContent>
      <CardFooter style={{ display: "flex", gap: 8 }}>
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const Stacked: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0 }}>Pro — $29/mo</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0 }}>Next charge on Oct 1.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
