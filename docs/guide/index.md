# 指南

### 安装与引入

#### 1. 安装依赖

```bash
npm install vue3-markdown-lite
```

#### 2. 全局注册（推荐）

在 VitePress 或 Vue 项目的入口文件中注册组件：

```javascript
// .vitepress/theme/index.ts 或 main.ts
import { createApp } from 'vue'
import App from './App.vue'
import MarkdownViewer from 'vue3-markdown-lite' // 替换为实际组件路径

const app = createApp(App)
app.use(MarkdownViewer) // 全局注册
app.mount('#app')
```

#### 3. 局部引入

在需要使用的组件中单独引入：

```vue
<template>
  <MarkdownViewer text="# 局部引入示例" />
</template>

<script setup>
import { MarkdownViewer } from 'vue3-markdown-lite'
</script>
```

### 基础用法

#### 渲染简单 Markdown 文本

```vue
<template>
  <MarkdownViewer 
    text="# 标题一级\n## 标题二级\n- 列表项1\n- 列表项2\n**加粗文本**" 
  />
</template>
```

#### 纯文本展示（不解析语法）

```vue
<template>
  <MarkdownViewer 
    text="# 这是纯文本，不会被解析为标题" 
    :isText="true" 
  />
</template>
```

### 代码块高级配置

#### 完整代码块功能演示

```vue
<template>
  <MarkdownViewer 
    text="```javascript
function greeting(name) {
  return `Hello, ${name}!`;
}
console.log(greeting('Markdown'));
```"
    :copyCoder="true"  // 启用复制
    :coderNumber="true" // 显示行号
    :collapse="true" // 允许折叠
  />
</template>
```

#### 禁用代码块交互功能

```vue
<template>
  <MarkdownViewer 
    text="```python
print('无交互功能的代码块')
```"
    :copyCoder="false"
    :collapse="false"
    :coderNumber="false"
  />
</template>
```

### 主题与布局
#### 响应式布局适配

组件会自动适配移动端与桌面端，无需额外配置：

```vue
<template>
  <MarkdownViewer 
    text="### 响应式布局\n在手机和电脑上会自动调整内边距" 
  />
</template>
```

### 扩展语法支持

#### 数学公式渲染

```vue
<template>
  <MarkdownViewer 
    text="### 数学公式示例
行内公式：$a^2 + b^2 = c^2$

块级公式：
$$\int_{a}^{b} f(x) dx = F(b) - F(a)$$"
  />
</template>
```

#### 图表渲染（Mermaid）

```vue
<template>
  <MarkdownViewer 
    text="```mermaid
sequenceDiagram
  Alice->>Bob: Hello Bob, how are you?
  Bob-->>Alice: I'm good, thanks!
```"
  />
</template>
```

## 内部工具函数说明

### 文本处理工具（`markdown-utils.ts`）

#### `escapeDollarNumber(text: string): string`
- 功能：转义数字前的 `$` 符号，避免与公式语法冲突
- 示例：将 `$123` 转换为 `\$123`

#### `escapeBrackets(text: string): string`
- 功能：将 LaTeX 风格的公式括号（`\[ \]` 和 `\( \)`）转换为 Markdown 公式语法（`$$ $$` 和 `$ $`）
- 注意：会跳过代码块内的内容，避免误处理

### 代码块工具（`code-block-utils.ts`）

#### `highlightBlock(highlightedCode: string, lang: string, props: MarkdownViewerProps): string`
- 功能：生成带样式的代码块 HTML，包含行号、复制按钮、折叠按钮等元素
- 参数：
    - `highlightedCode`：高亮后的代码字符串
    - `lang`：代码语言
    - `props`：组件属性配置

### 渲染工具（`markdown-renderer.ts`）

#### `renderMarkdown(text: string, props: MarkdownViewerProps): string`
- 功能：将 Markdown 文本渲染为 HTML
- 特性：通过缓存 `markdown-it` 实例提高渲染性能

### 交互工具（`useCodeBlock.ts`）

#### `useCodeBlock(textRef: Ref<HTMLElement | undefined>, props: MarkdownViewerProps)`
- 功能：处理代码块的交互逻辑（复制、折叠）
- 生命周期：在组件挂载、更新时自动绑定/解绑事件监听
