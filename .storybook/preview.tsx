import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f8fafc" },
        { name: "dark", value: "#0f172a" },
      ],
    },
    a11y: {
      test: "todo",
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: ["Tokens", "Themes", "Hooks", "Core"],
      },
    },
  },
};

export default preview;
