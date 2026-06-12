import type { Meta, StoryObj } from "@storybook/react-vite";

import { spacing } from "./spacing";

function SpacingPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {Object.entries(spacing).map(([name, value]) => (
        <div
          key={name}
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <code style={{ width: "3rem" }}>{name}</code>
          <div
            style={{
              width: value,
              height: "1.5rem",
              backgroundColor: "#2563eb",
              borderRadius: "0.25rem",
            }}
          />
          <span style={{ color: "#64748b", fontSize: "0.875rem" }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Tokens/Spacing",
  component: SpacingPreview,
  tags: ["autodocs"],
} satisfies Meta<typeof SpacingPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
