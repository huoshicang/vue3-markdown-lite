// src/composables/useCodeBlock.ts（修改后）
import { Ref, onMounted, onUpdated, onUnmounted, nextTick } from "vue";
import { copyToClip } from "@/utils/copy";
import { MarkdownViewerProps } from "@/types";

export function useCodeBlock(textRef: Ref<HTMLElement | undefined>, props: MarkdownViewerProps) {
  // 等待DOM加载完成后执行
  document.addEventListener('DOMContentLoaded', () => {
    // 获取所有.action元素
    const actionElements = document.querySelectorAll('.action');

    // 遍历每个.action元素
    actionElements.forEach(action => {
      // 获取当前.action下的所有按钮
      const buttons = action.querySelectorAll('button');

      // 为每个按钮添加margin-left样式
      buttons.forEach(button => {
        button.style.marginLeft = '5px';
      });
    });
  });


  // 处理复制点击（适配copy-button类名）
  const handleCopyClick = (event: Event) => {
    const btn = event.target as HTMLElement;
    const codeWrapper = btn.closest('.code-wrapper');
    const code = codeWrapper?.querySelector('.code-block')?.textContent;

    if (code) {
      copyToClip(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "复制成功";
        setTimeout(() => btn.textContent = originalText || "复制", 1500);
      });
    }
  };

  // 处理折叠点击
// 修改 useCodeBlock.ts 中的折叠逻辑
// 修改 useCodeBlock.ts 中的折叠逻辑，确保类名正确切换
  const handleFoldClick = (event: Event) => {
    const btn = event.target as HTMLButtonElement;
    const codeWrapper = btn.closest('.code-wrapper');
    const codeBlock = codeWrapper?.querySelector('.code-block') as HTMLElement;

    if (!codeBlock) return;

    // 切换折叠类名（触发过渡动画）
    const isFolded = codeBlock.classList.toggle('folded');

    // 更新按钮文本
    btn.textContent = isFolded ? '展开代码' : '折叠代码';
  };


  // 初始化代码块
  const initCodeBlocks = async () => {
    if (!textRef.value) return;

    textRef.value.querySelectorAll('.code-block').forEach((block: HTMLElement) => {
      block.style.overflow = 'hidden';
      block.style.transition = 'max-height 0.3s ease';
      block.style.maxHeight = props.collapse ? `${block.scrollHeight}px` : 'none';
    });
  };

  // 绑定事件（使用copy-button类名）
  const addEvents = () => {
    if (!textRef.value) return;

    // 折叠按钮事件
    textRef.value.querySelectorAll('.fold-button')
      .forEach(btn => btn.addEventListener('click', handleFoldClick));

    // 复制按钮事件（使用copy-button类名）
    if (props.copyCoder) {
      textRef.value.querySelectorAll('.copy-button')
        .forEach(btn => btn.addEventListener('click', handleCopyClick));
    }
  };

  // 移除事件（使用copy-button类名）
  const removeEvents = () => {
    if (!textRef.value) return;

    textRef.value.querySelectorAll('.fold-button')
      .forEach(btn => btn.removeEventListener('click', handleFoldClick));

    textRef.value.querySelectorAll('.copy-button')
      .forEach(btn => btn.removeEventListener('click', handleCopyClick));
  };

  onMounted(async () => {
    await nextTick();
    await initCodeBlocks();
    addEvents();
  });

  onUpdated(async () => {
    removeEvents();
    await nextTick();
    await initCodeBlocks();
    addEvents();
  });

  onUnmounted(removeEvents);
}
