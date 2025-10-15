/**
 * Markdown-it ECharts 插件
 * 支持渲染代码块中的 ECharts 图表配置
 * @param md markdown-it 实例
 */
function echartsPlugin(md) {
  /**
   * 生成唯一的图表 ID
   * @returns 唯一 ID 字符串
   */
  function generateChartId() {
    return `echarts-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 代码块渲染规则覆盖
   * 当代码块语言为 'echarts' 时，特殊处理
   */
  const defaultRender = md.renderer.rules.fence || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  /**
   * 重写代码块渲染规则
   */
  md.renderer.rules.fence = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const lang = token.info.trim();

    // 只处理 echarts 语言的代码块
    if (lang === 'echarts') {
      try {
        // 获取代码内容并尝试解析为 JSON
        const code = token.content.trim();
        const chartId = generateChartId();

        // 生成包含图表配置的 HTML 结构
        // 注意：由于是在 Vue 组件中使用，实际的图表初始化会由 Vue 组件完成
        // 这里只是创建一个带有配置数据的容器
        return `
<div class="markdown-echarts-container" style="width: 100%; height: 400px; margin: 16px 0;">
  <div 
    class="markdown-echarts" 
    id="${chartId}" 
    style="width: 100%; height: 100%;"
    data-echarts-config="${encodeURIComponent(code)}"
  ></div>
</div>
`;
      } catch (error) {
        console.error('ECharts 配置解析错误:', error);
        // 如果配置解析失败，返回错误信息而不是图表
        return `<div class="markdown-echarts-error" style="color: red; background-color: #fee; padding: 10px; border-radius: 4px;">
          ECharts 配置解析错误: ${error.message}
        </div>`;
      }
    }

    // 对于其他语言的代码块，使用默认渲染
    return defaultRender(tokens, idx, options, env, self);
  };
}

export default echartsPlugin;
