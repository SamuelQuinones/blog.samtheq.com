// TODO: Fix footnotes because apparently linkify doesnt discriminate

import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";
// Markdown plugins
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import linkify from "rehype-autolink-headings";
import rehypeAttrs from "./plugins/rehype-attrs";
import rehypeExternalLinks from "./plugins/rehype-external-links";
import rehypeUnwrapImages from "./plugins/rehype-unwrap-images";
import remarkModifiedTime from "./plugins/remark-modified-time";
// Astro plugins
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";

const VERCEL_PREVIEW_SITE =
  process.env.VERCEL_ENV !== "production" &&
  process.env.VERCEL_URL &&
  `https://${process.env.VERCEL_URL}`;

console.log("[VERCEL_PREVIEW_SITE]", VERCEL_PREVIEW_SITE);

// https://astro.build/config
export default defineConfig({
  site: VERCEL_PREVIEW_SITE || "https://blog.samtheq.com",
  scopedStyleStrategy: "class",
  server: ({ command }) => ({ port: command === "dev" ? 5665 : 6116 }),
  markdown: {
    gfm: true,
    remarkPlugins: [remarkModifiedTime],
    rehypePlugins: [
      rehypeAttrs,
      rehypeHeadingIds,
      [linkify, { behavior: "wrap" }],
      rehypeExternalLinks,
      rehypeUnwrapImages,
    ],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    expressiveCode({
      themes: ["dark-plus"],
      // frames: false,
      styleOverrides: {
        uiFontFamily: "Inter var",
        codeFontFamily: "Fira Code VF",
        uiLineHeight: 1.5,
        codeLineHeight: 1.5,
        // codeFontSize: "0.875rem",
      },
    }),
    mdx(),
    sitemap(),
  ],
  // wants to be serverless by default
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
