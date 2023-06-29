// TODO: Fix footnotes because apparently linkify doesnt discriminate

import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";
// Markdown plugins
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import linkify from "rehype-autolink-headings";
import rehypeAttrs from "./plugins/rehype-attrs";
import rehypeExternalLinks from "./plugins/rehype-external-links";
import rehypeUnwrapImages from "./plugins/rehype-unwrap-images";
// Astro plugins
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.samtheq.com",
  scopedStyleStrategy: "class",
  server: ({ command }) => ({ port: command === "dev" ? 5665 : 6116 }),
  markdown: {
    gfm: true,
    rehypePlugins: [
      rehypeAttrs,
      rehypeHeadingIds,
      [linkify, { behavior: "wrap" }],
      rehypeExternalLinks,
      rehypeUnwrapImages,
    ],
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    mdx(),
  ],
  output: "static",
  // wants to be serverless by default
  adapter: vercel(),
  experimental: {
    assets: true,
  },
});
