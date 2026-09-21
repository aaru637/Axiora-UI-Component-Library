import type { Meta, StoryObj } from "@storybook/react-vite";

import { useKeyPress } from "./useKeyPress";

function UseKeyPressDemo() {
  const enterPressed = useKeyPress("Enter", {
    onPress: () => undefined,
  });
  const escapePressed = useKeyPress("Escape");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p style={{ margin: 0 }}>
        Enter held: <strong>{enterPressed ? "yes" : "no"}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Escape held: <strong>{escapePressed ? "yes" : "no"}</strong>
      </p>
      <p style={{ margin: 0, color: "var(--color-secondary, #6b7280)" }}>
        Focus this page and press Enter or Escape.
      </p>
    </div>
  );
}

const meta = {
  title: "Hooks/useKeyPress",
  component: UseKeyPressDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseKeyPressDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
