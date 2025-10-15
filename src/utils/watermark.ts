import { DirectiveBinding, nextTick } from 'vue';

// 存储已创建的水印元素，用于更新时销毁旧水印
const watermarkMap = new WeakMap<HTMLElement, HTMLElement>();

/**
 * 清除元素上的旧水印
 */
const clearOldWatermark = (el: HTMLElement) => {
  const oldWatermark = watermarkMap.get(el);
  if (oldWatermark && el.contains(oldWatermark)) {
    el.removeChild(oldWatermark);
  }
  watermarkMap.delete(el);
};

/**
 * 生成新水印
 */
const createWatermark = (el: HTMLElement, options: any) => {
  const {
    text = '',
    color = 'rgba(180, 180, 180, 0.3)',
    fontSize = '16px',
    rotate = -20,
    density = 150
  } = options;

  // 文本为空则不创建水印
  if (!text) return null;

  // 创建水印容器
  const watermarkDiv = document.createElement('div');
  watermarkDiv.style.position = 'absolute';
  watermarkDiv.style.top = '0';
  watermarkDiv.style.left = '0';
  watermarkDiv.style.width = '100%';
  watermarkDiv.style.height = '100%';
  watermarkDiv.style.pointerEvents = 'none';
  watermarkDiv.style.zIndex = '1000';
  watermarkDiv.className = 'markdown-watermark';

  // 确保父元素支持定位
  if (!el.style.position || el.style.position === 'static') {
    el.style.position = 'relative';
  }

  // 生成唯一样式ID，避免冲突
  const styleId = `watermark-style-${Date.now()}`;
  const styleEl = document.createElement('style');
  styleEl.id = styleId;
  styleEl.textContent = `
    .watermark-text-${styleId} {
      position: absolute;
      color: ${color};
      font-size: ${fontSize};
      transform: rotate(${rotate}deg);
      user-select: none;
      white-space: nowrap;
      pointer-events: none;
    }
  `;
  document.head.appendChild(styleEl);

  // 等待DOM更新后计算尺寸并生成水印
  nextTick(() => {
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    // 生成网格水印
    for (let x = 0; x < width; x += density) {
      for (let y = 0; y < height; y += density) {
        const textDiv = document.createElement('div');
        textDiv.className = `watermark-text-${styleId}`;
        textDiv.style.left = `${x}px`;
        textDiv.style.top = `${y}px`;
        textDiv.textContent = text;
        watermarkDiv.appendChild(textDiv);
      }
    }
  });

  return watermarkDiv;
};

// 指令对象（纯对象形式，无this）
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const watermarkEl = createWatermark(el, binding.value || {});
    if (watermarkEl) {
      el.appendChild(watermarkEl);
      watermarkMap.set(el, watermarkEl);
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    // 配置未变化则不更新
    if (binding.value === binding.oldValue) return;

    // 清除旧水印
    clearOldWatermark(el);

    // 创建新水印
    const watermarkEl = createWatermark(el, binding.value || {});
    if (watermarkEl) {
      el.appendChild(watermarkEl);
      watermarkMap.set(el, watermarkEl);
    }
  },

  unmounted(el: HTMLElement) {
    clearOldWatermark(el);
  }
};
