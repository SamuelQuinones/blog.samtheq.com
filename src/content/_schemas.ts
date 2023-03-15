import { z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  tags: z.array(z.string().transform((val) => val.toLowerCase())),
  description: z.string(),
  publishDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  lastUpdated: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val))
    .optional(),
  authors: z.array(z.string().url()).default(["https://samtheq.com/"]),
  draft: z.boolean().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
