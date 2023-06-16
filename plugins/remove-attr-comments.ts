import type { Transformer } from "unified";
import type { Root } from "hast";
import { remove } from "unist-util-remove";

const searchFunc = (node: any) => node.type === "raw" && node.value.startsWith("<!--rehype:");

export default function removeAttrComments(): Transformer<Root, Root> {
  return (tree) => {
    remove(tree, searchFunc);
  };
}
