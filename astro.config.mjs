import { loadEnv } from "vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

const { PUBLIC_SITE_URL } = loadEnv(import.meta.env.MODE, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL,
  markdown: {
    gfm: true,
    remarkPlugins: [],
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  integrations: [tailwind()],
});
