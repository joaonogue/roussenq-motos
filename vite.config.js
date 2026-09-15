import { defineConfig } from "vite";
import config from "./data/site.json" with { type: "json" };
export default defineConfig({
  base: process.env.BASE_PATH || config.basePath,
  build: { target: "es2022", assetsInlineLimit: 0 },
});
