
# API 文档

## MarkdownViewer 组件

### 基本信息
- 名称：`MarkdownViewer`
- 功能：渲染 Markdown 文本，支持代码高亮、公式、图表等扩展功能。


### 属性配置

| 属性名     | 类型    | 必填 | 默认值 | 说明                                                                 |
|------------|---------|------|--------|----------------------------------------------------------------------|
| text       | string  | 是   | ""     | 需要渲染的 Markdown 文本内容。                                       |
| isText     | boolean | 否   | false  | 是否将内容作为纯文本渲染（不解析 Markdown 语法）。                   |
| copyCoder  | boolean | 否   | true   | 是否为代码块添加复制按钮（点击复制代码内容）。                       |
| collapse   | boolean | 否   | true   | 是否允许代码块折叠（点击代码块标题可展开/折叠内容）。                 |


### 使用示例

```vue
<template>
  <MarkdownViewer 
    :text="mdText" 
    :copyCoder="false"  <!-- 禁用复制功能 -->
    :collapse="false"   <!-- 禁用折叠功能 -->
  />
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

const mdText = ref("# 示例文本\n这是一段不带代码块功能的 Markdown 内容。");
</script>
```


### 注意事项
- `text` 为空时，组件会渲染空内容，建议传入前判断文本有效性。
- 启用数学公式或图表渲染时，需手动安装对应依赖（`katex` 或 `mermaid`），否则相关内容会按普通文本显示。
- `isText` 为 `true` 时，所有 Markdown 语法（包括代码块、公式）均不解析，适合展示原始文本。



对应代码实现的时间复杂度为 $O(n)$。

## 3. 注意事项
- 代码块支持复制功能（点击右上角按钮）
- 公式支持 KaTeX 语法，可渲染复杂数学表达式
  `);
  </script>

<style scoped>
.tech-doc {
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
```

**效果说明**：
- 代码块显示 Java 语法高亮，右上角有复制按钮（点击后提示“复制成功”）。
- 公式部分正确渲染为数学表达式（inline 公式和块级公式样式区分）。
- 整体布局适配技术文档的阅读习惯，代码与文本间距合理。


