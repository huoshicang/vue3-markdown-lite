---
title: 文本对齐
description: 在markdown里渲染文本对齐，支持左对齐、居中对齐、右对齐
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---


# 语法
````markdown
::: left | center | right
居中的内容
:::
````



# 示例

<script setup>
import {MarkdownViewer} from "@"; 
import {ref} from "vue"; 
const typedExample = ref(`
::: left
左侧的内容
:::

::: center
居中的内容
:::

::: right
右侧的内容
:::
`)
</script>

<MarkdownViewer :text="typedExample" />
