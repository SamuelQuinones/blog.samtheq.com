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
      authors: z.array(reference("author")).default(["samq"]),
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

const authorCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      website: z.string().url(),
      avatar: image()
        .refine((img) => img.width === img.height, { message: "image must be square" })
        .optional(),
      twitter: z.string().url().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
  tag: tagCollection,
  author: authorCollection,
};
