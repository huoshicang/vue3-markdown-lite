import { App } from "vue";

import "@/styles/tailwind.css";
import "@/styles/github-markdown.less";
import "@/styles/highlight.less";
import "katex/dist/katex.min.css";
import "@mdit/plugin-alert/style";


import MarkdownViewer from "./MarkdownViewer.vue";
import "./template/CodeBlock.ts";
import "./template/CodeGroup.ts";

export { MarkdownViewer };

export default {
    install(app: App) {
        app.component("MarkdownViewer", MarkdownViewer);
    },
};
