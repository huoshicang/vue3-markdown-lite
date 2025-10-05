<template>
  <div ref="textRef" v-if="!isText" :class="['markdown-body']" v-html="renderedText"/>
  <div v-else v-text="text"/>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {escapeDollarNumber, escapeBrackets} from "@/utils/markdown-utils.ts";

import type {MarkdownViewerProps} from "./types";
import {createMarkdownIt} from "@/utils/markdown-it-config";
import {useCodeBlock} from "@/composables/useCodeBlock";

const textRef=ref()




// 基于类型定义声明 props，自动获得类型提示
const props = withDefaults(defineProps<MarkdownViewerProps>(), {
  text: () => "",
  isText: () => false,
  copyCoder: () => true,
  collapse: () => true,
  colorScheme: () => "light"
});

useCodeBlock(textRef, {
  collapse: props.collapse,
  copyCoder: props.copyCoder,
})

// 渲染后的文本
const renderedText = computed(() => {
  const value = props.text ?? "";
  if (!props.isText) {
    const escapedText = escapeBrackets(escapeDollarNumber(value));
    return createMarkdownIt({
      copyCoder: props.copyCoder,
      collapse: props.collapse,
    }).render(escapedText)
  }
  return value;
});

watch(
  () => props.colorScheme,
  (newMode) => document.documentElement.setAttribute("markdown-lite", newMode),
  { immediate: true }
);

</script>

<style lang="less">
.markdown-body *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>
