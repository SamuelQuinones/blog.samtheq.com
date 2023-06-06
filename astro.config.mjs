// TODO: Fix footnotes because apparently linkify doesnt discriminate

import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";
// Markdown plugins
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import linkify from "rehype-autolink-headings";
import addA11y from "./plugins/a11y-navigation";
import externalLinks from "./plugins/external-links";
// Astro plugins
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.samtheq.com",
  scopedStyleStrategy: "class",
  server: ({ command }) => ({ port: command === "dev" ? 5665 : 6116 }),
  markdown: {
    gfm: true,
    rehypePlugins: [rehypeHeadingIds, [linkify, { behavior: "wrap" }], addA11y, externalLinks],
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    react(),
    sitemap(),
  ],
  output: "static", // wants to be serverless by default
  adapter: vercel(),
  experimental: {
    assets: true,
  },
});
