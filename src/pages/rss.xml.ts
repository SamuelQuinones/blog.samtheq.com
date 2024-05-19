import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { getPublicPosts, sortPosts } from "@util/BlogHelper";

export async function GET(context: APIContext) {
  const unsortedPosts = await getCollection("blog", getPublicPosts);
  const posts = unsortedPosts.sort(sortPosts);
  return rss({
    title: "SamTheQ | Blog",
    description: "Samuel Quinones' Personal Blog",
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
