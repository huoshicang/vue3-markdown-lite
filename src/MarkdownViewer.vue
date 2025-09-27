<template>
  <div class="text-black" :class="wrapClass">
    <div ref="textRef" class="leading-relaxed break-words">
      <div>
        <div v-if="!isText" class="markdown-body" v-html="text" />
        <div v-else class="whitespace-pre-wrap" v-text="text" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, onUpdated, ref, defineProps } from "vue";
import MarkdownIt from "markdown-it";
import MdKatex from "@vscode/markdown-it-katex";
import MdLinkAttributes from "markdown-it-link-attributes";
import MdMermaid from "mermaid-it-markdown";
import hljs from "highlight.js";
import { useBasicLayout } from "../utils/useBasicLayout.ts";
import { copyToClip } from "../utils/copy.ts";

const props = defineProps({
  // 文本内容
  text: {
    type: String,
    default: "",
  },
  // 是否为纯文本
  isText: {
    type: Boolean,
    default: false,
  },
  // 是否复制代码
  copyCoder: {
    type: Boolean,
    default: true,
  },
  // 是否显示代码行号
  coderNumber: {
    type: Boolean,
    default: true,
  },
  // 是否启动折叠
  collapse: {
    type: Boolean,
    default: true,
  }
});

const { isMobile } = useBasicLayout();

const textRef = ref<HTMLElement>();

/*
* 高亮块
* @param str 文本
* @param lang 语言
* */
const highlightBlock = (str: string, lang?: string) => {
  // 计算行数
  const lines = str.split('\n');
  const lineCount = lines.length;
  
  // 生成行号
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)
    .map(num => `<span class="line-number">${num}</span>`)
    .join('');
  
  // 生成代码行
  const codeLines = lines.map(line => `<div class="code-line">${line}</div>`).join('');
  
  return `<pre class="code-block-wrapper">
    <div class="code-block-header">
        ${ props.collapse ? `<span class="code-block-header__fold" data-fold="false">折叠代码</span>` : "" }
        <span class="code-block-header__copy">复制代码</span>
        <span class="code-block-header__lang">${lang}</span>
        <span class="code-block-header__lines"> ${lineCount} 行</span>
    </div>
    <div class="code-block-content">
        ${ props.coderNumber ? `<div class="line-numbers">${lineNumbers}</div>` : "" }
        <code class="hljs code-block-body ${lang}">${codeLines}</code>
    </div>
</pre>`;
}

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? "";
      return highlightBlock(
        hljs.highlight(code, { language: lang }).value,
        lang,
      );
    }
    return highlightBlock(hljs.highlightAuto(code).value, "");
  },
});

mdi
  .use(MdLinkAttributes, { attrs: { target: "_blank", rel: "noopener" } })
  .use(MdKatex)
  .use(MdMermaid);

const wrapClass = computed(() => {
  return [
    "text-wrap",
    "min-w-[20px]",
    "rounded-md",
    isMobile.value ? "p-2" : "px-3 py-2",
  ];
});

const text = computed(() => {
  const value = props.text ?? "";
  if (!props.isText) {
    // 对数学公式进行处理，自动添加 $$ 符号
    const escapedText = escapeBrackets(escapeDollarNumber(value));
    return mdi.render(escapedText);
  }
  return value;
});

/*
* 添加复制事件和折叠事件
* */
const addCopyEvents = () => {
  if (textRef.value && props.copyCoder) {
    // 复制按钮事件
    const copyBtn = textRef.value.querySelectorAll(".code-block-header__copy");
    copyBtn.forEach((btn) => {
      btn.addEventListener("click", handleCopyClick);
    });
    
    // 折叠按钮事件
    const foldBtn = textRef.value.querySelectorAll(".code-block-header__fold");
    foldBtn.forEach((btn) => {
      btn.addEventListener("click", handleFoldClick);
    });
  }
}

/*
* 处理复制点击事件
* */
const handleCopyClick = (event: Event) => {
  const btn = event.target as HTMLElement;
  const codeBlock = btn.closest('.code-block-wrapper');
  const code = codeBlock?.querySelector('.code-block-body')?.textContent;
  if (code) {
    copyToClip(code).then(() => {
      btn.textContent = "复制成功";
      setTimeout(() => {
        btn.textContent = "复制代码";
      }, 1000);
    });
  }
}

/*
* 处理折叠点击事件
* */
const handleFoldClick = (event: Event) => {
  const btn = event.target as HTMLElement;
  const codeBlock = btn.closest('.code-block-wrapper');
  const content = codeBlock?.querySelector('.code-block-content') as HTMLElement;
  const isFolded = btn.getAttribute('data-fold') === 'true';
  
  if (content) {
    if (isFolded) {
      // 展开
      content.style.display = 'flex';
      btn.textContent = '折叠代码';
      btn.setAttribute('data-fold', 'false');
    } else {
      // 折叠
      content.style.display = 'none';
      btn.textContent = '展开代码';
      btn.setAttribute('data-fold', 'true');
    }
  }
}

/*
* 移除复制事件和折叠事件
* */
function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll(".code-block-header__copy");
    copyBtn.forEach((btn) => {
      btn.removeEventListener("click", handleCopyClick);
    });
    
    const foldBtn = textRef.value.querySelectorAll(".code-block-header__fold");
    foldBtn.forEach((btn) => {
      btn.removeEventListener("click", handleFoldClick);
    });
  }
}

// 数学公式
function escapeDollarNumber(text: string) {
  let escapedText = "";
  
  for (let i = 0; i < text.length; i += 1) {
    let char = text[i];
    const nextChar = text[i + 1] || " ";
    
    if (char === "$" && nextChar >= "0" && nextChar <= "9") char = "\\$";
    
    escapedText += char;
  }
  
  return escapedText;
}

function escapeBrackets(text: string) {
  const pattern =
    /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g;
  return text.replace(
    pattern,
    (match, codeBlock, squareBracket, roundBracket) => {
      if (codeBlock) return codeBlock;
      else if (squareBracket) return `$$${squareBracket}$$`;
      else if (roundBracket) return `$${roundBracket}$`;
      return match;
    },
  );
}

onMounted(() => {
  addCopyEvents();
});

onUpdated(() => {
  addCopyEvents();
});

onUnmounted(() => {
  removeCopyEvents();
});
</script>

<style lang="less">
@import url(../assets/style);

.code-block-wrapper {
  position: relative;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e1e4e8;
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  font-size: 12px;
  color: #6a737d;
}

.code-block-header__fold,
.code-block-header__copy {
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  margin-right: 10px;
}

.code-block-header__fold:hover,
.code-block-header__copy:hover {
  color: #0366d6;
}

.code-block-wrapper:hover .code-block-header__fold,
.code-block-wrapper:hover .code-block-header__copy {
  opacity: 1;
}

.code-block-content {
  display: flex;
  overflow-x: auto;
  background: #f6f8fa;
}

.line-numbers {
  padding: 12px;
  text-align: right;
  user-select: none;
  color: #6a737d;
  background: #f6f8fa;
  border-right: 1px solid #e1e4e8;
  line-height: 1.5;
  min-width: 10px;
}

.line-number {
  display: block;
  font-size: 12px;
}

.code-block-body {
  flex: 1;
  padding: 20px !important;
  overflow-x: auto;
  margin: 0;
  line-height: 1.5;
  background: #f6f8fa;
}

.code-line {
  display: block;
  white-space: pre;
}

/* 高亮样式调整 */
.hljs {
  background: transparent !important;
}
</style>
