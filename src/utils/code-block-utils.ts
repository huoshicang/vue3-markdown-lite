import {MarkdownViewerProps} from "@/types";


/**
 * 生成带样式的代码块HTML（同步函数形式，实际返回Promise）
 * @param highlightedCode 高亮后的代码
 * @param lang 代码语言
 * @param props 组件属性
 */
export function highlightBlock(
  highlightedCode: string,
  lang: string,
  props: MarkdownViewerProps
) {

  const copy = props.copyCoder ? '<button class="copy-button">复制</button>' : '';
  const fold = props.collapse ? '<button class="fold-button">折叠</button>' : '';

  return `<pre><code class="language-${lang}"><div class="code-wrapper"><div class="code-header"><span class="language-tag">${lang}</span><div class="action">${copy}${fold}</div></div><div class="code-block">${highlightedCode}</div></div></div></div></code></pre>`;
}
