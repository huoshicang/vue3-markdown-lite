# 演示

```typescript
import { createApp } from "vue";
import App from "./App.vue";

import Vue3MarkdownLite from "vue3-markdown-lite";

const app = createApp(App);
app.use(Vue3MarkdownLite);
app.mount("#app");
```

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
