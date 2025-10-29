---
title: 上标和下标
description: 在markdown里渲染上标和下标，虽然用的很少
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---

# 语法
````markdown
~下标~ ^上标^
````


# 示例

<script setup>
import {MarkdownViewer} from "@"; 
import {ref} from "vue"; 
const typedExample = ref(`
~下标~ ^上标^
`)
</script>

<MarkdownViewer :text="typedExample" />
