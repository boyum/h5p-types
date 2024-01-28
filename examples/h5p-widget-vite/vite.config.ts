import jsonDts from "unplugin-json-dts/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: "esbuild",

    lib: {
      entry: ["src/h5p-widget-vite.ts"],
      formats: ["iife"],
      name: "H5PWidgetVite",
      fileName: () => "h5p-content-type-vite.js",
    },

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // For some reason, an H5P content type's style file cannot be named `style.css`.
          // Therefore we need to change the name before saving it.
          if (assetInfo.name === "style.css") {
            return "h5p-widget-vite.css";
          }

          return assetInfo.name ?? "";
        },
      },
    },
  },

  plugins: [jsonDts()],
});
