import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "./Button";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Input } from "./Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Core/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p style={{ margin: "16px 0 0" }}>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p style={{ margin: "16px 0 0" }}>Change your password here.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <p style={{ margin: "16px 0 0" }}>General settings.</p>
      </TabsContent>
      <TabsContent value="team">
        <p style={{ margin: "16px 0 0" }}>Team settings.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [tab, setTab] = useState("account");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p style={{ margin: "16px 0 0" }}>Active tab: account</p>
          </TabsContent>
          <TabsContent value="password">
            <p style={{ margin: "16px 0 0" }}>Active tab: password</p>
          </TabsContent>
        </Tabs>
        <Button variant="secondary" onClick={() => setTab("password")}>
          Switch to password
        </Button>
      </div>
    );
  },
};

export const RichPanels: Story = {
  render: () => (
    <Tabs defaultValue="profile" style={{ width: "100%" }}>
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card style={{ marginTop: 16 }}>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Input label="Display name" defaultValue="Jane Doe" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <p style={{ margin: "16px 0 0" }}>Notification preferences.</p>
      </TabsContent>
      <TabsContent value="security">
        <p style={{ margin: "16px 0 0" }}>Security settings.</p>
      </TabsContent>
    </Tabs>
  ),
};
