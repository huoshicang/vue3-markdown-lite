/**
 * MarkdownViewer 组件的属性定义
 * 所有属性均支持 TypeScript 类型提示
 */
export interface MarkdownViewerProps {
  /**
   * 需要渲染的 Markdown 文本内容
   * @default ""
   */
  text: string;

  /**
   * 是否启用代码块复制功能
   * @default true
   */
  copyCoder?: boolean;

  /**
   * 是否显示代码块行号
   * @default true
   */
  coderNumber?: boolean;

  /**
   * 是否允许代码块折叠/展开
   * @default true
   */
  collapse?: boolean;

  /**
   * 代码块是否自动换行
   * @default false
   */
  wrapCode?: boolean;

  /**
   * 是否启用暗黑模式（会覆盖系统主题检测）
   * 为 undefined 时自动跟随系统主题
   * @default undefined
   */
  colorScheme?: 'dark' | 'light';

  /**
   * 水印配置
   * @default { text: 'vue3-markdown-lite' }
   */
  watermark?: {
    /**
     * 水印文本内容
     * @default ''
     */
    text?: string;
    /**
     * 水印颜色
     * @default 'rgba(180, 180, 180, 0.3)'
     */
    color?: string;
    /**
     * 水印字体大小
     * @default '16px'
     */
    fontSize?: string;
    /**
     * 水印旋转角度
     * @default -20
     */
    rotate?: number;
    /**
     * 水印密度（间距）
     * @default 50
     */
    density?: number;
  };
}
