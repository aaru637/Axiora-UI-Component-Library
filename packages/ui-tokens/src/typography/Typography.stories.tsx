import type { Meta, StoryObj } from "@storybook/react-vite";
import { textStyle, typography } from "./typography";
import { colorPrimitive } from "../colors/colors";

const FontSizeScale = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {Object.entries(typography.fontSize).map(([name, size]) => (
      <div
        key={name}
        style={{ display: "flex", alignItems: "baseline", gap: 16 }}
      >
        <span
          style={{
            width: 60,
            fontFamily: "monospace",
            fontSize: 12,
            color: colorPrimitive.gray[500],
          }}
        >
          {name}
        </span>
        <span
          style={{
            width: 50,
            fontFamily: "monospace",
            fontSize: 12,
            color: colorPrimitive.gray[500],
          }}
        >
          {size}
        </span>
        <span style={{ fontSize: size }}>The quick brown fox.</span>
      </div>
    ))}
  </div>
);

const FontWeightScale = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {Object.entries(typography.fontWeight).map(([name, weight]) => (
      <p key={name} style={{ fontSize: 20, fontWeight: weight, margin: 0 }}>
        {name} ({weight}) - The quick brown fox.
      </p>
    ))}
  </div>
);

const TextStyles = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {Object.entries(textStyle).map(([name, style]) => (
      <div key={name}>
        <p
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            color: colorPrimitive.gray[500],
            margin: "0 0 4px",
          }}
        >
          {name}
        </p>
        <p style={{ ...style, margin: 0 }}>
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    ))}
  </div>
);

const meta: Meta = { title: "Tokens/Typography" };
export default meta;

export const FontSize: StoryObj = { render: () => <FontSizeScale /> };
export const FontWeight: StoryObj = { render: () => <FontWeightScale /> };
export const TextStylesComposed: StoryObj = { render: () => <TextStyles /> };
