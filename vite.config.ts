import { fileURLToPath, URL } from "node:url";
import VitePluginHtmlEnv from "vite-plugin-html-env";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginHtmlEnv({
      compiler: true,
      // compiler: false // old
      prefix: "<{",
      suffix: "}>",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
