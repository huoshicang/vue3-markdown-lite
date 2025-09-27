import { Ref, onMounted, onUpdated, onUnmounted } from "vue";
import { copyToClip } from "../utils/copy.ts";
import { MarkdownViewerProps } from "../types";

/**
 * 代码块交互逻辑
 * @param textRef 文本容器引用
 * @param props 组件属性
 */
export function useCodeBlock(textRef: Ref<HTMLElement | undefined>, props: MarkdownViewerProps) {
  // 处理复制点击
  const handleCopyClick = (event: Event) => {
    const btn = event.target as HTMLElement;
    const codeBlock = btn.closest('.code-block-wrapper');
    const code = codeBlock?.querySelector('.code-block-body')?.textContent;

    if (code) {
      copyToClip(code).then(() => {
        btn.textContent = "复制成功";
        setTimeout(() => btn.textContent = "复制代码", 1000);
      });
    }
  };

  // 处理折叠点击
  const handleFoldClick = (event: Event) => {
    const btn = event.target as HTMLElement;
    const codeBlock = btn.closest('.code-block-wrapper');
    const content = codeBlock?.querySelector('.code-block-content') as HTMLElement;
    const isFolded = btn.getAttribute('data-fold') === 'true';

    if (content) {
      content.style.display = isFolded ? 'flex' : 'none';
      btn.textContent = isFolded ? '折叠代码' : '展开代码';
      btn.setAttribute('data-fold', isFolded ? 'false' : 'true');
    }
  };

  // 添加事件监听
  const addEvents = () => {
    if (!textRef.value || !props.copyCoder) return;

    // 复制按钮
    textRef.value.querySelectorAll(".code-block-header__copy")
      .forEach(btn => btn.addEventListener("click", handleCopyClick));

    // 折叠按钮
    textRef.value.querySelectorAll(".code-block-header__fold")
      .forEach(btn => btn.addEventListener("click", handleFoldClick));
  };

  // 移除事件监听
  const removeEvents = () => {
    if (!textRef.value) return;

    textRef.value.querySelectorAll(".code-block-header__copy")
      .forEach(btn => btn.removeEventListener("click", handleCopyClick));

    textRef.value.querySelectorAll(".code-block-header__fold")
      .forEach(btn => btn.removeEventListener("click", handleFoldClick));
  };

  // 生命周期钩子
  onMounted(addEvents);
  onUpdated(() => {
    removeEvents();
    addEvents();
  });
  onUnmounted(removeEvents);
}
