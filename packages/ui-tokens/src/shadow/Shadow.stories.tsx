import { Meta, StoryObj } from "@storybook/react-vite";
import { shadow } from "./shadow";
import { typography } from "../typography/typography";
import { scale } from "../scale/scale";

const ShadowScale = () => (
  <div
    style={{
      display: "flex",
      gap: 40,
      flexWrap: "wrap",
      padding: 40,
      backgroundColor: "white",
    }}
  >
    {Object.entries(shadow).map(([name, value]) => (
      <div
        key={name}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eef4fa",
          width: 100,
          height: 100,
          boxShadow: value,
          borderRadius: scale.lg,
        }}
      >
        <p style={{ fontSize: typography.fontSize.base, marginTop: 12 }}>
          {name}
        </p>
      </div>
    ))}
  </div>
);

const meta: Meta = { title: "Tokens/Shadow" };
export default meta;

export const Shadow: StoryObj = { render: () => <ShadowScale /> };
