import type { Meta, StoryObj } from "@storybook/react-vite";

import { darkTheme, lightTheme, type Theme } from "./index";

function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.typography.fontFamily.sans,
        padding: theme.spacing[6],
        borderRadius: theme.spacing[2],
        minWidth: "20rem",
      }}
    >
      <h3 style={{ margin: `0 0 ${theme.spacing[4]}` }}>{theme.name} theme</h3>
      <div
        style={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing[4],
          borderRadius: theme.spacing[2],
          marginBottom: theme.spacing[4],
        }}
      >
        Surface card
      </div>
      <button
        type="button"
        style={{
          backgroundColor: theme.colors.primary,
          border: "none",
          borderRadius: theme.spacing[2],
          color: "#ffffff",
          cursor: "pointer",
          fontSize: theme.typography.fontSize.base,
          padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
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
  globals: {
    backgrounds: {
      value: "dark",
    },
  },
};
