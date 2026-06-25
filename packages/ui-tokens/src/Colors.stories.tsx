import type { Meta, StoryObj } from "@storybook/react-vite";

import { colors } from "./colors";

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "8rem",
      }}
    >
      <div
        style={{
          backgroundColor: value,
          borderRadius: "0.5rem",
          height: "4rem",
          border: "1px solid #e2e8f0",
        }}
      />
      <div>
        <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{value}</div>
      </div>
    </div>
  );
}

function ColorsPreview() {
  const flatColors = Object.entries(colors).filter(
    ([, value]) => typeof value === "string",
  ) as [string, string][];

  const neutralColors = Object.entries(colors.neutral).map(
    ([name, value]) => [`neutral.${name}`, value] as [string, string],
  );

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
      {[...flatColors, ...neutralColors].map(([name, value]) => (
        <ColorSwatch key={name} name={name} value={value} />
      ))}
    </div>
  );
}

const meta = {
  title: "Tokens/Colors",
  component: ColorsPreview,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Color tokens used across Axiora UI components.",
      },
    },
  },
} satisfies Meta<typeof ColorsPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
