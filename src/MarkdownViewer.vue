<template>
  <div ref="textRef" :class="['markdown-body']" v-html="renderedText" v-watermark="watermarkOptions"/>
</template>

<script lang="ts" setup>
import {computed, watch, defineProps, nextTick, ref, onMounted, onUnmounted} from "vue";
import {MarkdownViewerProps} from "@/types";
import {createMarkdownIt} from "@/utils/markdown-it-config";
import {exportToPDF} from "@/utils/export-PDF";
import watermark from '@/utils/watermark';
import {useECharts} from "@/template/useECharts";
import {useTyped} from "@/template/useTyped";

defineOptions({name: 'MarkdownViewer'})

// 注册水印指令
const vWatermark = watermark;
const textRef = ref<HTMLElement | undefined>();

// 使用 ECharts 可组合函数
const { initECharts, disposeECharts } = useECharts(textRef);

// 使用 Typed 可组合函数
const { initTyped, disposeTyped } = useTyped(textRef);

// 基于类型定义声明 props，自动获得类型提示
const props = withDefaults(defineProps<MarkdownViewerProps>(), {
  text: () => "",
  colorScheme: () => "light",
  watermark: () => ({text: 'Markdown Lite'}),
  copyCoder: () => true,
  collapse: () => true,
});


// 水印配置
const watermarkOptions = computed(() => {
  return {...props.watermark} || {};
});


// 渲染后的文本
const renderedText = computed(() => {
  return createMarkdownIt({
    copyCoder: props.copyCoder,
    collapse: props.collapse,
    colorScheme: props.colorScheme,
  }).render(props.text)
});

// 导出PDF的方法（供父组件调用）
const exportPDF = (filename = 'document.pdf', includeWatermark?: boolean) => exportToPDF(textRef.value, filename, useWatermark);

// 监听颜色模式变化
watch(
  () => props.colorScheme,
  async (newMode) => {
    // 设置 documentElement 的 markdown-lite 属性
    document.documentElement.setAttribute("markdown-lite", newMode);
    
    // 等待 DOM 更新后重新初始化图表、打字效果、图片编辑和表格增强
    disposeECharts();
    disposeTyped();
    await nextTick();
    await Promise.all([initECharts(), initTyped()]);
  },
  {immediate: true}
);

// 监听渲染文本变化，重新初始化图表、打字效果、图片编辑和表格增强
watch(
  renderedText,
  async () => {
    await nextTick();
    // 先清理再初始化，确保事件监听器不会重复绑定
    disposeECharts();
    disposeTyped();
    await Promise.all([initECharts(), initTyped()]);
  },
  {immediate: true} // 在初始化时也触发，确保首次渲染时有事件绑定
);

// 组件挂载后初始化图表、打字效果、图片编辑和表格增强
onMounted(async () => {
  await nextTick();
  await Promise.all([initECharts(), initTyped()]);
});

// 组件卸载时清理图表、打字效果、图片编辑和表格增强
onUnmounted(() => {
  disposeECharts();
  disposeTyped();
});


defineExpose({exportPDF})
</script>

<style lang="less" scoped>
</style>
