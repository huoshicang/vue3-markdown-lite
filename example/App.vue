<template>
  <MarkdownViewer :text="markdownText"/>
</template>
<script setup lang="ts">

import {ref} from "vue";
import {MarkdownViewer} from "../src";




const markdownText = ref(`
目录语法\`[[toc]]\`
[[toc]]

# 标题

# H1 标题
## H2 标题
### H3 标题
#### H4 标题
##### H5 标题
###### H6 标题


# 文本格式化
**粗体文本**
*斜体文本*
***粗体和斜体***
~~删除线~~
\`内联代码\`


# 列表
- 无序列表项
- 另一个项目
  - 嵌套项目
  - 另一个嵌套项目

1. 有序列表项
2. 另一个项目
   1. 嵌套有序项目
   2. 另一个嵌套项目


# 链接和图片
[Markdown Lang](https://www.markdownlang.com/)
[带标题的 Markdown Lang](https://www.markdownlang.com/ "Markdown Lang")

![替代文本](image-url.jpg)
![带标题的图片](image-url.jpg "图片标题")


# 代码块
\`\`\`python
def loadRequestParams(request_obj):
    param = {}
    try:
        if request_obj.method == 'POST':
            if 'file' in request.files:
                pass
            elif request_obj.form:
                for k in request_obj.form:
                    param[k] = request_obj.form.get(k)
            elif request_obj.json:
                for k in request_obj.json:
                    param[k] = request_obj.json.get(k)

        elif request_obj.method == 'GET':
            if request_obj.args:
                for k in request_obj.args:
                    param[k] = request_obj.args.get(k)
    except Exception as e:
        traceback.print_exc()
        print(e)
    return param
\`\`\`

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`

# 代码组
:::code-group
# 代码块
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
:::

# 高效绘制流程图
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


# 高效绘制序列图

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


# 高效绘制甘特图

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

# 支持图表

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

# 使用Typed.js的打字效果

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


# 表格
| 列 1 | 列 2 | 列 3 |
|------|------|------|
| 行 1 | 数据 1 | 数据 2 |
| 行 2 | 数据 3 | 数据 4 |


# 引用块
> 这是一个引用块。
> 它可以包含多行文本。
> 引用块通常用于引用其他来源的内容。


# 分割线
---

***


# 缩略
*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

The HTML specificationis maintained by the W3C.


# 警告块
语法：
\`\`\`
> [!warning]
> 警告文字
\`\`\`

> [!warning]
> 警告文字


# 对齐
语法：
\`\`\`
::: center
居中的内容
:::
\`\`\`

::: center
居中的内容
:::


# 带有标题的图片
语法：
\`\`\`
![Logo](/favicon.ico)

[![Logo](/favicon.ico)](https://mdit-plugins.github.io/logo.svg)

![Logo](/favicon.ico "Markdown")

[![Logo](/favicon.ico "Markdown")](https://mdit-plugins.github.io/logo.svg)
\`\`\`

![Logo](/favicon.ico)

[![Logo](/favicon.ico)](https://mdit-plugins.github.io/logo.svg)

![Logo](/favicon.ico "Markdown")

[![Logo](/favicon.ico "Markdown")](https://mdit-plugins.github.io/logo.svg)


# 设置图片尺寸
语法：
\`\`\`
![替代文字|200x200](https://mdit-plugins.github.io/logo.svg)
\`\`\`

![替代文字|200x200](https://mdit-plugins.github.io/logo.svg)


# 数学表达式
语法：\`$E=mc^2$\`

$E=mc^2$

还可以居中显示数学表达式
::: center
$E=mc^2$
:::


# 标记和突出显示内
语法：\`==标记==\`

==标记==


# 隐藏内容
语法：\`!!隐藏内容!!\`

!!隐藏内容!!


# 上标 下标
语法：\`~下标~ ^上标^\`

~下标~ ^上标^


# 任务
语法：\`- [ ] 没好\`
\`- [x] 好了\`

- [ ] 没好
- [x] 好了

`);

</script>
<style>

</style>
