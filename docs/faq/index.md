# 常见问题


## 问题 1：安装时报错“Cannot find module 'vue'”
**问题描述**：执行安装命令后，运行项目提示找不到 Vue 模块。

**解决方案**：
1. 确认项目已安装 Vue3 依赖：
   ```bash
   npm install vue@3 --save
   ```
2. 若仍报错，删除 `node_modules` 和 `package-lock.json` 后重新安装：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```


## 问题 2：数学公式不渲染，显示原始文本
**问题描述**：公式内容（如 `$E=mc^2$`）未解析，直接显示为原始字符串。

**解决方案**：
1. 检查是否安装 KaTeX 依赖：
   ```bash
   npm install katex --save
   ```
2. 确认公式语法正确：
- inline 公式使用单美元符号：`$公式内容$`
- 块级公式使用双美元符号：`$$公式内容$$`
3. 示例代码（正确用法）：
   ```vue
   <MarkdownViewer :text="ref('$a + b = c$')" />
   ```


## 问题 3：代码块复制按钮点击后无反应
**问题描述**：代码块右上角的复制按钮点击后，未复制内容且无提示。

**解决方案**：
1. 检查浏览器环境：部分浏览器（如旧版 Safari）可能不支持 `navigator.clipboard` API，建议使用 Chrome/Firefox 最新版本。
2. 确认 `copyCoder` 属性未被禁用：
   ```vue
   <!-- 确保未设置 copyCoder 为 false -->
   <MarkdownViewer :text="mdText" :copyCoder="true" />
   ```


## 问题 4：Mermaid 图表显示为代码块
**问题描述**：Mermaid 语法的代码块（如 ```` ```mermaid ... ````）未渲染为图表，而是显示为普通代码块。

**解决方案**：
1. 安装 Mermaid 依赖：
   ```bash
   npm install mermaid --save
   ```
2. 确认代码块语言标识为 `mermaid`（小写）：
   ```markdown
   ```mermaid
   graph TD
     A --> B  # 正确写法（语言标识为 mermaid）
   ```
