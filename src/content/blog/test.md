---
title: "Test Blog Post"
description: "Test post description"
publishDate: "2023-02-06T16:15:30.726Z"
authors:
  - "https://samtheq.com"
tags:
  - test
  - react
  - javascript
---

# H1

## H2

### H3

#### H4

##### H5

Parapgraph, with several things like a [link](https://samtheq.com), some _iatlic text_, **bold text**, ~~strikethrough~~. What about `inline code` in backticks?

### Lists

#### Ordered

1. This is
2. an ordered
3. list

#### Unoredered

- one
- two
- three

#### Footnotes

Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

You can also use words, to fit your writing style more closely[^note].

[^1]: My reference.
[^2]:
    Every new line should be prefixed with 2 spaces.  
    This allows you to have a footnote with multiple lines.

[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.  
    This footnote also has been made with a different syntax using 4 spaces for new lines.

### Tables

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

### Blockquote

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

### Horizontal Rule

Three or more...

---

Hyphens

---

Asterisks

---

Underscores

### Typescript Code

```ts
import { z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  publishDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
});
```

### Lorem Ipsum

Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quo sapiente reprehenderit ea, dolor esse nesciunt, doloribus facilis non totam repudiandae odio hic possimus, ad reiciendis! Magnam architecto dolore perspiciatis?
