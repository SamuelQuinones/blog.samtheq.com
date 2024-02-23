/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { execSync } from "node:child_process";
import type { RemarkPlugin } from "@astrojs/markdown-remark";

export default function remarkModifiedTime(): ReturnType<RemarkPlugin> {
  return function (_tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    (file.data.astro as any).frontmatter.lastUpdated = result.toString();
  };
}
