# vue3-markdown-lite

轻量级 Vue3 Markdown 渲染组件，适合在 Vue3 项目中快速集成 Markdown 渲染功能，支持代码高亮、数学公式、图表渲染等丰富特性。

## 特性

- ⚡ 简单易用：开箱即用，只需简单配置即可快速集成
- 🛠️ 功能全面：支持常见 Markdown 语法、代码高亮、数学公式、图表渲染等
- ✊ 扩展性强：可通过配置扩展更多自定义功能
- 📱 响应式：适配移动端和桌面端展示
- 🌓 主题支持：内置亮色/暗色模式切换
- 📊 图表支持：集成 Mermaid 和 ECharts 图表渲染
- 🧮 数学公式：支持 LaTeX 数学公式渲染
- 📋 任务列表：支持 GitHub 风格的任务列表
- 💬 提示框：支持信息、成功、警告、错误等类型提示框
- 🔤 打字机效果：集成 Typed.js 实现打字机效果
- 📤 导出功能：支持将内容导出为 PDF 格式
- 🔢 代码行号：支持显示代码块行号
- 🔄 代码换行：支持代码块内容自动换行
- 💧 水印功能：支持自定义水印配置
- 📊 表格增强：支持表格排序和过滤功能

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
  <MarkdownViewer :text="markdownText" :colorScheme="colorScheme" />
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

const colorScheme = ref('light'); // 可选: 'light' 或 'dark'
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

### MarkdownViewer Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | string | "" | 需要渲染的 Markdown 文本 |
| isText | boolean | false | 是否作为纯文本渲染 |
| copyCoder | boolean | true | 是否启用代码块复制功能 |
| collapse | boolean | true | 是否启用代码块折叠功能 |
| coderNumber | boolean | true | 是否显示代码块行号 |
| wrapCode | boolean | false | 代码块是否自动换行 |
| colorScheme | 'dark' \| 'light' \| undefined | undefined | 主题模式，为 undefined 时自动跟随系统主题 |
| watermark | object | { text: 'vue3-markdown-lite' } | 水印配置 |
| enableTableSorting | boolean | true | 是否启用表格排序功能 |
| enableTableFiltering | boolean | true | 是否启用表格过滤功能 |

### watermark 配置项

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | string | '' | 水印文本内容 |
| color | string | 'rgba(180, 180, 180, 0.3)' | 水印颜色 |
| fontSize | string | '16px' | 水印字体大小 |
| rotate | number | -20 | 水印旋转角度 |
| density | number | 150 | 水印密度（间距） |

## 支持的语法与功能

### 基础语法

- 标题: 使用 # 符号创建不同级别的标题
- 文本格式: 支持 粗体、斜体、~~删除线~~、行内代码 等
- 列表: 支持有序列表、无序列表、嵌套列表
- 链接与图片: 支持插入外部链接和图片
- 引用块: 使用 > 符号创建引用块
- 表格: 支持标准 Markdown 表格语法

### 高级功能

#### 1. 目录生成

在文档中插入 `[TOC]` 或 `[TOCM]` 可以自动生成目录：

```markdown
[TOC]

# 标题 1
## 标题 2
```

#### 2. 任务列表

支持 GitHub 风格的任务列表：

```markdown
- [x] 已完成任务
- [ ] 未完成任务
    - [ ] 子任务 1
    - [x] 子任务 2
```

#### 3. 数学公式

支持基于 LaTeX 的数学公式：

```markdown
$$
E=mc^2
$$
```

#### 4. 代码高亮

支持各种编程语言的代码高亮，并可配置行号显示和自动换行：

```markdown
\`\`\`javascript
// JavaScript 代码示例
function greet() {
  console.log("Hello, World!");
}
\`\`\`
```

#### 5. 图表渲染

##### Mermaid 图表

支持流程图、序列图、甘特图等：

