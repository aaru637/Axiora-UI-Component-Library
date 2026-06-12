import type { Meta, StoryObj } from "@storybook/react-vite";

import { typography } from "./typography";

function TypographyPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {Object.entries(typography.fontSize).map(([name, value]) => (
        <p
          key={name}
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: value,
            fontWeight: typography.fontWeight.medium,
            margin: 0,
          }}
        >
          {name} — The quick brown fox ({value})
        </p>
      ))}
    </div>
  );
}

const meta = {
  title: "Tokens/Typography",
  component: TypographyPreview,
  tags: ["autodocs"],
} satisfies Meta<typeof TypographyPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
