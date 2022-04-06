import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
const path = require("path");
export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": {},
    "process.env.BASE_URL": '"/"'
  },
  server: {
    host: "localhost",
    port: 3001
  },
  base: "./",
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
