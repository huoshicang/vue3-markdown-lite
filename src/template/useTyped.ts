/**
 * Typed.js 配置选项接口
 */
export interface TypedConfig {
  /**
   * 要打字的字符串数组
   */
  strings: string[];

  /**
   * 打字速度（字符/毫秒）
   * @default 50
   */
  typeSpeed?: number;

  /**
   * 删除速度（字符/毫秒）
   * @default 30
   */
  backSpeed?: number;

  /**
   * 延迟时间（毫秒）
   * @default 1000
   */
  backDelay?: number;

  /**
   * 是否循环播放
   * @default true
   */
  loop?: boolean;
}

/**
 * 打字效果实例接口
 */
export interface TypedInstance {
  id: string;
  container: HTMLElement;
  config: TypedConfig;
  currentStringIndex: number;
  currentCharIndex: number;
  isDeleting: boolean;
  timer: number | null;
  destroy: () => void;
}

import { ref, nextTick, Ref } from 'vue';
import { createMarkdownIt } from '@/utils/markdown-it-config';

/**
 * 用于管理和操作打字效果的可组合函数
 * @param elementRef 包含打字效果容器的元素引用或 Vue ref 对象
 * @returns 打字效果管理函数
 */
export const useTyped = (
  elementRef: HTMLElement | undefined | null | Ref<HTMLElement | undefined | null>
) => {
  // 存储所有已创建的打字效果实例
  const typedInstances = ref<Map<string, TypedInstance>>(new Map());

  // 创建markdown-it实例用于渲染markdown内容
  const md = createMarkdownIt({ copyCoder: false, collapse: false });

  /**
   * 获取实际的 DOM 元素
   * @returns 实际的 DOM 元素或 null
   */
  const getActualElement = (): HTMLElement | null => {
    if (!elementRef) return null;
    // 如果是 Vue 的 ref 对象，获取其 value
    if (typeof (elementRef as Ref).value !== 'undefined') {
      return (elementRef as Ref<HTMLElement | undefined | null>).value || null;
    }
    // 如果已经是 DOM 元素，直接返回
    return elementRef as HTMLElement | null;
  };

  /**
   * 渲染markdown内容
   * @param content markdown内容
   * @returns 渲染后的HTML字符串
   */
  const renderMarkdown = (content: string): string => {
    try {
      return md.render(content);
    } catch (error) {
      console.error('Markdown渲染失败:', error);
      return content; // 如果渲染失败，返回原始内容
    }
  };

  /**
   * 创建打字效果实例
   * @param container 打字效果容器
   * @param config Typed.js配置对象
   * @param id 实例ID
   */
  const createTypedInstance = (container: HTMLElement, config: TypedConfig, id: string): TypedInstance => {
    // 设置默认值
    const defaultConfig: Required<TypedConfig> = {
      strings: [],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      loop: true,
      ...config
    };

    const instance: TypedInstance = {
      id,
      container,
      config: defaultConfig,
      currentStringIndex: 0,
      currentCharIndex: 0,
      isDeleting: false,
      timer: null,
      destroy: () => {
        if (instance.timer) {
          clearTimeout(instance.timer);
          instance.timer = null;
        }
        typedInstances.value.delete(id);
      }
    };

    /**
     * 打字效果的核心函数
     */
    const type = () => {
      const currentString = instance.config.strings[instance.currentStringIndex];

      if (instance.isDeleting) {
        // 删除模式
        const displayText = currentString.substring(0, instance.currentCharIndex - 1);
        instance.container.innerHTML = renderMarkdown(displayText);
        instance.currentCharIndex--;

        if (instance.currentCharIndex === 0) {
          instance.isDeleting = false;
          instance.currentStringIndex = (instance.currentStringIndex + 1) % instance.config.strings.length;
          instance.timer = setTimeout(type, instance.config.backDelay);
        } else {
          instance.timer = setTimeout(type, instance.config.backSpeed);
        }
      } else {
        // 打字模式
        const displayText = currentString.substring(0, instance.currentCharIndex + 1);
        instance.container.innerHTML = renderMarkdown(displayText);
        instance.currentCharIndex++;

        if (instance.currentCharIndex === currentString.length) {
          if (instance.config.loop) {
            instance.isDeleting = true;
            instance.timer = setTimeout(type, instance.config.backDelay);
          }
        } else {
          instance.timer = setTimeout(type, instance.config.typeSpeed);
        }
      }
    };

    // 开始打字效果
    instance.timer = setTimeout(type, 500);

    return instance;
  };

  /**
   * 初始化所有打字效果
   */
  const initTyped = async (): Promise<void> => {
    const actualElement = getActualElement();
    if (!actualElement) return;

    // 等待 DOM 更新
    await nextTick();

    // 销毁已存在的打字效果实例
    disposeTyped();

    try {
      // 查找所有打字效果容器
      const typedContainers = actualElement.querySelectorAll('.markdown-typed');
      typedContainers.forEach(container => {
        try {
          // 获取配置数据
          const configData = container.getAttribute('data-typed-config');
          if (!configData) return;

          // 解码并解析配置
          const configStr = decodeURIComponent(configData);
          const config: TypedConfig = JSON.parse(configStr);

          // 验证配置
          if (!config.strings || !Array.isArray(config.strings) || config.strings.length === 0) {
            throw new Error('配置中缺少strings数组或数组为空');
          }

          // 创建打字效果实例
          const typedId = container.id;
          const typedInstance = createTypedInstance(container as HTMLElement, config, typedId);
          typedInstances.value.set(typedId, typedInstance);
        } catch (error) {
          console.error('初始化单个打字效果失败:', error);
          // 在容器中显示错误信息
          (container as HTMLElement).innerHTML = `<div style="color: red; padding: 10px;">打字效果渲染失败: ${(error as Error).message}</div>`;
        }
      });
    } catch (error) {
      console.error('初始化打字效果容器失败:', error);
    }
  };

  /**
   * 清理所有打字效果实例
   */
  const disposeTyped = (): void => {
    typedInstances.value.forEach(instance => {
      instance.destroy();
    });
    typedInstances.value.clear();
  };

  return {
    initTyped,
    disposeTyped,
    typedInstances
  };
};
