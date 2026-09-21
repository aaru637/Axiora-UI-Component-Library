import type { Meta, StoryObj } from "@storybook/react-vite";

import { useFetch } from "./useFetch";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function UseFetchDemo({ url }: { url: string | null }) {
  const { data, error, loading, refetch } = useFetch<Todo>(url);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <button type="button" onClick={refetch} disabled={loading || !url}>
        Refetch
      </button>
      {loading && <p style={{ margin: 0 }}>Loading…</p>}
      {error && (
        <p style={{ margin: 0, color: "var(--color-danger, #dc2626)" }}>
          {error.message}
        </p>
      )}
      {data && (
        <pre
          style={{
            margin: 0,
            padding: 12,
            borderRadius: 8,
            background:
              "color-mix(in srgb, var(--color-foreground, #111827) 5%, transparent)",
            fontSize: 13,
            overflow: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

const meta = {
  title: "Hooks/useFetch",
  component: UseFetchDemo,
  tags: ["autodocs"],
  args: {
    url: "https://jsonplaceholder.typicode.com/todos/1",
  },
} satisfies Meta<typeof UseFetchDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { url: null },
};
