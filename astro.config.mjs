import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
// Markdown plugins
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import linkify from "rehype-autolink-headings";
import addA11y from "./plugins/a11y-navigation";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
const { PUBLIC_SITE_URL } = loadEnv(import.meta.env.MODE, process.cwd(), "");

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL,
  markdown: {
    gfm: true,
    rehypePlugins: [rehypeHeadingIds, [linkify, { behavior: "wrap" }], addA11y],
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  integrations: [tailwind(), react()],
});
