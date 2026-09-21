import { mergeConfig } from "vitest/config";
import baseConfig from "../../vitest.base.config";

export default mergeConfig(baseConfig, {
  test: {
    environment: "jsdom",
    setupFiles: ["src/test/setup.ts"],
    css: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["src/**/*.stories.{ts,tsx}"],
  },
});
