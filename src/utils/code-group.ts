import { MarkdownViewerProps } from "@/types";
import hljs from "highlight.js";

export const CodeGroupPlugin = (md, options: MarkdownViewerProps) => {

  const {copyCoder, collapse} = options;

  md.block.ruler.before('fence', 'code-group', (state, startLine, endLine, silent) => {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const end = state.eMarks[startLine];

    // 匹配 code-group 开始标记
    if (state.src.substring(start, end) !== ':::code-group') {
      return false;
    }

    if (silent) return true;

    let line = startLine + 1;
    const contentLines = [];

    // 收集内部内容直到结束标记 :::
    while (line < endLine) {
      const currentStart = state.bMarks[line] + state.tShift[line];
      const currentEnd = state.eMarks[line];
      const currentLine = state.src.substring(currentStart, currentEnd);

      if (currentLine === ':::') break;

      contentLines.push(state.src.substring(state.bMarks[line], state.eMarks[line]));
      line++;
    }

    state.line = line + 1; // 更新解析位置

    // 关键修改：使用 md.parse 解析内部内容，自动处理配置依赖
    const innerContent = contentLines.join('\n');
    const innerTokens = md.parse(innerContent, state.env); // 改用内置 parse 方法

    // 提取所有代码块信息（language 和 code）
    const codeBlocks = innerTokens
      .filter(token => token.type === 'fence') // 只处理代码块
      .map(token => ({
        language: token.info.split(':')[0] || 'plaintext',
        code: token.content
      }));

    // 创建开始标签
    const openToken = state.push('code_group_open', 'code-group', 1);
    openToken.attrSet(codeBlocks);
    openToken.map = [startLine, line];

    // 创建结束标签
    const closeToken = state.push('code_group_close', 'code-group', -1);
    closeToken.map = [startLine, line];

    return true;
  });

  // 为 code-group 标签添加渲染规则
  md.renderer.rules.code_group_open = (tokens, idx) => {
    const token = tokens[idx];

    let lages: string = []
    let codes = []

    token.attrs[0][0].map(item => {
      const languageName = hljs.getLanguage(item.language)?.name ?? "plaintext"
      lages.push(languageName)
      codes.push(hljs.highlight(item.code, {language: languageName}).value)
    })

    return `
<style>
.tab {
  padding: 0.3rem 0.4rem;
  background: var(--bgColor-neutral-muted);
  color: var(--fgColor-default);
  border-radius: 4px;
  cursor: pointer;
  margin-right: 4px;
}

.tab:hover {
  background: var(--borderColor-neutral-muted);
}

.tab.active{
background: var(--bgColor-attention-muted);
}

.none{
  display: none;
}

.block{
  display: inline-block;
}

</style>
<code-group expanded="true" copy-coder="${copyCoder?.toString()}" collapse="${collapse?.toString()}">

${lages.map((item, index) => `<span slot="languageName" class="tab ${index === 0 ? 'active' : ''}" data-index="${index}">${item}</span>`).join('')}
${codes.map((item, index) => `<span slot="code" class="${index === 0 ? 'block' : 'none'}" data-index="${index}">${item}</span>`).join('')}

</code-group>`;
  };

  md.renderer.rules.code_group_close = () => '';
};