```markdown
\`\`\`mermaid
graph TD
    A[用户请求] --> B[语义解析]
    B --> C[RAG检索]
    C -->|✅ 知识库匹配| D[上下文增强]
\`\`\`

\`\`\`mermaid
sequenceDiagram
  participant Alice
  participant Bob
  Alice->John: Hello John, how are you?
\`\`\`

\`\`\`mermaid
gantt
  title 项目开发流程
  section 项目确定
    需求分析 :a1, 2019-06-22, 3d
\`\`\`
```

##### ECharts 图表

支持使用 ECharts 渲染交互式图表：

```markdown
\`\`\`echarts
{
  "backgroundColor": "#212121",
  "title": {
    "text": "访问来源统计"
  },
  "series": [
    {
      "name": "访问来源",
      "type": "pie",
      "data": [
        {"value": 10440, "name": "搜索引擎"},
        {"value": 4770, "name": "直接访问"}
      ]
    }
  ]
}
\`\`\`
```

#### 6. 提示框

支持四种类型的提示框：

```markdown
:::info 「提示」
这是一条提示信息
:::

:::success 「成功」
这是一条成功信息
:::

:::warning 「警告」
这是一条警告信息
:::

:::error 「错误」
这是一条错误信息
:::
```

#### 7. 打字机效果

集成 Typed.js 实现打字机效果：

```markdown
==
{
  "strings": [
    "# 欢迎来到我的世界。",
    "我是一名前端开发者。"
  ],
  "typeSpeed": 50,
  "backSpeed": 30,
  "loop": true
}
==
```

#### 8. 表格增强

支持表格排序和过滤功能，可通过 `enableTableSorting` 和 `enableTableFiltering` 属性控制：

```markdown
| 时间        | 吃什么   |
| :--------  | :-----  |
| 早上 | 米饭|
| 中午 | 米饭 |
| 晚上 | 米饭|
```

#### 9. 水印功能

支持自定义水印配置，可通过 `watermark` 属性设置：

```vue
<template>
  <MarkdownViewer 
    :text="markdownText"
    :watermark="{
      text: '内部文档',
      color: 'rgba(200, 0, 0, 0.2)',
      fontSize: '20px',
      rotate: -15,
      density: 60
    }"
  />
</template>
```

## 完整示例

以下是一个包含所有主要功能的完整示例：

