import { App } from "vue";
import MarkdownViewer from "./MarkdownViewer.vue";

import "katex/dist/katex.min.css";
import "../assets/styles/lib/tailwind.css";
import "../assets/styles/lib/github-markdown.less";
import "../assets/styles/lib/highlight.less";
import "./styles/CustomCollapse.css"

export { MarkdownViewer };

export default {
    install(app: App) {
        app.component("MarkdownViewer", MarkdownViewer);
    },
};
