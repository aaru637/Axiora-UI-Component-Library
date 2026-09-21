import type { Meta, StoryObj } from "@storybook/react-vite";

import { useMediaQuery } from "./useMediaQuery";

function UseMediaQueryDemo({
  query = "(min-width: 768px)",
}: {
  query?: string;
}) {
  const isWide = useMediaQuery(query);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0 }}>
        Query: <code>{query}</code>
      </p>
      <p style={{ margin: 0 }}>
        Matches: <strong>{isWide ? "yes" : "no"}</strong>
      </p>
      <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
        Resize the viewport to see the value update.
      </p>
    </div>
  );
}

const meta = {
  title: "Hooks/useMediaQuery",
  component: UseMediaQueryDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseMediaQueryDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TabletAndUp: Story = {
  args: { query: "(min-width: 768px)" },
};

export const PrefersDark: Story = {
  args: { query: "(prefers-color-scheme: dark)" },
};
