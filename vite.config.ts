import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    minify: "esbuild",

    rollupOptions: {
      input: "index.d.ts",
      output: {
        file: "index.js",
        dir: null,
        inlineDynamicImports: true,
        manualChunks: null,
      },
    },

    target: "ESNext",
  },
});
