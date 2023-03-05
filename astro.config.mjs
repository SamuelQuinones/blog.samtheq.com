import { defineConfig } from "astro/config";
// Markdown plugins
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import linkify from "rehype-autolink-headings";
import addA11y from "./plugins/a11y-navigation";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.samtheq.com",

  markdown: {
    gfm: true,
    rehypePlugins: [rehypeHeadingIds, [linkify, { behavior: "wrap" }], addA11y],
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    react(),
    sitemap(),
  ],
});
