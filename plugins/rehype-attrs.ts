/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

export default function rehypeAttrs(): ReturnType<RehypePlugin> {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "element",
      (node, index, parent) => {
        const isElement =
          node.type === "element" &&
          /^(em|strong|b|a|i|p|pre|kbd|blockquote|h(1|2|3|4|5|6)|code|table|img|del|ul|ol|li)$/.test(
            node.tagName
          );
        if (
          isElement &&
          parent &&
          Array.isArray(parent.children) &&
          typeof index === "number" &&
          //@ts-expect-error doesnt account for mdx
          parent.children?.[index + 1]?.type === "mdxTextExpression" &&
          //@ts-expect-error doesnt account for mdx
          /^\/\*\s?attrs:(.*?)\*\/$/.test(parent.children[index + 1].value)
        ) {
          const searchParams = new URLSearchParams(
            //@ts-expect-error doesnt account for mdx
            parent.children[index + 1].value
              .replace(/^\/\*(.*?)\*\/$/, "$1")
              .trim()
              .replace(/^attrs:/, "")
          );
          for (const [key, value] of searchParams) {
            node.properties[key] = value;
          }
          parent.children.splice(index + 1, 1);
        }
      }
    );
  };
}
