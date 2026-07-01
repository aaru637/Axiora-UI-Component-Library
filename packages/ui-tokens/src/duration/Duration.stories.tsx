import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { duration, easing } from "./duration";

const DurationDemo = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div>
      <button
        onClick={() => setToggled((t) => !t)}
        style={{ marginBottom: 24 }}
      >
        Toggle
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Object.entries(duration).map(([name, value]) => (
          <div
            key={name}
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            <span style={{ width: 70, fontFamily: "monospace", fontSize: 12 }}>
              {name} ({value})
            </span>
            <div
              style={{
                width: 200,
                height: 24,
                background: "#e5e7eb",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  background: "#2563eb",
                  transform: toggled ? "translateX(176px)" : "translateX(0)",
                  transition: `transform ${value} ${easing.easeInOut}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = { title: "Tokens/Duration" };
export default meta;

export const AnimatedComparison: StoryObj = { render: () => <DurationDemo /> };
