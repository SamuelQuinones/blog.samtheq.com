// TODO: try to figure out how to do "some" instead of every

import type { Transformer } from "unified";
import type { Root } from "hast";
import { visit, SKIP } from "unist-util-visit";

export default function rehypeUnwrapImages(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "p" &&
        parent &&
        typeof index === "number" &&
        (node.children.every((n) => n.type === "element" && n.tagName === "img") ||
          // @ts-expect-error not accounting for MDX
          node.children.every((n) => n.type === "mdxJsxFlowElement" && n.name === "__AstroImage__"))
      ) {
        parent.children.splice(index, 1, ...node.children);
        return [SKIP, index + node.children.length];
      }
    });
  };
}
