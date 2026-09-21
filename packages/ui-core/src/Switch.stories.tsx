import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import { Label } from "./Label";
import { Switch } from "./Switch";

const meta = {
  title: "Core/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithLabel: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        width: 280,
      }}
    >
      <Label htmlFor="airplane-mode">Airplane mode</Label>
      <Switch id="airplane-mode" />
    </div>
  ),
};

export const ComparedToButton: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button variant="secondary">Off</Button>
        <Switch />
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button>On</Button>
        <Switch defaultChecked />
      </div>
    </div>
  ),
};
