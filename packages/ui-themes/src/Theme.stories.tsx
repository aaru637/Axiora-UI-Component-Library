import type { Meta, StoryObj } from "@storybook/react-vite";

import { darkTheme, lightTheme, type Theme } from "./index";

function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily.sans,
        padding: theme.spacing.lg,
        borderRadius: theme.spacing.sm,
        minWidth: "20rem",
      }}
    >
      <h3 style={{ margin: `0 0 ${theme.spacing.md}` }}>{theme.name} theme</h3>
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.md,
          borderRadius: theme.spacing.sm,
          marginBottom: theme.spacing.md,
        }}
      >
        Surface card
      </div>
      <button
        type="button"
        style={{
          backgroundColor: theme.colors.primary,
          border: "none",
          borderRadius: theme.spacing.sm,
          color: "#ffffff",
          cursor: "pointer",
          fontSize: theme.typography.fontSize.md,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        }}
      >
        Primary action
      </button>
    </div>
  );
}

const meta = {
  title: "Themes/Preview",
  component: ThemePreview,
  tags: ["autodocs"],
  args: {
    theme: lightTheme,
  },
} satisfies Meta<typeof ThemePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: { theme: lightTheme },
};

export const Dark: Story = {
  args: { theme: darkTheme },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
