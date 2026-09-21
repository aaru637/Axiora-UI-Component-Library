import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { useDebounce } from "./useDebounce";

function UseDebounceDemo({ delay = 400 }: { delay?: number }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, delay);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        Search
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type to debounce..."
          style={{ padding: 8, minWidth: 280 }}
        />
      </label>
      <p style={{ margin: 0 }}>
        Live: <strong>{query || "—"}</strong>
      </p>
      <p style={{ margin: 0 }}>
        Debounced ({delay}ms): <strong>{debouncedQuery || "—"}</strong>
      </p>
    </div>
  );
}

const meta = {
  title: "Hooks/useDebounce",
  component: UseDebounceDemo,
  tags: ["autodocs"],
  args: { delay: 400 },
} satisfies Meta<typeof UseDebounceDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FastDelay: Story = {
  args: { delay: 150 },
};
