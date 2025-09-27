<template>
  <div class="text-black" :class="wrapClass">
    <div ref="textRef" class="leading-relaxed break-words">
      <div>
        <div v-if="!isText" class="markdown-body" v-html="renderedText"/>
        <div v-else class="whitespace-pre-wrap" v-text="text"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useBasicLayout} from "@/utils/useBasicLayout.ts";
import {useCodeBlock} from "./composables/useCodeBlock.ts";
import {renderMarkdown} from "@/utils/markdown-renderer.ts";
import {escapeDollarNumber, escapeBrackets} from "@/utils/markdown-utils.ts";

import type {MarkdownViewerProps} from "./types";

// 基于类型定义声明 props，自动获得类型提示
const props = withDefaults(defineProps<MarkdownViewerProps>(), {
  text: "",
  isText: false,
  copyCoder: true,
  coderNumber: true,
  collapse: true,
  highlightTheme: "github",
  wrapCode: false,
  darkMode: undefined, // 保持默认跟随系统
});

const {isMobile} = useBasicLayout();
const textRef = ref<HTMLElement>();

// 代码块事件处理
useCodeBlock(textRef, props);

// 计算类名
const wrapClass = computed(() => [
  "text-wrap",
  "min-w-[20px]",
  "rounded-md",
  isMobile.value ? "p-2" : "px-3 py-2",
]);

// 渲染后的文本
const renderedText = computed(() => {
  const value = props.text ?? "";
  if (!props.isText) {
    const escapedText = escapeBrackets(escapeDollarNumber(value));
    return renderMarkdown(escapedText, props);
  }
  return value;
});


</script>

<style lang="less">
@import url(../assets/style);
@import url(./styles/markdown-viewer.less);
</style>
