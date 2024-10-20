import { defineConfig } from "tsup";

const dev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  clean: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  minify: !dev,
  target: "esnext",
  outDir: "dist",
  onSuccess: dev ? "node dist/index.js" : undefined,
});