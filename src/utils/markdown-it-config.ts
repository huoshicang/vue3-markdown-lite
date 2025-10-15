import MarkdownIt from "markdown-it";
import MdKatex from "@vscode/markdown-it-katex";
import MdLinkAttributes from "markdown-it-link-attributes";
import MdMermaid from "mermaid-it-markdown";
import hljs from "highlight.js";
import {MarkdownViewerProps} from "@/types";
import {highlightBlock} from "@/utils/code-block-utils";

export function createMarkdownIt(props: MarkdownViewerProps) {
  const md = new MarkdownIt({
    html: false,
    linkify: true,
    highlight(code, language) {
      // 检查语言是否合法
      const validLang = !!(language && hljs.getLanguage(language));
      // 高亮代码
      if (validLang) {
        const lang = language ?? "";
        return highlightBlock(
          hljs.highlight(code, {language: lang}).value,
          lang,
          props
        );
      }
      return highlightBlock(hljs.highlightAuto(code).value, "", props);
    },
  }).use(MdLinkAttributes, {attrs: {target: "_blank", rel: "noopener"}})
    .use(MdKatex)
    .use(MdMermaid)

  // 重写图片渲染规则
  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const src = token.attrGet('src');
    const alt = token.content || '';

    // 返回自定义图片组件的占位符标记
    // 实际渲染将在Vue组件中处理
    return `<div class="markdown-image" data-src="${src}" data-alt="${alt}"></div>`;
  };

  return md;

}
