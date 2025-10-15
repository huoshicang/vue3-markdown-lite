<template>
  <div class="markdown-container">
    <div ref="textRef" v-if="!isText" :class="['markdown-body']" v-html="renderedText" v-watermark="watermarkOptions"/>
    <div v-else v-text="text"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch, defineProps, onMounted, createApp} from "vue";
import {escapeDollarNumber, escapeBrackets} from "@/utils/markdown-utils.ts";
import ImageViewer from './components/ImageViewer.vue';
import type {MarkdownViewerProps} from "./types";
import {createMarkdownIt} from "@/utils/markdown-it-config";
import {useCodeBlock} from "@/composables/useCodeBlock";
import watermark from './directives/watermark';
import {exportToPDF} from "@/utils/export-utils";

// 注册水印指令
const vWatermark = watermark;
const textRef = ref<HTMLElement | undefined>();


// 基于类型定义声明 props，自动获得类型提示
const props = withDefaults(defineProps<MarkdownViewerProps>(), {
  text: () => "",
  isText: () => false,
  copyCoder: () => true,
  collapse: () => true,
  colorScheme: () => "light",
  watermark: () => ({text: ''})
});

// 代码块事件处理
useCodeBlock(textRef, {
  collapse: props.collapse,
  copyCoder: props.copyCoder,
})


// 水印配置
const watermarkOptions = computed(() => {
  return {...props.watermark} || {};
});

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

// 校验内容元素是否有效
const getValidElement = (): HTMLElement | null => {
  if (!textRef.value) return null;
  // 确保是 div.markdown-body
  if (textRef.value.tagName.toLowerCase() !== 'div' ||
    !textRef.value.classList.contains('markdown-body')) {
    console.error('导出失败：目标元素不是 div.markdown-body');
    return null;
  }
  return textRef.value;
};

// 导出PDF的方法（供父组件调用）
const exportPDF = (filename = 'document.pdf', includeWatermark?: boolean) => {
  const element = getValidElement();
  if (!element) return;
  // 优先使用方法参数，其次使用props默认值
  const useWatermark = includeWatermark ?? props.exportWithWatermark;
  exportToPDF(element, filename, useWatermark);
};

// 处理图片渲染
const renderImages = () => {
  if (!textRef.value) return;
  
  // 获取所有图片占位符
  const imageContainers = textRef.value.querySelectorAll('.markdown-image');
  
  imageContainers.forEach(container => {
    const src = container.getAttribute('data-src');
    const alt = container.getAttribute('data-alt') || '';
    
    if (src) {
      // 创建ImageViewer组件实例
      const app = createApp(ImageViewer, {src, alt});
      app.mount(container);
    }
  });
};

// 监听颜色模式变化
watch(
  () => props.colorScheme,
  (newMode) => document.documentElement.setAttribute("markdown-lite", newMode),
  {immediate: true}
);

onMounted(() => {
  renderImages();
});

//setTimeout(() => {
//  exportPDF()
//}, 20000);

defineExpose({
  exportPDF
})

</script>

<style lang="less">
.markdown-container {
  position: relative;
}

.markdown-body * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>
