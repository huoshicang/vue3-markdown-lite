import MarkdownIt from "markdown-it";
import MdKatex from "@vscode/markdown-it-katex";
import MdLinkAttributes from "markdown-it-link-attributes";
import MdMermaid from "mermaid-it-markdown";
import hljs from "highlight.js";
import { highlightBlock } from "@/utils/code-block-utils.ts";
import { MarkdownViewerProps } from "../types";

// 创建并配置markdown-it实例
export function createMarkdownIt(props: MarkdownViewerProps) {
  return new MarkdownIt({
    html: false,
    linkify: true,
    highlight(code, language) {
      const validLang = !!(language && hljs.getLanguage(language));
      if (validLang) {
        const lang = language ?? "";
        return highlightBlock(
          hljs.highlight(code, { language: lang }).value,
          lang,
          props
        );
      }
      return highlightBlock(hljs.highlightAuto(code).value, "", props);
    },
  })
    .use(MdLinkAttributes, { attrs: { target: "_blank", rel: "noopener" } })
    .use(MdKatex)
    .use(MdMermaid);
}
