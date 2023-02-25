import { z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  publishDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  authors: z.array(z.string().url()).default(["https://samtheq.com/"])
});
