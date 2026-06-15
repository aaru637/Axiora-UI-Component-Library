import { mergeConfig } from "vitest/config";
import baseConfig from "../../vitest.base.config";

export default mergeConfig(baseConfig, {
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
    exclude: ["src/**/*.stories.{ts,tsx}"],
  },
});
