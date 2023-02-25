import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  markdown: {
    gfm: true,
    remarkPlugins: [],
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  integrations: [tailwind()],
});