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
   * 是否按纯文本处理（不解析 Markdown 语法）
   * @default false
   */
  isText?: boolean;

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
   * 代码高亮主题（支持 highlight.js 内置主题）
   * 可选值：'atom-one-dark' | 'atom-one-light' | 'github' | 'monokai' 等
   * @default 'github'
   */
  highlightTheme?: string;

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
  darkMode?: boolean;
}
