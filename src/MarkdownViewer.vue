<script setup lang="ts">
import { ref } from "vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

const props = defineProps<{
  content: string;
}>();

// ✅ 给 md 加上类型
const md: MarkdownIt = new MarkdownIt({
  highlight(code: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (__) {
        return code;
      }
    }
    return code;
  }
});
</script>

<template>
  <div v-html="md.render(props.content)"></div>
</template>
