# 示例展示

## 场景 1：基础文档渲染
**场景描述**：用于博客、文档中心等场景，展示包含标题、文本格式、列表、链接的基础 Markdown 内容。

**完整代码**：
```vue
<template>
  <div class="doc-container">
    <h2>基础文档示例</h2>
    <MarkdownViewer :text="docContent" />
  </div>
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

const docContent = ref(`
# Vue3 Markdown 渲染指南

欢迎阅读本指南，以下是基础用法说明：

## 1. 文本格式
- **粗体文本**：使用 \`**文本**\` 标记
- *斜体文本*：使用 \`*文本*\` 标记
- ~~删除线文本~~：使用 \`~~文本~~\` 标记

## 2. 链接与图片
- 访问 [GitHub 仓库](https://github.com/huoshicang/vue3-markdown-lite)
- 显示图片：
  ![示例图片](https://picsum.photos/200/100)

## 3. 列表
- 无序列表项 1
- 无序列表项 2
  - 子列表项 A
  - 子列表项 B

1. 有序列表项 1
2. 有序列表项 2
`);
</script>

<style scoped>
.doc-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
```

**效果说明**：
- 标题按 `#` 层级显示（h1 至 h6），自动生成相应字体大小和间距。
- 文本格式（粗体、斜体、删除线）正确生效。
- 链接显示为蓝色可点击状态，图片按指定尺寸渲染。
- 无序列表和有序表项按层级缩进，样式清晰。


## 场景 2：技术文档（代码+公式混合）
**场景描述**：用于技术教程、API 文档等场景，需同时展示代码块、数学公式和说明文本。

**完整代码**：
```vue
<template>
  <div class="tech-doc">
    <MarkdownViewer :text="techContent" />
  </div>
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

const techContent = ref(`
# 算法复杂度分析

## 1. 时间复杂度计算

对于循环语句：
\`\`\`java
for (int i = 0; i < n; i++) {
    // 执行 O(1) 操作
}
\`\`\`
其时间复杂度为 $O(n)$。

## 2. 求和公式

前 n 个自然数的和：
$$
S = 1 + 2 + ... + n = \frac{n(n+1)}{2}
$$
