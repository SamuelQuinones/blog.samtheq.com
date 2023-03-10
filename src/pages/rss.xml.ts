import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { getShowablePosts } from "@util/BlogHelper";
const parser = new MarkdownIt();

export const prerender = true;

export async function get(context: APIContext) {
  const posts = await getCollection("blog", getShowablePosts);
  return rss({
    title: "SamTheQ | Blog",
    description: "My blog site",
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
