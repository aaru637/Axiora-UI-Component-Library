import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

// AI-ASSISTED: Cursor
// PROMPT: Add Tabs Storybook stories
// ACCEPTED-BY: dhinesh

const meta = {
  title: "Core/Tabs",
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
