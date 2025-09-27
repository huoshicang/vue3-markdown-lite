import { createMarkdownIt } from "./markdown-it-config.ts";
import { MarkdownViewerProps } from "../types";

let mdiInstance: ReturnType<typeof createMarkdownIt> | null = null;

// 渲染Markdown文本
export function renderMarkdown(text: string, props: MarkdownViewerProps): string {
  // 缓存实例提高性能
  if (!mdiInstance) {
    mdiInstance = createMarkdownIt(props);
  }
  return mdiInstance.render(text);
}
