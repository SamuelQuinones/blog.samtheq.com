import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

export default function externalLinks(): ReturnType<RehypePlugin> {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "a" &&
        node.properties &&
        node.properties.href &&
        typeof node.properties.href === "string" &&
        (node.properties.href.slice(0, 8) === "https://" ||
          node.properties.href.slice(0, 7) === "http://")
      ) {
        node.properties = {
          ...node.properties,
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }
    });
  };
}
