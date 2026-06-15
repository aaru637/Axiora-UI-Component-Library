import { mergeConfig } from "vitest/config";
import baseConfig from "../../vitest.base.config";

export default mergeConfig(baseConfig, {
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["src/**/*.stories.{ts,tsx}"],
  },
});
