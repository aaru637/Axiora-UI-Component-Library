import { Meta, StoryObj } from "@storybook/react-vite";
import { colorPrimitive } from "../colors/colors";
import { scale } from "./scale";

const RadiusStyle = () => (
  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
    {Object.entries(scale).map(([name, value]) => (
      <div
        key={name}
        style={{
          background: colorPrimitive.blue[100],
          borderRadius: value,
          width: 72,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "0 auto" }}>
          <span>
            {name}
            <br />
            <span style={{ color: colorPrimitive.gray[500] }}>{value}</span>
          </span>
        </div>
      </div>
    ))}
  </div>
);

const meta: Meta = { title: "Tokens/RadiusScale" };
export default meta;

export const RadiusScale: StoryObj = { render: () => <RadiusStyle /> };
