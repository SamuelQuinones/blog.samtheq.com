import { defineCollection } from "astro:content";
import { blogSchema } from "./_schemas";

export const collections = {
  blog: defineCollection({ schema: blogSchema }),
};
