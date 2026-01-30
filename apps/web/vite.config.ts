import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    allowedHosts: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
    clearMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ludocode/types": path.resolve(__dirname, "../../packages/types"),
      "@ludocode/external": path.resolve(__dirname, "../../packages/external"),
      "@ludocode/api": path.resolve(__dirname, "../../packages/api"),
      "@ludocode/design-system": path.resolve(
        __dirname,
        "../../packages/design-system",
      ),
      "@ludocode/hooks": path.resolve(__dirname, "../../packages/hooks"),
    },
  },
});
