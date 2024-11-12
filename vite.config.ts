/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

const exclude = [
  ...configDefaults.exclude,
  "./**/*.config.*",
  "./**/*.d.ts",
  "./**/*.types.ts",
  "./**/*.test.ts",
  "./**/*.test.tsx",
];

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    include: ["**/?(*.)test.ts?(x)"],
    coverage: {
      exclude,
    },
  },
  server: {
    host: "127.0.0.1",
  },
});
