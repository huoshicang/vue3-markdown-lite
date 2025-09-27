# API

### MarkdownViewer Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | `string` | `""` | 需要渲染的 Markdown 文本内容 |
| isText | `boolean` | `false` | 是否按纯文本处理（不解析 Markdown 语法） |
| copyCoder | `boolean` | `true` | 是否启用代码块复制功能 |
| coderNumber | `boolean` | `true` | 是否显示代码块行号 |
| collapse | `boolean` | `true` | 是否允许代码块折叠/展开 |
| highlightTheme | `string` | `"github"` | 代码高亮主题（支持 highlight.js 内置主题，如 'atom-one-dark'、'atom-one-light'、'github'、'monokai' 等） |
| wrapCode | `boolean` | `false` | 代码块是否自动换行 |
| darkMode | `boolean \| undefined` | `undefined` | 是否启用暗黑模式（为 undefined 时自动跟随系统主题） |
