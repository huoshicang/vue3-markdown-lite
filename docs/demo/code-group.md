---
title: 代码组
description: 找不到插件，所以在自己定义的代码块上添加了代码组的功能
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---



# 语法
````markdown
:::code-group
# 代码块
```javascript
function hello() {
  console.log("Hello, World!");
}
```

```python
def hello():
    print("Hello, World!")
```
:::
````



# 示例

<script setup>
import {MarkdownViewer} from "@"; 
import {ref} from "vue"; 
const typedExample = ref(`
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
`)
</script>

<MarkdownViewer :text="typedExample" />
