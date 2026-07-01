import { Meta, StoryObj } from "@storybook/react-vite";
import { spacing } from "./spacing";
import { colorPrimitive } from "../colors/colors";

// --- Visual scale: each row = token name, px value, and a proportional bar ---
const SpacingScale = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {Object.entries(spacing).map(([name, value]) => (
      <div
        key={name}
        style={{ display: "flex", alignItems: "center", gap: 16 }}
      >
        <span
          style={{
            width: 128,
            fontFamily: "monospace",
            fontSize: 12,
            color: colorPrimitive.gray[500],
            textAlign: "right",
          }}
        >
          spacing[{name}]
        </span>
        <span
          style={{
            width: 56,
            fontFamily: "monospace",
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          {value}
        </span>
        <div
          style={{
            width: value,
            height: 16,
            background: "#3b82f6",
            borderRadius: 2,
            flexShrink: 0,
          }}
        />
      </div>
    ))}
  </div>
);

const meta: Meta = {
  title: "Tokens/Spacing",
};
export default meta;

type Story = StoryObj;

export const Scale: Story = { render: () => <SpacingScale /> };
