import type { Preview } from "@storybook/react-vite";
import React, { useEffect } from "react";
import { ThemeProvider } from "../packages/ui-themes/src/context/ThemeProvider";
import {
  isDarkSampleTheme,
  resolveSampleTheme,
  sampleThemeOptions,
} from "../packages/ui-themes/src/presets/sampleThemes";
import "../packages/ui-core/src/styles/components.css";

// AI-ASSISTED: Cursor
// PROMPT: Sync canvas background with theme mode; single ThemeProvider
// ACCEPTED-BY: dhinesh

function ThemedStoryWrapper({
  themeKey,
  children,
}: {
  themeKey: string;
  children: React.ReactNode;
}) {
  const theme = resolveSampleTheme(themeKey);
  const isDark = isDarkSampleTheme(themeKey);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.backgroundColor = isDark ? "#0f172a" : "#f8fafc";
    document.body.style.color = isDark ? "#f9fafb" : "#111827";
  }, [isDark]);

  return (
    <ThemeProvider key={themeKey} theme={theme}>
      <div
        className="ax-themed"
        style={{
          padding: 24,
          borderRadius: 8,
          minWidth: 280,
          backgroundColor: "var(--color-background)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-border)",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}

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
      disable: true,
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

  globalTypes: {
    axTheme: {
      description: "Axiora design system theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: sampleThemeOptions,
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    axTheme: "default",
  },

  decorators: [
    (Story, context) => {
      const themeKey = (context.globals.axTheme as string) ?? "default";

      return (
        <ThemedStoryWrapper themeKey={themeKey}>
          <Story />
        </ThemedStoryWrapper>
      );
    },
  ],
};

export default preview;
