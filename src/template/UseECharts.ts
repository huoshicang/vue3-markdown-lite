import { ref, nextTick, Ref } from 'vue';
import * as echarts from 'echarts';

/**
 * ECharts 配置处理选项
 */
export interface UseEChartsOptions {
  /**
   * 是否应用主题样式到图表
   * @default true
   */
  applyTheme?: boolean;
}

/**
 * 用于管理和操作 ECharts 图表的可组合函数
 * @param elementRef 包含图表容器的元素引用或 Vue ref 对象
 * @param options ECharts 配置选项
 * @returns ECharts 管理函数
 */
export const useECharts = (
  elementRef: HTMLElement | undefined | null | Ref<HTMLElement | undefined | null>,
  options: UseEChartsOptions = {}
) => {
  // 存储所有已创建的图表实例
  const chartInstances = ref<Map<string, echarts.ECharts>>(new Map());
  const { applyTheme = true } = options;

  /**
   * 获取 CSS 变量值
   * @param varName CSS 变量名
   * @returns CSS 变量值
   */
  const getCSSVariable = (varName: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '';
  };

  /**
   * 应用主题样式到图表配置
   * @param config ECharts 配置对象
   */
  const applyThemeToChartConfig = (config: any): void => {
    if (!applyTheme) return;

    // 获取字体颜色和背景色的 CSS 变量值
    const fgColor = getCSSVariable('--fgColor-default');
    const bgColor = getCSSVariable('--bgColor-default');

    // 如果存在 CSS 变量值，应用到图表配置
    if (fgColor || bgColor) {
      // 应用背景色
      if (bgColor) {
        config.backgroundColor = bgColor;
      }

      // 应用字体颜色到全局文本样式
      if (fgColor) {
        config.textStyle = config.textStyle || {};
        config.textStyle.color = fgColor;

        // 应用到标题
        if (config.title) {
          config.title.textStyle = config.title.textStyle || {};
          config.title.textStyle.color = fgColor;
        }

        // 应用到图例
        if (config.legend) {
          config.legend.textStyle = config.legend.textStyle || {};
          config.legend.textStyle.color = fgColor;
        }

        // 应用到坐标轴
        if (config.xAxis && Array.isArray(config.xAxis)) {
          config.xAxis.forEach(axis => {
            axis.axisLabel = axis.axisLabel || {};
            axis.axisLabel.color = fgColor;
            axis.nameTextStyle = axis.nameTextStyle || {};
            axis.nameTextStyle.color = fgColor;
          });
        } else if (config.xAxis) {
          config.xAxis.axisLabel = config.xAxis.axisLabel || {};
          config.xAxis.axisLabel.color = fgColor;
          config.xAxis.nameTextStyle = config.xAxis.nameTextStyle || {};
          config.xAxis.nameTextStyle.color = fgColor;
        }

        if (config.yAxis && Array.isArray(config.yAxis)) {
          config.yAxis.forEach(axis => {
            axis.axisLabel = axis.axisLabel || {};
            axis.axisLabel.color = fgColor;
            axis.nameTextStyle = axis.nameTextStyle || {};
            axis.nameTextStyle.color = fgColor;
          });
        } else if (config.yAxis) {
          config.yAxis.axisLabel = config.yAxis.axisLabel || {};
          config.yAxis.axisLabel.color = fgColor;
          config.yAxis.nameTextStyle = config.yAxis.nameTextStyle || {};
          config.yAxis.nameTextStyle.color = fgColor;
        }

        // 应用到提示框
        if (config.tooltip) {
          config.tooltip.textStyle = config.tooltip.textStyle || {};
          config.tooltip.textStyle.color = fgColor;
        }
      }
    }
  };

  /**
   * 获取实际的 DOM 元素
   * @returns 实际的 DOM 元素或 null
   */
  const getActualElement = (): HTMLElement | null => {
    if (!elementRef) return null;
    // 如果是 Vue 的 ref 对象，获取其 value
    if (typeof (elementRef as Ref).value !== 'undefined') {
      return (elementRef as Ref<HTMLElement | undefined | null>).value || null;
    }
    // 如果已经是 DOM 元素，直接返回
    return elementRef as HTMLElement | null;
  };

  /**
   * 初始化所有 ECharts 图表
   */
  const initECharts = async (): Promise<void> => {
    const actualElement = getActualElement();
    if (!actualElement) return;

    // 等待 DOM 更新
    await nextTick();

    // 销毁已存在的图表实例
    disposeECharts();

    try {
      // 查找所有 ECharts 容器
      const chartContainers = actualElement.querySelectorAll('.markdown-echarts');
      chartContainers.forEach(container => {
        try {
          // 获取图表配置
          const configData = container.getAttribute('data-echarts-config');
          if (!configData) return;

          // 解码并解析配置
          const configStr = decodeURIComponent(configData);
          const config = JSON.parse(configStr);

          // 应用主题样式
          applyThemeToChartConfig(config);

          // 创建 ECharts 实例
          const chartId = container.id;
          const chartInstance = echarts.init(container);
          chartInstances.value.set(chartId, chartInstance);

          // 应用配置并渲染
          chartInstance.setOption(config);

          // 添加响应式处理
          const handleResize = () => {
            chartInstance.resize();
          };

          // 存储resize处理函数引用，以便后续清理
          (chartInstance as any).resizeHandler = handleResize;
          window.addEventListener('resize', handleResize);
        } catch (error) {
          console.error('初始化单个 ECharts 失败:', error);
          // 在容器中显示错误信息
          (container as HTMLElement).innerHTML = `<div style="color: red; padding: 20px;">ECharts 渲染失败: ${(error as Error).message}</div>`;
        }
      });
    } catch (error) {
      console.error('初始化 ECharts 容器失败:', error);
    }
  };

  /**
   * 清理所有图表实例
   */
  const disposeECharts = (): void => {
    chartInstances.value.forEach(instance => {
      // 移除resize监听器
      if ((instance as any).resizeHandler) {
        window.removeEventListener('resize', (instance as any).resizeHandler);
      }
      // 销毁图表实例
      instance.dispose();
    });
    chartInstances.value.clear();
  };

  /**
   * 手动触发所有图表重新调整大小
   */
  const resizeCharts = (): void => {
    chartInstances.value.forEach(instance => {
      instance.resize();
    });
  };

  return {
    initECharts,
    disposeECharts,
    resizeCharts,
    chartInstances
  };
};
