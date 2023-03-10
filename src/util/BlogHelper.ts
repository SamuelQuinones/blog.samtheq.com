import type { CollectionEntry } from "astro:content";

export function sortPosts(a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

/**
 * Filter function used to show / hide blog posts from the full post list
 *
 * current checks:
 * - Show ALL if Dev
 * - Hide if Draft
 *
 * @param entry Item in Blog collection
 * @returns boolean representing if the post should show or not
 */
export function getShowablePosts(entry: CollectionEntry<"blog">) {
  return entry.data.draft !== true || import.meta.env.DEV;
}

export function getUniqueTags(posts: CollectionEntry<"blog">[]) {
  let tags: string[] = [];

  posts.forEach((post) => {
    tags = [...tags, ...post.data.tags];
  });
  return [...new Set(tags)];
}
