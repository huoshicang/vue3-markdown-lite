import { MarkdownViewerProps } from "../types";

/**
 * 生成带样式的代码块HTML
 * @param highlightedCode 高亮后的代码
 * @param lang 代码语言
 * @param props 组件属性
 */
export function highlightBlock(
  highlightedCode: string,
  lang: string,
  props: MarkdownViewerProps
) {
  const lines = highlightedCode.split('\n');
  const lineCount = lines.length;

  // 生成行号
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)
    .map(num => `<span class="line-number">${num}</span>`)
    .join('');

  // 生成代码行
  const codeLines = lines.map(line => `<div class="code-line">${line}</div>`).join('');

  return `<pre class="code-block-wrapper">
    <div class="code-block-header">
        ${ props.collapse ? `<span class="code-block-header__fold" data-fold="false">折叠代码</span>` : "" }
        <span class="code-block-header__copy">复制代码</span>
        <span class="code-block-header__lang">${lang}</span>
        <span class="code-block-header__lines"> ${lineCount} 行</span>
    </div>
    <div class="code-block-content">
        ${ props.coderNumber ? `<div class="line-numbers">${lineNumbers}</div>` : "" }
        <code class="hljs code-block-body ${lang}">${codeLines}</code>
    </div>
</pre>`;
}