```vue
<template>
  <div class="markdown-container">
    <MarkdownViewer 
      :text="text" 
      :colorScheme="colorScheme"
      :coderNumber="true"
      :wrapCode="false"
      :enableTableSorting="true"
      :enableTableFiltering="true"
      :watermark="{
        text: 'vue3-markdown-lite',
        color: 'rgba(180, 180, 180, 0.3)',
        fontSize: '16px',
        rotate: -20,
        density: 150
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { MarkdownViewer } from "vue3-markdown-lite";
import { ref } from "vue";

const colorScheme = ref('light');

// 从 example/App.vue 中提取的示例文本
const text = ref(\`
[TOCM]

[TOC]

~~删除线~~
*斜体字*
**粗体**
***粗斜体***

## 什么是 Markdown

\`Markdown\` 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号，以最小的输入代价，生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体**、*斜体* 或者[超文本链接](https://vue-cli3.lovejade.cn/explore/)，更棒的是，它还可以：

---

### 1. 制作待办事宜 \`Todo\` 列表

- [x] 🎉 通常 \`Markdown\` 解析器自带的基本功能；
- [x] 🍀 支持**流程图**、**甘特图**、**时序图**、**任务列表**；
- [x] 🏁 支持粘贴 HTML 自动转换为 Markdown；
- [x] 💃🏻 支持插入原生 Emoji、设置常用表情列表；
- [x] ✨ 支持**导出**携带样式的 PDF；

---

### 2. 书写一个质能守恒公式[^LaTeX]

$$
E=mc^2
$$

---

### 3. 高亮一段代码[^code]

\`\`\`js
// 给页面里所有的 DOM 元素添加一个 1px 的描边（outline）;
[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
})
\`\`\`

---

### 4. 高效绘制流程图

\`\`\`mermaid
graph TD
    A[用户请求] --> B[语义解析]
    B --> C[RAG检索]
    
    C -->|✅ 知识库匹配| D[上下文增强]
    C -->|❌ 无匹配| E[任务分解]
    
    D --> E
    
    E --> F{工具选择}
    
    F -->|🛠️ 核心工具| G{基础操作}
    F -->|🔌 MCP扩展服务| H{MCP操作}
    
    G -->|✏️ 文件操作| I[读写/替换]
    G -->|🖥️ 系统命令执行| J[执行命令]
    G -->|🔍 代码分析| K[代码分析]
    
    H -->|⚙️ 使用MCP工具| L[使用MCP工具]
    H -->|📦 访问MCP资源| M[访问MCP资源]
    
    I --> N[结果验证]
    J --> N
    K --> N
    L --> N
    M --> N
    
    N --> O{完成判断}
    
    O -->|✅| P[提交最终结果]
    O -->|❌| E
\`\`\`

---

### 5. 高效绘制序列图

\`\`\`mermaid
sequenceDiagram
  participant Alice
  participant Bob
  Alice->John: Hello John, how are you?
  loop Healthcheck
      John->John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail...
  John-->Alice: Great!
  John->Bob: How about you?
  Bob-->John: Jolly good!
\`\`\`

---

### 6. 高效绘制甘特图

> **甘特图**内在思想简单。基本是一条线条图，横轴表示时间，纵轴表示活动（项目），线条表示在整个期间上计划和实际的活动完成情况。它直观地表明任务计划在什么时候进行，及实际进展与计划要求的对比。

\`\`\`mermaid
gantt
  title 项目开发流程
  section 项目确定
    需求分析       :a1, 2019-06-22, 3d
    可行性报告     :after a1, 5d
    概念验证       : 5d
  section 项目实施
    概要设计      :2019-07-05  , 5d
    详细设计      :2019-07-08, 10d
    编码          :2019-07-15, 10d
    测试          :2019-07-22, 5d
  section 发布验收
    发布: 2d
    验收: 3d
\`\`\`

### 7. 支持图表

\`\`\`echarts
{
  "backgroundColor": "#212121",
  "title": {
    "text": "echarts",
    "subtext": "2019 年 6 月份",
    "x": "center",
    "textStyle": {
      "color": "#f2f2f2"
    }
  },
  "tooltip": {
    "trigger": "item",
    "formatter": "{a} <br/>{b} : {c} ({d}%)"
  },
  "legend": {
    "orient": "vertical",
    "left": "left",
    "data": [
      "搜索引擎",
      "直接访问",
      "推荐",
      "其他",
      "社交平台"
    ],
    "textStyle": {
      "color": "#f2f2f2"
    }
  },
  "series": [
    {
      "name": "访问来源",
      "type": "pie",
      "radius": "55%",
      "center": [
        "50%",
        "60%"
      ],
      "data": [
        {
          "value": 10440,
          "name": "搜索引擎",
          "itemStyle": {
            "color": "#ef4136"
          }
        },
        {
          "value": 4770,
          "name": "直接访问"
        },
        {
          "value": 2430,
          "name": "推荐"
        },
        {
          "value": 342,
          "name": "其他"
        },
        {
          "value": 18,
          "name": "社交平台"
        }
      ],
      "itemStyle": {
        "emphasis": {
          "shadowBlur": 10,
          "shadowOffsetX": 0,
          "shadowColor": "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}
\`\`\`

> **备注**：上述 echarts 图表📈，其数据，须使用严格的 **JSON** 格式；您可使用 JSON.stringify(data)，将对象传换从而得标准数据，即可正常使用。

---

### 8. 绘制表格

| 时间        | 吃什么   |
| :--------  | :-----  |
| 早上 | 米饭|
| 中午 | 米饭 |
| 晚上 | 米饭|
| 夜宵 | 米饭 |
| 还吃米饭 ！？ |

---
### 9. 提示

语法格式为\`:::info|success|warning|error「标题」内容:::\`

:::info 「提示」
提示
:::

:::error 「错误」
错误
:::

:::success 「成功」
成功
:::

:::warning 「警告」
警告
:::

---

### 10. 使用Typed.js的打字效果

语法格式为（支持使用Typed.js的配置项）
\`\`\`json
{
  "strings": [
    "# 欢迎来到我的世界。",
    "我是一名前端开发者。",
    "也热爱设计与创造。"
  ],
  "typeSpeed": 50,
  "backSpeed": 30,
  "loop": true
}
\`\`\`

==
{
  "strings": [
    "# 欢迎来到我的世界。",
    "我是一名前端开发者。",
    "也热爱设计与创造。"
  ],
  "typeSpeed": 50,
  "backSpeed": 30,
  "loop": true
}
==

---
### 11. 更详细语法说明

想要查看更详细的语法说明，可以参考这份 [Markdown 资源列表](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/markdown-tutorial.md)，涵盖入门至进阶教程，以及资源、平台等信息，能让您对她有更深的认知。
\`);
</script>
```

