import type { Meta, StoryObj } from "@storybook/react-vite";

import { useAsync } from "./useAsync";

function UseAsyncDemo() {
  const { data, error, loading, execute, reset } = useAsync(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    return { message: "Async task completed" };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={() => void execute()} disabled={loading}>
          Run task
        </button>
        <button type="button" onClick={reset} disabled={loading}>
          Reset
        </button>
      </div>
      {loading && <p style={{ margin: 0 }}>Loading…</p>}
      {data && (
        <p style={{ margin: 0 }}>
          Result: <strong>{data.message}</strong>
        </p>
      )}
      {error && (
        <p style={{ margin: 0, color: "var(--color-danger, #dc2626)" }}>
          Error: {error.message}
        </p>
      )}
    </div>
  );
}

const meta = {
  title: "Hooks/useAsync",
  component: UseAsyncDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseAsyncDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
