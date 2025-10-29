---
title: 警告块
description: 在markdown里渲染警告块
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---


# 配置
```plaintext
> [!warning]
> 警告文字
```

# 语法
````markdown
> [!warning]
> 警告文字
>
> > [!warning]
> > 嵌套警告文字

- > [!warning]
  > 警告文字
````


# 示例

<script setup>
import {MarkdownViewer} from "@"; 
import {ref} from "vue"; 
const typedExample = ref(`
> [!warning]
> 警告文字
>
> > [!warning]
> > 嵌套警告文字

- > [!warning]
  > 警告文字
`)
</script>

<MarkdownViewer :text="typedExample" />
