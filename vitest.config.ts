/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    reporters: ["basic"],
    coverage: {
      provider: "istanbul",
    },
    setupFiles: ["./src/test/setupFiles/mongodb.setup.ts"],
  },
});
