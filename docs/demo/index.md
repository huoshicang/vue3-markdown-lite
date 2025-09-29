# 演示

<script setup>
import DemoButton from './components/DemoButton.vue'
// 2. 导入组件源码（?raw 后缀获取原始文本）
import DemoButtonSource from './components/DemoButton.vue?raw'
</script>

<DemoButton />

```html
<template>
  <MarkdownViewer :text="text" />
</template>
<script setup lang="ts">
import { MarkdownViewer } from "../src";
import {ref} from "vue";

const text = ref(``)
</script>
```
