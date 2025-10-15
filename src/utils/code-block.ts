import hljs from "highlight.js";
import type {MarkdownViewerProps} from '@/types';


export const codeBlockPlugin = (md, options: MarkdownViewerProps) => {
  const {copyCoder, collapse} = options;
  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const code = token.content.trim(); // 获取完整代码内容
    const lang = token.info;

    const languageName = hljs.getLanguage(lang)?.name ?? "plaintext"
    const highlightedCode = hljs.highlight(code, {language: languageName}).value


    // 关键修复：用单引号包裹code属性，避免双引号冲突
    return `<code-block expanded="true" copy-coder="${copyCoder?.toString()}" collapse="${collapse?.toString()}">
<span slot="languageName">${languageName}</span>
<span slot="code">${highlightedCode}</span>
</code-block>`;
  };
}
