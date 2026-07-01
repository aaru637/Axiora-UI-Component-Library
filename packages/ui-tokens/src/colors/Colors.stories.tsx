import { Meta, StoryObj } from "@storybook/react-vite";
import { colorPrimitive } from "./colors";
import { textStyle } from "../typography/typography";

const ColorsStyle = () => (
  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
    {Object.entries(colorPrimitive).map(([key, value]) => (
      <div style={{ width: 200 }}>
        <div style={{ ...textStyle["body-md"] }}>{key}</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {Object.entries(value).map(([name, color]) => (
            <div
              key={name}
              style={{ width: 48, height: 48, backgroundColor: color }}
            >
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const meta: Meta = { title: "Tokens/Colors" };
export default meta;

export const Colors: StoryObj = { render: () => <ColorsStyle /> };
