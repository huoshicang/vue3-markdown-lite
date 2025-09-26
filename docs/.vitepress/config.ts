import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Vue3 Markdown Lite",
    description: "轻量级 Vue3 Markdown 展示组件",
    themeConfig: {
        nav: [
            { text: "指南", link: "/guide/" },
            { text: "演示", link: "/demo/" },
            { text: "API", link: "/api/" },
            { text: "常见问题", link: "/faq/" },
        ],
        sidebar: {
            "/guide/": [{ text: "快速开始", link: "/guide/" }],
            "/demo/": [{ text: "示例", link: "/demo/" }],
            "/api/": [{ text: "组件 API", link: "/api/" }],
            "/faq/": [{ text: "常见问题", link: "/faq/" }],
        },
    },
});
