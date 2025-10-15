import { App } from "vue";

import "@/styles/tailwind.css";
import "@/styles/github-markdown.less";
import "@/styles/highlight.less";
import "katex/dist/katex.min.css";


import MarkdownViewer from "./MarkdownViewer.vue";
import "./template/CodeBlock";
import "./template/CodeGroup";

export { MarkdownViewer };

export default {
    install(app: App) {
        app.component("MarkdownViewer", MarkdownViewer);
    },
};
