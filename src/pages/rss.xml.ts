import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get() {
  const posts = await getCollection("blog");
  return rss({
    title: "SamTheQ | Blog",
    description: "My blog site",
    site: import.meta.env.PUBLIC_SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
