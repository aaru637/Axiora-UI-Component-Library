import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";

import { useIntersectionObserver } from "./useIntersectionObserver";

function UseIntersectionObserverDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0 }}>
        Target visible: <strong>{isVisible ? "yes" : "no"}</strong>
      </p>
      <div
        style={{
          height: 200,
          overflow: "auto",
          border: "1px solid var(--color-border, #e5e7eb)",
          borderRadius: 8,
          padding: 16,
        }}
      >
        <p style={{ margin: "0 0 120px" }}>Scroll down to reveal the target.</p>
        <div
          ref={ref}
          style={{
            padding: 24,
            borderRadius: 8,
            backgroundColor: isVisible
              ? "color-mix(in srgb, var(--color-primary, #2563eb) 12%, transparent)"
              : "color-mix(in srgb, var(--color-foreground, #111827) 6%, transparent)",
            border: "1px solid var(--color-border, #e5e7eb)",
          }}
        >
          Observed element
        </div>
        <p style={{ margin: "120px 0 0" }}>End of scroll area</p>
      </div>
    </div>
  );
}

const meta = {
  title: "Hooks/useIntersectionObserver",
  component: UseIntersectionObserverDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseIntersectionObserverDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
