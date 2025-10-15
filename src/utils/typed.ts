/**
 * Markdown-it 插件：实现打字效果
 * 支持格式：
 * ==
 * {
 *   strings: [
 *     '# 欢迎来到我的世界。',
 *     '我是一名前端开发者。',
 *     '也热爱设计与创造。'
 *   ],
 *   typeSpeed: 50,
 *   backSpeed: 30,
 *   loop: true
 * }
 * ==
 * @param md markdown-it实例
 */
function typedPlugin(md) {
  /**
   * 生成唯一的打字效果ID
   * @returns 唯一ID字符串
   */
  function generateTypedId() {
    return `typed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 添加块级解析规则：解析打字效果容器
   * @param state 解析状态对象
   * @param startLine 开始行号
   * @param endLine 结束行号
   * @param silent 是否为静默模式（仅检测不解析）
   * @returns 是否成功解析
   */
  md.block.ruler.before('fence', 'typed_container', (state, startLine, endLine, silent) => {
    // 1. 匹配开始标记 ==
    const startPos = state.bMarks[startLine] + state.tShift[startLine];
    const endPos = state.eMarks[startLine];
    const lineText = state.src.slice(startPos, endPos).trim();

    // 如果不匹配开始标记格式，直接返回false
    if (lineText !== '==') return false;

    // 静默模式下，只要匹配成功就返回true
    if (silent) return true;

    // 2. 定位结束标记并收集内容
    let contentLines = [];       // 存储多行内容的数组
    let endLineIdx = startLine + 1;    // 结束行初始值

    // 循环查找结束标记
    while (endLineIdx < endLine) {
      const currentStart = state.bMarks[endLineIdx] + state.tShift[endLineIdx];
      const currentEnd = state.eMarks[endLineIdx];
      const currentLine = state.src.slice(currentStart, currentEnd).trim();

      // 找到结束标记 == 时停止查找
      if (currentLine === '==') {
        break;
      } else {
        // 收集内容行
        contentLines.push(state.src.slice(currentStart, currentEnd));
        endLineIdx++;
      }
    }

    // 确保找到了结束标记
    if (endLineIdx >= endLine) return false;

    // 3. 生成开始 token
    const typedId = generateTypedId();
    const content = contentLines.join('\n').trim();

    // 尝试解析JSON配置
    let typedConfig = null;
    try {
      typedConfig = JSON.parse(content);
    } catch (e) {
      // 如果不是JSON格式，则将每一行作为一个句子
      typedConfig = {
        strings: contentLines.map(line => line.trim()).filter(line => line),
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        loop: true
      };
    }

    const openToken = state.push('typed_open', 'div', 1);
    openToken.info = JSON.stringify({ id: typedId, config: typedConfig });
    openToken.map = [startLine, endLineIdx];

    // 4. 生成结束 token
    const closeToken = state.push('typed_close', 'div', -1);
    closeToken.map = [startLine, endLineIdx];

    // 5. 设置下一次解析的起始行为「结束行 + 1」
    state.line = endLineIdx + 1;

    return true;
  });

  /**
   * 定义typed_open token的渲染规则
   * @param tokens token数组
   * @param idx 当前token索引
   * @returns 生成的HTML字符串
   */
  md.renderer.rules.typed_open = function(tokens, idx) {
    const { id, config } = JSON.parse(tokens[idx].info);

    // 生成带有数据属性的HTML结构，用于Typed.js渲染
    return `
<div class="markdown-typed-container">
  <div 
    class="markdown-typed"
    id="${id}"
    data-typed-config="${encodeURIComponent(JSON.stringify(config))}"
    style="min-height: 24px;"
  ></div>
</div>
`;
  };

  /**
   * 定义typed_close token的渲染规则
   * @returns 结束标签的HTML字符串
   */
  md.renderer.rules.typed_close = function() {
    return '</div>';
  };
}

export default typedPlugin;
