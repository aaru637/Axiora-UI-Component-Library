import { Meta, StoryObj } from "@storybook/react-vite";
import { opacity } from "./opacity";

const OpacityScale = () => (
  <div
    style={{
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      background: "#111827",
      padding: 24,
    }}
  >
    {Object.entries(opacity).map(([name, value]) => (
      <div key={name} style={{ textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            background: "#3b82f6",
            opacity: value,
            borderRadius: 8,
          }}
        />
        <p style={{ fontSize: 12, marginTop: 8, color: "#fff" }}>
          {name}
          <br />
          <span style={{ color: "#9ca3af" }}>{value}</span>
        </p>
      </div>
    ))}
  </div>
);

const meta: Meta = { title: "Tokens/Opacity" };
export default meta;

export const Scale: StoryObj = { render: () => <OpacityScale /> };
