---
title: mermaid 图表
description: 在markdown里实现 mermaid 图表
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---


# 配置
```plaintext
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
```

# 语法
````markdown
```mermaid

```
````


# 示例

<script setup>
import {MarkdownViewer} from "@"; 
import {ref} from "vue"; 
const typedExample = ref(`
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
`)
</script>

<MarkdownViewer :text="typedExample" />
