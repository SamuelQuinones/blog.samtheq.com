import type { CollectionEntry } from "astro:content";

export function sortPosts(a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

export function sortTagFilterdPosts(
  a: CollectionEntry<"blog">["data"],
  b: CollectionEntry<"blog">["data"]
) {
  return b.publishDate.getTime() - a.publishDate.getTime();
}
