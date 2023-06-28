import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

export default function rehypeAttrs(): ReturnType<RehypePlugin> {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        /^(em|strong|b|a|i|p|pre|kbd|blockquote|h(1|2|3|4|5|6)|code|table|img|del|ul|ol|li)$/.test(
          node.tagName
        ) &&
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
          parent.children[index + 1].value.replace(/^\/\*(.*?)\*\/$/, "$1").replace(/^attrs:/, "")
        );
        for (const [key, value] of searchParams) {
          node.properties![key] = value;
        }

        parent.children.splice(index + 1, 1);
      }
    });
  };
}
