# vue3-markdown-lite

[![npm version](https://badge.fury.io/js/vue3-markdown-lite.svg)](https://badge.fury.io/js/vue3-markdown-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

轻量级 Vue3 Markdown 渲染组件，适合在 Vue3 项目中快速集成 Markdown 渲染功能，支持代码高亮、数学公式、图表渲染等特性。

## 特性

- ⚡ 简单易用：开箱即用，只需简单配置即可快速集成
- 🛠️ 功能全面：支持常见 Markdown 语法、代码高亮、数学公式等
- ✊ 扩展性强：可通过配置扩展更多自定义功能
- 📱 响应式：适配移动端和桌面端展示

## 安装

```bash
npm i vue3-markdown-lite
# 或
yarn add vue3-markdown-lite
```

## 快速开始

### 全局注册

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import Vue3MarkdownLite from "vue3-markdown-lite";

const app = createApp(App);
app.use(Vue3MarkdownLite);
app.mount("#app");
```

### 局部使用

```vue
<template>
  <MarkdownViewer :text="markdownText" />
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

const markdownText = ref(`
# 标题 1
## 标题 2

这是一段示例文本，支持 **粗体**、*斜体* 和 [链接](https://example.com)。

\`\`\`javascript
// 代码块示例
function greet() {
  console.log("Hello, Vue3 Markdown Lite!");
}
\`\`\`
`);
</script>
```

## API

| 属性名    | 类型    | 默认值 | 说明                |
|-----------|---------|--------|-------------------|
| text      | string  | ""     | 需要渲染的 Markdown 文本 |
| isText    | boolean | false  | 是否作为纯文本渲染         |
| copyCoder | boolean | true   | 是否启用代码块复制功能       |
| collapse | boolean | true   | 是否启用折叠            |

## 支持的语法

- 标题（# 至 ######）
- 文本格式（粗体、斜体、删除线等）
- 列表（有序列表、无序列表、任务列表）
- 链接与图片
- 代码块（支持语法高亮）
- 引用块
- 表格
- 数学公式（基于 KaTeX）
- 图表（基于 Mermaid）

## 待完成功能

- [ ] 代码块语法高亮主题切换：允许用户选择不同的高亮主题
- [ ] 代码块全屏显示：特别是对于长代码，全屏显示可以更好地阅读
- [ ] 代码搜索：在代码块内搜索特定文本
- [ ] 代码块换行切换：允许用户切换代码是否换行
- [ ] 图片预览和缩放：点击图片可以放大查看，支持缩放和旋转
- [ ] 目录（TOC）生成：根据标题自动生成目录，方便导航
- [ ] 暗黑模式支持：根据系统主题或手动切换暗黑模式
- [ ] 流程图和序列图等图表渲染：除了 Mermaid，可以支持更多图表类型
- [ ] 脚注支持：渲染脚注并提供跳转
- [ ] 任务列表：支持 GitHub 风格的任务列表
- [ ] 表格增强：支持表格排序、过滤等
- [ ] 数学公式渲染优化：支持更多的数学公式格式和渲染方式
- [ ] 自定义样式：允许用户自定义 Markdown 的渲染样式
- [ ] 导出功能：将渲染后的 Markdown 导出为 PDF 或 HTML
- [ ] 水印：为内容添加水印，防止未授权复制

## 示例

查看 [在线示例](https://huoshicang.github.io/vue3-markdown-lite/demo/) 了解更多使用方式。

## 贡献

欢迎提交 Issues 或 Pull Requests 来帮助改进这个项目。

1. Fork 本仓库
2. 创建分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。
