import { App } from "vue";
import MarkdownViewer from "./MarkdownViewer.vue";

export { MarkdownViewer };

export default {
    install(app: App) {
        app.component("MarkdownViewer", MarkdownViewer);
    },
};
