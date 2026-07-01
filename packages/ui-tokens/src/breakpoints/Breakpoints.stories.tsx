import { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useMemo, useRef, useState } from "react";
import { breakpointsPx } from "./breakpoints";

const BreakpointsTable = () => {
  const entries = useMemo(() => Object.entries(breakpointsPx), []);

  const containerRef = useRef<HTMLDivElement>(null);

  const getActiveBreakpoint = (width: number) =>
    [...entries].reverse().find(([, px]) => width >= px)?.[0] ?? "";

  const [width, setWidth] = useState(400);
  const [active, setActive] = useState(getActiveBreakpoint(400));

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return;

      // Measures the full width including padding and border.
      const newWidth = containerRef.current.getBoundingClientRect().width;

      setWidth(newWidth);
      setActive(getActiveBreakpoint(newWidth));
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [entries]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          width: width,
          height: 200,
          border: "1px solid #ccc",
          resize: "both",
          overflow: "auto",
          padding: 16,
          boxSizing: "border-box",
        }}
      >
        <strong>Width:</strong> {Math.round(width)}px
        <br />
        <strong>Active breakpoint:</strong> {active}
      </div>
      <div style={{ marginTop: 16 }}>
        {entries.map(([name, value]) => (
          <button
            key={name}
            onClick={() => setWidth(value)}
            style={{ marginRight: 8 }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: "Tokens/Breakpoints",
};

export default meta;

export const Table: StoryObj = {
  render: () => <BreakpointsTable />,
};
