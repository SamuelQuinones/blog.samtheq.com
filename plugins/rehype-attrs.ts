/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// TODO: Keep watch for other elements Astro replaces in MDX

import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

const jsxFlowWarnMSG = "You are assigning attributes to a JSX flow expression, this is VERY UNSAFE";
const testFunc = (node: any) => node.type === "element" || node.type === "mdxJsxFlowElement";

export default function rehypeAttrs(): ReturnType<RehypePlugin> {
  return (tree) => {
    visit(tree, testFunc, (node, index, parent) => {
      const isElement =
        node.type === "element" &&
        /^(em|strong|b|a|i|p|pre|kbd|blockquote|h(1|2|3|4|5|6)|code|table|img|del|ul|ol|li)$/.test(
          node.tagName
        );
      const isSpecialJsx =
        // @ts-expect-error not accounting for MDX
        node.type === "mdxJsxFlowElement" && /^(__AstroImage__)$/.test(node.name);
      if (
        (isElement || isSpecialJsx) &&
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
        if (isElement) {
          for (const [key, value] of searchParams) {
            node.properties[key] = value;
          }
        } else {
          import.meta.env.MODE !== "production" && console.warn(jsxFlowWarnMSG);
          for (const [key, value] of searchParams) {
            //@ts-expect-error doesnt account for mdx
            node.attributes?.push({ name: key, type: "mdxJsxAttribute", value });
          }
        }

        parent.children.splice(index + 1, 1);
      }
    });
  };
}
