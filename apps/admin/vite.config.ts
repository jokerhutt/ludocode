import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ludocode/types": path.resolve(__dirname, "../../packages/types"),
      "@ludocode/external": path.resolve(__dirname, "../../packages/external"),
      "@ludocode/design-system": path.resolve(
        __dirname,
        "../../packages/design-system"
      ),
      "@ludocode/hooks": path.resolve(__dirname, "../../packages/hooks"),
    },
  },
});
