import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(reference("tag")),
      description: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      lastUpdated: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val))
        .optional(),
      authors: z.array(z.string().url()).default(["https://samtheq.com/about"]),
      draft: z.boolean().optional(),
    }),
});

const tagCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  tag: tagCollection,
};
