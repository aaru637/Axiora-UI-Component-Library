import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../packages/ui-tokens/src/**/*.stories.@(ts|tsx)",
    "../packages/ui-themes/src/**/*.stories.@(ts|tsx)",
    "../packages/ui-hooks/src/**/*.stories.@(ts|tsx)",
    "../packages/ui-core/src/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: "@storybook/react-vite",
  docs: {
    defaultName: "Documentation",
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@axiora-ui/ui-core": path.resolve(
            dirname,
            "../packages/ui-core/src",
          ),
          "@axiora-ui/ui-hooks": path.resolve(
            dirname,
            "../packages/ui-hooks/src",
          ),
          "@axiora-ui/ui-themes": path.resolve(
            dirname,
            "../packages/ui-themes/src",
          ),
          "@axiora-ui/ui-tokens": path.resolve(
            dirname,
            "../packages/ui-tokens/src",
          ),
        },
      },
      server: {
        watch: {
          ignored: [
            "**/node_modules/**",
            "**/.pnpm-store/**",
            "**/dist/**",
            "**/.turbo/**",
          ],
        },
      },
    });
  },
};

export default config;
