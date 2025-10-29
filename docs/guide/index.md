# 使用指南

## 安装步骤

### 开发环境
- Node.js 版本 = v22.7.0
- Vue 版本 = 3.5.22
- npm 版本 = 10.9.2

### 安装命令
支持 npm、yarn、pnpm 安装：

```bash
# npm
npm install vue3-markdown-lite --save

# yarn
yarn add vue3-markdown-lite

# pnpm
pnpm add vue3-markdown-lite
```


## 快速开始

以下是最简单的使用示例，实现 Markdown 文本的基础渲染：

```vue
<template>
  <!-- 引入组件并绑定 Markdown 文本 -->
  <MarkdownViewer :text="mdContent" />
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

// 定义需要渲染的 Markdown 内容
const mdContent = ref(`
# 欢迎使用 vue3-markdown-lite

这是一个 **轻量级** 的 Vue3 Markdown 渲染组件。

## 特性
- 支持基础语法
- 代码高亮
- 数学公式

\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`
`);
</script>
```

**运行效果**：页面将按 Markdown 语法规则渲染内容，包括标题层级、粗体文本、列表及带语法高亮的代码块。


## 核心功能详解

### 1. 代码高亮与复制功能
组件默认支持代码块语法高亮（基于 highlight.js）及一键复制功能，无需额外配置。

**使用示例**：
```vue
<template>
  <MarkdownViewer 
    :text="codeExample" 
    :copyCoder="true"  <!-- 启用复制功能（默认开启） -->
  />
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

const codeExample = ref(`
\`\`\`python
# Python 代码示例
def add(a, b):
    return a + b

print(add(1, 2))  # 输出：3
\`\`\`
`);
</script>
```

**适用场景**：技术文档、代码教程等需要展示代码并支持读者复制的场景。

**实现逻辑**：组件通过 `highlight.js` 解析代码块语言并添加高亮样式，同时为每个代码块添加复制按钮（点击触发 `navigator.clipboard.writeText` 实现复制）。


### 2. 数学公式渲染（基于 KaTeX）
通过配置可启用数学公式渲染，支持 inline 公式（`$...$`）和块级公式（`$$...$$`）。

**使用步骤**：
1. 在组件中启用公式渲染：
   ```vue
   <template>
     <MarkdownViewer :text="mathExample" />
   </template>

   <script setup lang="ts">
   import { MarkdownViewer } from "vue3-markdown-lite";
   import { ref } from "vue";

   const mathExample = ref(`
   # 数学公式示例

   Inline 公式：$E=mc^2$

   块级公式：
   $$
   \sum_{i=1}^n i = \frac{n(n+1)}{2}
   $$
   `);
   </script>
   ```

**适用场景**：学术文档、数学教程等需要展示公式的场景。


### 3. 图表渲染（基于 Mermaid）
支持通过 Mermaid 语法渲染流程图、时序图等图表。

**使用步骤**：
1. 渲染图表示例：
   ```vue
   <template>
     <MarkdownViewer :text="mermaidExample" />
   </template>

   <script setup lang="ts">
   import { MarkdownViewer } from "vue3-markdown-lite";
   import { ref } from "vue";

   const mermaidExample = ref(`
   # 流程图示例

   \`\`\`mermaid
   graph TD
     A[开始] --> B[安装组件]
     B --> C[引入组件]
     C --> D[渲染成功]
     D --> E[结束]
   \`\`\`
   `);
   </script>
   ```

**适用场景**：系统设计文档、流程说明等需要可视化图表的场景。
