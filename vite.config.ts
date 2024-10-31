/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc";
import { configDefaults } from "vitest/config";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    include: ["**/?(*.)test.ts?(x)"],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "./**/*.config.*",
        "./**/*.d.ts",
        "./**/*.types.ts",
      ],
    },
  },
});
