import {defineConfig} from "vitepress";
import path from "path";

const isProd = process.env.VITE_MY_ENV

export default defineConfig({
  title: "Vue3 Markdown Lite",
  description: "轻量级 Vue3 Markdown 展示组件",
  base: isProd ? '/vue3-markdown-lite/' : '/',
  vite: {
    ssr: {
      noExternal: true,
      target: 'webworker' // 强制使用Web Worker环境而不是Node.js
    },
    resolve: {
      alias: {
        // 关键：将 `@` 别名指向项目根目录下的 `src` 目录
        // 注意路径计算：从 docs/.vitepress 到 src 的相对路径是 `../../src`
        '@': path.resolve(__dirname, '../../src')
      }
    }
  },
  themeConfig: {
    nav: [
      {text: "指南", link: "/guide/"},
      {text: "演示", link: "/demo/"},
      {text: "API", link: "/api/"},
      {text: "常见问题", link: "/faq/"},
    ],
    sidebar: {
      "/guide/": [
        {text: "快速开始", link: "/guide/"},
      ],
      "/demo/": [
        {text: "示例", link: "/demo/"},
        {text: "打字机", link: "/demo/Typed/"},
        {text: "图表", link: "/demo/echarts/"},
        {text: "甘特图", link: "/demo/mermaid/"},
        {text: "序列图", link: "/demo/sequence/"},
        {text: "流程图", link: "/demo/graph/"},
        {text: "代码块", link: "/demo/code-block/"},
        {text: "代码组", link: "/demo/code-group/"},
        {text: "警告块", link: "/demo/alter/"},
        {text: "文本对齐", link: "/demo/text-align/"},
        {text: "数学表达式", link: "/demo/math/"},
        {text: "标记和突出显示内", link: "/demo/mark-hidden/"},
        {text: "上标和下标", link: "/demo/sup-sub/"},
        {text: "任务列表", link: "/demo/todo/"},
      ],
      "/api/": [{text: "组件 API", link: "/api/"}],
      "/faq/": [{text: "常见问题", link: "/faq/"}],
    },
  },
});
