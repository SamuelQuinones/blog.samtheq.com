import type { Transformer } from "unified";
import type { Root } from "hast";
import { visit, SKIP } from "unist-util-visit";

export default function unwrapImages(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "p" &&
        parent &&
        typeof index === "number" &&
        node.children.every((n) => n.type === "element" && n.tagName === "img")
      ) {
        parent.children.splice(index, 1, ...node.children);
        return SKIP;
      }
    });
  };
}
