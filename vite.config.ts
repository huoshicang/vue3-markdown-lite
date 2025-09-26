import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isLib = process.env.BUILD_LIB === "true";

export default defineConfig({
  root: isLib ? "." : "example",
  plugins: [
    vue(),
    ...(isLib ? [dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json"
    })] : []),

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: isLib
    ? {
      lib: {
        entry: "./example/main.ts",
        name: "Vue3MarkdownLite",
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    }
    : undefined,
});
