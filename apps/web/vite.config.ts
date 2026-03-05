import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(jsx|tsx|mdx)$/ }),
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
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/tests/**",
      "**/*.spec.ts",
      "**/*.spec.tsx",
    ],
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
