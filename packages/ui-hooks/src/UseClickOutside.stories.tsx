import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";

import { useClickOutside } from "./useClickOutside";

function UseClickOutsideDemo() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickOutside(panelRef, () => setOpen(false), open);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <button type="button" onClick={() => setOpen(true)}>
        Open panel
      </button>
      {open && (
        <div
          ref={panelRef}
          style={{
            padding: 16,
            border: "1px solid var(--color-border, #e5e7eb)",
            borderRadius: 8,
            maxWidth: 280,
          }}
        >
          <strong>Click outside to close</strong>
          <p style={{ margin: "8px 0 0", fontSize: 14 }}>
            Useful for dropdowns, popovers, and custom menus.
          </p>
        </div>
      )}
    </div>
  );
}

const meta = {
  title: "Hooks/useClickOutside",
  component: UseClickOutsideDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseClickOutsideDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