## 项目架构

vue3-markdown-lite 采用模块化设计，主要包含以下核心模块：

### 主要文件结构

\`\`\`
src/
├── MarkdownViewer.vue       # 主组件
├── components/              # 子组件（目前为空）
├── composables/             # 组合式函数
│   ├── useCodeBlock.ts      # 代码块功能
│   ├── useECharts.ts        # ECharts 图表功能
│   ├── useImageEdit.ts      # 图片编辑功能
│   ├── useTableEnhancement.ts # 表格增强功能
│   └── useTyped.ts          # 打字机效果
├── directives/              # 自定义指令
│   └── watermark.ts         # 水印指令
├── mdUtils/                 # Markdown 扩展工具
│   ├── alert.ts             # 提示框插件
│   ├── echarts.ts           # ECharts 插件
│   ├── imageEdit.ts         # 图片编辑插件
│   └── typed.ts             # 打字机效果插件
├── styles/                  # 样式文件
├── types/                   # 类型定义
│   └── index.ts             # 主要类型定义
└── utils/                   # 工具函数
    ├── code-block-utils.ts  # 代码块工具
    ├── copy.ts              # 复制工具
    ├── export-utils.ts      # 导出工具
    ├── markdown-it-config.ts # Markdown 解析器配置
    └── markdown-utils.ts    # Markdown 工具
\`\`\`

### 核心模块说明

1. **主组件** (`MarkdownViewer.vue`)
   - 整个库的核心组件，负责 Markdown 文本的解析和渲染
   - 集成了所有功能模块

2. **组合式函数** (`composables/`)
   - 采用 Vue3 的组合式 API 设计
   - 将不同功能模块化，便于维护和扩展
   - 包含代码块、图表、图片编辑、表格增强等功能模块

3. **类型定义** (`types/index.ts`)
   - 提供完整的 TypeScript 类型支持
   - 定义了组件属性、配置项等类型

4. **扩展工具** (`mdUtils/` 和 `utils/`)
   - 提供 Markdown 解析增强功能
   - 包含代码块工具、导出工具等实用功能

## 待完成功能

- [ ] 代码块全屏显示：特别是对于长代码，全屏显示可以更好地阅读
- [ ] 代码搜索：在代码块内搜索特定文本
- [ ] 目录（TOC）增强：支持目录折叠和跳转
- [ ] 脚注支持：渲染脚注并提供跳转

## 示例

查看 [在线示例](https://huoshicang.github.io/vue3-markdown-lite/demo/) 了解更多使用方式。

## 贡献

欢迎提交 Issues 或 Pull Requests 来帮助改进这个项目。

1. Fork 本仓库
2. 创建分支 (\`git checkout -b feature/amazing-feature\`)
3. 提交更改 (\`git commit -m 'Add some amazing feature'\`)
4. 推送到分支 (\`git push origin feature/amazing-feature\`)
5. 打开 Pull Request

## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。
