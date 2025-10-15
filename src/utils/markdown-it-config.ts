import MarkdownIt from "markdown-it";
import {MarkdownViewerProps} from "@/types";
import MdKatex from "@vscode/markdown-it-katex";
import MdLinkAttributes from "markdown-it-link-attributes";
import MdMermaid from "mermaid-it-markdown";
import { alert } from "@mdit/plugin-alert";
import { align } from "@mdit/plugin-align";
import { figure } from "@mdit/plugin-figure";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { obsidianImgSize } from "@mdit/plugin-img-size";
import { katex } from "@mdit/plugin-katex";
import { mark } from "@mdit/plugin-mark";
import { spoiler } from "@mdit/plugin-spoiler";
import { sub } from "@mdit/plugin-sub";
import { sup } from "@mdit/plugin-sup";
import { tasklist } from "@mdit/plugin-tasklist";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
import {CodeGroupPlugin} from "@/utils/code-group";
import {codeBlockPlugin} from "@/utils/code-block";
import echartsPlugin from "@/utils/echarts";
import typedPlugin from "@/utils/typed";



export function createMarkdownIt(props: MarkdownViewerProps) {
  const md = new MarkdownIt({
    html: false,
    breaks: true,
    linkify: true,
    typographer: true,
  })

  // 使用Web Component插件
  md.use(codeBlockPlugin, {
    copyCoder: props.copyCoder,
    collapse: props.collapse,
  });
  md.use(CodeGroupPlugin,{
    copyCoder: props.copyCoder,
    collapse: props.collapse,
  })
  md.use(MdLinkAttributes, {attrs: {target: "_blank", rel: "noopener"}})
  md.use(MdKatex)
  md.use(MdMermaid)
  md.use(echartsPlugin);
  md.use(typedPlugin);
  md.use(alert);
  md.use(align);
  md.use(figure);
  md.use(imgLazyload);
  md.use(obsidianImgSize);
  md.use(katex);
  md.use(mark);
  md.use(spoiler);
  md.use(sub);
  md.use(sup);
  md.use(tasklist);
  md.use(toc);
  md.use(anchor, {
    permalink: true, // 启用链接
    permalinkClass: 'direct-link', // 设置链接的 class
    permalinkSymbol: '#', // 链接符号，默认是 § 符号
  });


  return md;

}
