import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    testTimeout: 100000,
    coverage: {
      provider: "istanbul",
      reporter: ["json", "html"],
    },
  },
});
