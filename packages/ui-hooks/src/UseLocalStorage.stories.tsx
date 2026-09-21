import type { Meta, StoryObj } from "@storybook/react-vite";

import { useLocalStorage } from "./useLocalStorage";

function UseLocalStorageDemo({
  storageKey = "axiora-theme",
}: {
  storageKey?: string;
}) {
  const [theme, setTheme, removeTheme] = useLocalStorage(storageKey, "light");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ margin: 0 }}>
        Stored theme: <strong>{theme}</strong>
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => setTheme("light")}>
          Light
        </button>
        <button type="button" onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button type="button" onClick={() => removeTheme()}>
          Reset
        </button>
      </div>
    </div>
  );
}

const meta = {
  title: "Hooks/useLocalStorage",
  component: UseLocalStorageDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof UseLocalStorageDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
