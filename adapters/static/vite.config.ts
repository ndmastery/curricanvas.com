import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { resolve } from "path";

export default defineConfig(() => ({
  build: {
    outDir: "build/server",
    ssr: true,
    rollupOptions: {
      input: ["@qwik-city-plan"],
    },
  },
  plugins: [
    qwikCity(),
    qwikVite({ client: { outDir: "build/client" } }),
    staticAdapter({
      origin: "https://curricanvas.com",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": resolve(import.meta.dirname!, "../../src"),
    },
  },
}));
