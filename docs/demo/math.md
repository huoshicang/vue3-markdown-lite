---
title: 数学表达式
description: 在markdown里渲染数学表达式，支持行内和块级表达式
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---


# 语法
````markdown
$E=mc^2$
````


# 示例

<script setup>
import {MarkdownViewer} from "@"; 
import {ref} from "vue"; 
const typedExample = ref(`
$E=mc^2$

还可以居中显示数学表达式
::: center
$E=mc^2$
:::
`)
</script>

<MarkdownViewer :text="typedExample" />
