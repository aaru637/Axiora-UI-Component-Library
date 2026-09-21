import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../../ui-core/src/Button";
import { Input } from "../../../ui-core/src/Input";

const meta = {
  title: "Themes/ThemeProvider",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;

type Story = StoryObj;

function ThemePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: 320,
      }}
    >
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Input label="Themed Input" placeholder="Type here..." />
    </div>
  );
}

export const Default: Story = {
  globals: { axTheme: "default" },
  render: () => <ThemePreview />,
};

export const Dark: Story = {
  globals: { axTheme: "dark" },
  render: () => <ThemePreview />,
};

export const VioletBrand: Story = {
  globals: { axTheme: "violet" },
  render: () => <ThemePreview />,
};

export const EmeraldBrand: Story = {
  globals: { axTheme: "emerald" },
  render: () => <ThemePreview />,
};
