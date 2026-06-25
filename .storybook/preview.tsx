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
      options: {
        light: { name: "light", value: "#f8fafc" },
        dark: { name: "dark", value: "#0f172a" },
      },
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

  initialGlobals: {
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
