import type { RehypePlugin } from "@astrojs/markdown-remark";
import { h } from "hastscript";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";

const searchFunc = (node: any) => node.tagName === "a";

export default function addA11y(): ReturnType<RehypePlugin> {
  return (tree) => {
    visit(tree, searchFunc, (node, _, parent) => {
      //@ts-expect-error type mismatch
      if (!parent || !["h1", "h2", "h3", "h4", "h5", "h6"].includes(parent.tagName)) return;
      //@ts-expect-error type mismatch
      node.children.push(
        h("span", { "is:raw": true, class: "sr-only" }, `Section titled ${toString(node)}`)
      );
    });
  };
}
