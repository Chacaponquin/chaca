import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    testTimeout: 100000,
    outputFile: {
      html: "./test-report/index.html",
    },
    coverage: {
      provider: "istanbul",
      reporter: ["json", "html"],
      exclude: ["src/bin/**"],
      include: ["src/**"],
    },
  },
});
