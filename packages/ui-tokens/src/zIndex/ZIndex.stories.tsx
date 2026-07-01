import { Meta, StoryObj } from "@storybook/react-vite";
import { zIndex } from "./zIndex";

const ZIndexTable = () => (
  <table style={{ borderCollapse: "collapse", fontSize: 14 }}>
    <thead>
      <tr>
        <th style={{ textAlign: "left", padding: "4px 16px 4px 0" }}>Token</th>
        <th style={{ textAlign: "left", padding: "4px 0" }}>Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(zIndex).map(([name, value]) => (
        <tr key={name}>
          <td style={{ padding: "4px 16px 4px 0", fontFamily: "monospace" }}>
            {name}
          </td>
          <td style={{ padding: "4px 0", color: "#6b7280" }}>{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const StackingDemo = () => (
  <div style={{ position: "relative", height: 160, width: 300 }}>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 140,
        height: 100,
        background: "#93c5fd",
        zIndex: zIndex.base,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
      }}
    >
      base
    </div>
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 90,
        width: 140,
        height: 100,
        background: "#60a5fa",
        zIndex: zIndex.dropdown,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
      }}
    >
      dropdown
    </div>
    <div
      style={{
        position: "absolute",
        top: 120,
        left: 150,
        width: 140,
        height: 100,
        background: "#2563eb",
        color: "#fff",
        zIndex: zIndex.modal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
      }}
    >
      modal
    </div>
  </div>
);

const meta: Meta = { title: "Tokens/ZIndex" };
export default meta;

export const Table: StoryObj = { render: () => <ZIndexTable /> };
export const StackingOrder: StoryObj = { render: () => <StackingDemo /> };
