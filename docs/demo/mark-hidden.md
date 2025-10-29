---
title: 标记和隐藏内
description: 在markdown里渲染标记和隐藏文本，这很有意思
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---



# 语法
````markdown
==标记==

!!隐藏内容!!
````


# 示例

<script setup>
import {MarkdownViewer} from "@"; 
import {ref} from "vue"; 
const typedExample = ref(`
==标记==

!!隐藏内容!!
`)
</script>

<MarkdownViewer :text="typedExample" />
