import type { Meta, StoryObj } from "@storybook/react-vite";

import { useSessionStorage } from "./useSessionStorage";

function UseSessionStorageDemo() {
  const [tab, setTab, clearTab] = useSessionStorage("demo-tab", "home");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0 }}>
        Active tab (session): <strong>{tab}</strong>
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={() => setTab("home")}>
          Home
        </button>
        <button type="button" onClick={() => setTab("settings")}>
          Settings
        </button>
        <button type="button" onClick={clearTab}>
          Clear
        </button>
      </div>
    </div>
  );
}

const meta = {
  title: "Hooks/useSessionStorage",
  component: UseSessionStorageDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseSessionStorageDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
