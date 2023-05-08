---
title: "Building a blog using Astro"
description: "Learn how and why I built this blog using astro and why the blog's codebase is now separate from the main site"
publishDate: "2023-05-06T21:21:22.000-04:00"
authors:
  - https://samtheq.com
tags:
  - astro
  - typescript
  - tailwind
draft: true
---

Originally, I built this blog in my main website's codebase using NextJS and a library called contentlayer. In fact if you look at the commit history, you can see that things were pretty much finished and all that was needed was to make the first post explaining how it was made.

Over time, I realized that the codebase was very bloated and got harder to navigate. So at some point I decided to gut all the work I had done with the plan to start over fresh at some point. This was right around the time I learned about astro and how powerful it was. I won't get too into the weeds here, you can learn more about it on their site. But I knew this was the tool I wanted to use to build my blog.

## Why Astro?

One of the key advantages of Astro is its focus on [speed and performance](https://astro.build/blog/2023-web-framework-performance-report/), with pre-rendering and server-side rendering options that help a blog load quickly and smoothly. Additionally, Astro offers a range of customization options, including built-in support for popular front-end frameworks like React, SolidJS, and Svelte, as well as a wide range of plugins that can help you add functionality and features to your blog.

I could go on, but to keep things brief, you can check out [Astro's own page](https://docs.astro.build/en/concepts/why-astro/) on why you should chose them.

The biggest factors for me were:

- Native Markdown support (with Shiki syntax highlighting)
- The ability to use multiple frameworks
- Being able to defer javascript loading
- Content collections

And many others!

With all of this in mind, I got to work.

## Migrating to Astro

For the most part, this was actually pretty painless. Astro uses routing similar to NextJS <= 13 without the app directory. All of the routes go in a `pages` folder so an about page would be `pages/about.astro` or `pages/about/index.astro`. Dynamic routes are also supported, like for this site the directory structure I use `pages/[slug].astro` and then pages based on what is called a content collection are rendered.

Even though astro is statically exported by default, with the right adapter it does support server side rendering which means you can do API routes too!. Astro's `getStaticPaths` is nearly identical to NextJS' `generateStaticPaths`. Astro also supports server side rendering, though it does require additional configuration. This means you can serve API routes if necesarry too!

In terms of creating pages or components, `.astro` files are simlar to `.svelte` files. Like svelte files, astro files are broken up into segments:

```astro
---
// header / Server JS logic
import { thing } from "some-lib";
const greeting = thing.createGreeting();
---

<!-- HTML / Render logic -->
<html>
  <head></head>
  <body>
    <div data-is-greeter>{greeting}</div>
  </body>
</html>

<script>
  // DOM / client JS logic
  const greeterDiv = document.querySelectorAll("[data-is-greeter]");
  // Do something with this div
</script>

<style>
  /* page / component styles */
</style>
```

Script tags are used differently in astro then they are in svelte. In astro they are more akin to native DOM scripts. You can [learn more here](https://docs.astro.build/en/guides/client-side-scripts/).

Some have said Astro is also like PHP which ... I think I'll just let this meme speak for itself:

<center>
<img src="https://i.redd.it/5lv8igf480l91.jpg" alt="Alt text" width="500"/>
</center>

When creating about components specifically, extracting props has to be done in a unique way - seeing as we arent using functions for components any more - and that looks like this:

```astro
---
// src/components/PostCard.astro
import type { CollectionEntry } from "astro:content";

export type Props = CollectionEntry<"blog">["data"] & {
  showTags?: boolean;
  slug: string;
};

// `Astro` is a global and does not need to be imported
const { title, publishDate, description, slug, showTags, tags } = Astro.props;
---
```

You must export a type or interface called `Props` for type safety, and the props themselves are extracted from the global `Astro` object.

## Bringing in Other Frameworks

As stated above, Astro allows you to [bring in multiple other frameworks](https://docs.astro.build/en/guides/integrations-guide/) into your project and you can further control how / when the required javascript is shipped to the client.

Astro will render your other framework's HTML on the server and then ship the javascript separately. You can learn more about how this works by [checking out their docs](https://docs.astro.build/en/core-concepts/framework-components/).

Currently, I am only using react because I want to take advantage of framer-motion. My Navbar is made with react so it exists in its own `src/components/Header/NavBar.tsx` file. And I import it into my global layout astro file:

```astro
---
import "../styles/globals.css";
import Footer from "@components/Footer.astro";
import NavBar from "@components/Header/NavBar"; // REACT COMPONENT
import NavLink from "@components/Header/NavLink.astro";
import SEO, { type OGImage } from "@components/SEO.astro";

// rest of the BaseLayout TS logic ...
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta data and what not -->
  </head>
  <body>
    <NavBar client:media="not all and (min-width: 640px)" title={navTitle}>
      <NavLink href="/">All Posts</NavLink>
      <NavLink highlightNested href="/tags">Filter By Tag</NavLink>
      <NavLink href="/about">About</NavLink>
    </NavBar>
    <slot />
    <Footer />
  </body>
</html>
```

The `client:media` directive takes a media query. This one tells the browser not to import the javascript needed for the navbar unless the screen is a small screen.You can verify this is working by looking at the network tab and resizing the screen from large to small, and on small screen loads it will obviously load right away.

## Content Collections

I've mentioned this phrase before, a content collection is - in Astro's own words:

> Content collections are the best way to work with Markdown and MDX in any Astro project. Content collections are a feature of Astro that help manage your content files in a project. Collections help to organize your content, validate your frontmatter, and provide automatic TypeScript type-safety for all of your content.

Content collections are very similar to content layer, in that it lets you group your content by type and provides you with easy to use tools for things like type-safe schemas and querying your collection. Where it differs slightly is that content collections are smarter;

- Content collections exist in a reserved `src/content` folder, nothing else can live here
- each named folder will automatically define a collection
- Collection items can only be queried with a defined zod schema
- filtering is built in to collection queries

I won't repeat everything the docs say here, so please be sure to [check them out for more info](https://docs.astro.build/en/guides/content-collections/). But seeing as I was familiar with content layer, content collections were even easier to use then they already are.

My blog posts go in the `src/content/blog` folder. Each post is a markdown file and each markdown file must have frontmatter that matches the defined zod schema:

```ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.array(z.string().transform((val) => val.toLowerCase())),
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
      authors: z.array(z.string().url()).default(["https://samtheq.com/"]),
      draft: z.boolean().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
```

```md
---
title: "Test Blog Post"
description: "Test post description"
publishDate: "2023-02-06T16:15:30.726Z"
lastUpdated: "2023-03-14T22:13:22.000-04:00"
authors:
  - "https://samtheq.com"
tags:
  - test
  - react
  - javascript
---

## Post content

blah blah
```

Then in my `src/pages/[slug].astro` file, I query the collection in a `getStaticPaths` function and return the results as props, this also ensures that there will be a route for every item in the collection:

```astro
---
import { type CollectionEntry, getCollection } from "astro:content";
import BaseLayout from "@layouts/BaseLayout.astro";

export const prerender = true;

export type Props = CollectionEntry<"blog">;

function getShowablePosts(entry: CollectionEntry<"blog">) {
  return entry.data.draft !== true || import.meta.env.DEV;
}

export async function getStaticPaths() {
  const blog = await getCollection("blog", getShowablePosts);
  return blog.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

const {
  data: { title, publishDate, description, authors, tags, lastUpdated, cover, coverAlt },
  render,
  slug,
} = Astro.props;
const { Content } = await render();
const ogImage = cover
  ? {
      src: new URL(cover.src, Astro.site).toString(),
      alt: coverAlt || "Blog post cover image",
      type: cover.format,
    }
  : undefined;
---

<BaseLayout
  {title}
  navTitle={title}
  {description}
  {authors}
  {tags}
  {publishDate}
  {lastUpdated}
  {ogImage}
>
  <article id="stq-page-content" class="bs-container-md mb-8 mt-16 max-w-5xl grow scroll-mt-16">
    <section data-post-body class="prose prose-invert max-w-none grow lg:prose-xl">
      <h1 class="lg:!text-5xl">{title}</h1>
      <Content />
    </section>
  </article>
</BaseLayout>
```

I also use the collection query on the home page to generate the full list of posts with hyperlinks:

```astro
---
import PostCard from "@components/PostCard.astro";
import BaseLayout from "@layouts/BaseLayout.astro";
import { type CollectionEntry, getCollection } from "astro:content";

export const prerender = true;

function getShowablePosts(entry: CollectionEntry<"blog">) {
  return entry.data.draft !== true || import.meta.env.DEV;
}

function sortPosts(a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

const posts = await getCollection("blog", getShowablePosts);
---

<BaseLayout title="Blog" description="Samuel Quinones' Personal Blog">
  <main
    id="stq-page-content"
    class="bs-container-md mt-16 max-w-[52rem] grow scroll-mt-16 px-4 pb-28"
  >
    <ul data-post-list data-post-count={posts.length} class="mt-8 space-y-8">
      {
        posts.length > 0 ? (
          posts.sort(sortPosts).map(({ data, slug }) => <PostCard {...data} {slug} showTags />)
        ) : (
          <li class="text-xl md:text-center lg:text-2xl">
            <p class="mb-3">Huh, it looks like there are no posts available to read.</p>
            <p>Try checking back in the future!</p>
          </li>
        )
      }
    </ul>
  </main>
</BaseLayout>
```

I also use similar logic on the `src/pages/tags/[tag].astro` file.

Even though tags are not their own collection, we can still generate a list of tags page - `src/pages/tags/index.astro` - by using content collection queries:

```astro
---
import Button from "@components/Button.astro";
import BaseLayout from "@layouts/BaseLayout.astro";
import { type CollectionEntry, getCollection } from "astro:content";

export const prerender = true;

function getShowablePosts(entry: CollectionEntry<"blog">) {
  return entry.data.draft !== true || import.meta.env.DEV;
}

function getUniqueTags(posts: CollectionEntry<"blog">[]) {
  let tags: string[] = [];

  posts.forEach((post) => {
    tags = [...tags, ...post.data.tags];
  });
  return [...new Set(tags)];
}

const allPosts = await getCollection("blog", getShowablePosts);
const uniqueTags = getUniqueTags(allPosts);
---

<BaseLayout title="Blog Tags" description="All Post Tags">
  <main id="stq-page-content" class="bs-container-md mt-16 grow scroll-mt-16">
    <section class="relative inline-flex flex-wrap gap-2">
      {
        uniqueTags.map((tag) => (
          <Button href={`/tags/${tag}`} variant="tag" class:list={["tag", tag, "font-bold"]}>
            {tag}
          </Button>
        ))
      }
    </section>
  </main>
</BaseLayout>
```

It's also worth noting that if your collection starts to grow large, `getStaticPaths` has [pagination support](https://docs.astro.build/en/core-concepts/routing/#pagination). I will probably look into this as this blog starts to grow.

## Easy RSS & Sitemap Support

With first party astro plugins, you can easily add a sitemap xml and a RSS feed to your site!

- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/)

I make use of both of these, the sitemap plugin just needs to be added to your `astro.config.mjs` file, while for RSS you'll need to create a `src/pages/rss.xml.ts` file, and then use the `@astrojs/rss` rss function, combine it with a content collection and get something like this:

```ts
import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { getShowablePosts, sortPosts } from "@util/BlogHelper";
const parser = new MarkdownIt();

export const prerender = true;

export async function get(context: APIContext) {
  const unsortedPosts = await getCollection("blog", getShowablePosts);
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
      content: sanitizeHtml(parser.render(post.body)),
    })),
    customData: `<language>en-us</language>`,
  });
}
```

## Remark & Rehype Plugins

Like most content generators that use markdown, Astro supports the use of remark and rehype plugins. These can be applied in the `astro.config.mjs` file (this is what mine looks like as of writing this):

```js
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";
// Markdown plugins
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import linkify from "rehype-autolink-headings";
import addA11y from "./plugins/a11y-navigation";
// Astro plugins
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.samtheq.com",
  server: ({ command }) => ({ port: command === "dev" ? 5665 : 6116 }),
  markdown: {
    gfm: true,
    rehypePlugins: [rehypeHeadingIds, [linkify, { behavior: "wrap" }], addA11y],
    shikiConfig: {
      theme: "dark-plus",
    },
  },
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    react(),
    sitemap(),
  ],
  output: "static", // wants to be serverless by default
  adapter: vercel(),
});
```

The order of plugins in the array is important because it determines the order they will be applied. In this case, I want to be sure to auto create heading ID's before the links are auto applied.

## Styling

This isn't Astro specific, but I use tailwindcss as my style framework and copy any styles used for my main site into this one. In the future I'll probably combine both sites into a monorepo with turbo.

Tailwind normally resets all the styles, so rather then create a set of styles for typography I use tailwind's [typography plugin](https://tailwindcss.com/docs/typography-plugin) to some of those styles back.

> The official Tailwind CSS Typography plugin provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML you don’t control, like HTML rendered from Markdown, or pulled from a CMS.

Basically, I wrap the HTML created from my collection files in a container with the `prose` class and the rest is like magic!

## Final Thoughts

That's really it. Setting up a blog with Astro was easy, and provided me with a level of customization I wanted. There is still more I can explore and experiment with, but for now, this was enough to get me started.
