
# API 文档

## MarkdownViewer 组件

### 基本信息
- 名称：`MarkdownViewer`
- 功能：渲染 Markdown 文本，支持代码高亮、公式、图表等扩展功能。


### 属性配置

| 属性名      | 类型            | 必填 | 默认值                         | 说明                                                  |
| ----------- | --------------- | ---- | ------------------------------ | ----------------------------------------------------- |
| text        | string          | 是   | ""                             | 需要渲染的 Markdown 文本内容。                        |
| copyCoder   | boolean         | 否   | true                           | 是否为代码块添加复制按钮（点击复制代码内容）。        |
| collapse    | boolean         | 否   | true                           | 是否允许代码块折叠（点击代码块标题可展开/折叠内容）。 |
| colorScheme | 'dark', 'light' | 否   | light                          | 主题色                                                |
| watermark   | object          | 否   | `{ text: 'vue3-markdown-lite' }` | 水印配置                                              |


```typescript
  watermark?: {
    /**
     * 水印文本内容
     * @default ''
     */
    text?: string;
    /**
     * 水印颜色
     * @default 'rgba(180, 180, 180, 0.3)'
     */
    color?: string;
    /**
     * 水印字体大小
     * @default '16px'
     */
    fontSize?: string;
    /**
     * 水印旋转角度
     * @default -20
     */
    rotate?: number;
    /**
     * 水印密度（间距）
     * @default 50
     */
    density?: number;
  };
```


**效果说明**：
- 主题色默认为 `light`，也可以设置为 `dark`；可以不传，直接在html元素设置 `markdown-lite="dark"` 或 `markdown-lite="light"` 来切换主题。
- 水印默认文本为 `vue3-markdown-lite`，也可以自定义设置。如果设置为空字符串，则不显示水印。
- 复制代码时，如果成功，复制按钮会变绿色；如果失败，则会输出控制台错误信息。（语音和代码要对应） 。
- 如果设置了 `copyCoder` 为 `false`，则不会显示复制按钮。
- 整体布局适配技术文档的阅读习惯，代码与文本间距合理。


